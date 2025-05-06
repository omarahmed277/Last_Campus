document.addEventListener("DOMContentLoaded", function () {
  // API Configuration
  const API_BASE_URL = "https://tawgeeh-v1-production.up.railway.app";

  // Helper function to get headers
  function getHeaders(includeAuth = false) {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (includeAuth) {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return headers;
  }

  // Decode JWT token
  function decodeJWT(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("JWT decode error:", error);
      return null;
    }
  }

  // Check if token is expired
  function isTokenExpired(token) {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  }

  // Retry logic with exponential backoff
  async function fetchWithRetry(url, options, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        options.signal = controller.signal;

        const response = await fetch(url, options);
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        if (i === retries - 1) {
          throw new Error(`Network error after ${retries} retries: ${error.message}`);
        }
        const backoffDelay = Math.min(delay * Math.pow(2, i), 8000); // Cap at 8s
        await new Promise((resolve) => setTimeout(resolve, backoffDelay));
      }
    }
  }

  // Centralized error display
  function displayError(title, message) {
    if (typeof Swal !== "undefined") {
      Swal.fire({ icon: "error", title, text: message });
    } else {
      alert(`${title}: ${message}`);
    }
  }

  // Enhanced error handling
  async function handleApiError(response) {
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = {};
      }
      const errorMessage = errorData.message || "An unexpected error occurred";
      const validationErrors = errorData.errors || [];
      switch (response.status) {
        case 400:
          if (validationErrors.length > 0) {
            throw new Error(
              `Validation failed: ${validationErrors.map((err) => err.msg || err.message).join(", ")}`
            );
          }
          throw new Error(`Bad request: ${errorMessage}`);
        case 401:
          throw new Error(`Unauthorized: ${errorMessage}`);
        case 403:
          throw new Error(`Forbidden: ${errorMessage}`);
        case 404:
          throw new Error(`Resource not found: ${errorMessage}`);
        case 409:
          throw new Error(`Duplicate entry: ${errorMessage}`);
        case 429:
          throw new Error(`Too many requests: Please try again later`);
        case 500:
          throw new Error(`Server error: ${errorMessage}`);
        default:
          throw new Error(`Unexpected error: ${errorMessage}`);
      }
    }
    return response;
  }

  // Common functions
  window.common = {
    fetchUserData: async function (token) {
      try {
        const response = await fetchWithRetry(`${API_BASE_URL}/users/me`, {
          method: "GET",
          headers: { ...getHeaders(), Authorization: `Bearer ${token}` },
        });
        await handleApiError(response);
        return await response.json();
      } catch (error) {
        console.error("Fetch user data error:", error.message);
        throw error;
      }
    },
  };

  // Authentication Functions
  window.auth = {
    login: async function (email, password) {
      if (!email || !password) throw new Error("Email and password are required");
      try {
        console.log("Sending login request:", { email });
        const response = await fetchWithRetry(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ email, password }),
        });

        await handleApiError(response);
        const data = await response.json();

        if (!data.access_token) {
          throw new Error("Invalid server response: Access token missing");
        }

        localStorage.setItem("authToken", data.access_token);
        let userData = await window.common.fetchUserData(data.access_token);

        userData = {
          id: userData.id || null,
          name: userData.name || email.split("@")[0],
          email: userData.email || email,
          image_url: userData.image_url || "./default-avatar.png",
          isMentor: userData.isMentor || false,
          emailVerified: userData.emailVerified !== false,
        };

        localStorage.setItem("userData", JSON.stringify(userData));
        return { access_token: data.access_token, user: userData };
      } catch (error) {
        console.error("Login error:", error.message);
        throw error;
      }
    },

    register: async function (userData) {
      if (!userData.email || !userData.password || !userData.fullName) {
        throw new Error("Required fields are missing");
      }
      try {
        let phone = userData.phone?.trim() || "";
        if (phone && !phone.startsWith("+")) {
          phone = userData.countryCode ? `${userData.countryCode}${phone}` : `+20${phone}`;
        }

        const requestBody = {
          name: userData.fullName.trim(),
          email: userData.email.trim(),
          password: userData.password.trim(),
          phone: phone || undefined,
          gender: userData.gender,
          country: userData.country?.toUpperCase(),
          specialization: userData.specialization?.trim(),
          experienceLevel: mapExperience(userData.experience),
          bio: userData.aboutMe?.trim(),
        };

        console.log("Sending registration request:", requestBody);
        const response = await fetchWithRetry(`${API_BASE_URL}/auth/register`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(requestBody),
        });
        await handleApiError(response);
        const data = await response.json();

        if (!data.access_token) {
          throw new Error("Invalid server response: Access token missing");
        }

        const decodedToken = decodeJWT(data.access_token);
        if (!decodedToken || (!decodedToken.sub && !decodedToken.id)) {
          throw new Error("Invalid token: User ID not found");
        }

        const userId = decodedToken.sub || decodedToken.id;
        localStorage.setItem("userId", userId);
        localStorage.setItem("authToken", data.access_token);

        return { access_token: data.access_token, userId };
      } catch (error) {
        console.error("Registration error:", error.message);
        throw error;
      }
    },

    verifyEmail: async function (userId, code) {
      if (!userId || !code) throw new Error("User ID and code are required");
      try {
        console.log("Sending email verification request:", { userId, code });
        const response = await fetchWithRetry(`${API_BASE_URL}/auth/verify-email`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ userId, code }),
        });
        await handleApiError(response);
        return await response.json();
      } catch (error) {
        console.error("Email verification error:", error.message);
        throw error;
      }
    },

    requestVerificationCode: async function (email) {
      if (!email) throw new Error("Email is required");
      try {
        console.log("Sending verification code request:", { email });
        const response = await fetchWithRetry(`${API_BASE_URL}/auth/resend-verification`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ email }),
        });
        await handleApiError(response);
        return await response.json();
      } catch (error) {
        console.error("Verification code resend error:", error.message);
        throw error;
      }
    },

    requestPasswordReset: async function (email) {
      if (!email) throw new Error("Email is required");
      try {
        console.log("Sending password reset request:", { email });
        const response = await fetchWithRetry(`${API_BASE_URL}/auth/forget-password`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ email }),
        });
        await handleApiError(response);
        return await response.json();
      } catch (error) {
        console.error("Password reset request error:", error.message);
        throw error;
      }
    },

    resetPassword: async function (email, newPassword, code) {
      if (!email || !newPassword || !code) {
        throw new Error("Email, new password, and code are required");
      }
      try {
        console.log("Sending reset password request:", { email, code });
        const response = await fetchWithRetry(`${API_BASE_URL}/auth/reset-password`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ email, newPassword, code }),
        });
        await handleApiError(response);
        return await response.json();
      } catch (error) {
        console.error("Password reset error:", error.message);
        throw error;
      }
    },

    logout: async function () {
      try {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        localStorage.removeItem("userId");
        return { success: true };
      } catch (error) {
        console.error("Logout error:", error.message);
        throw error;
      }
    },
  };

  // API Functions
  window.api = {
    getUserById: async function (id) {
      if (!id) throw new Error("User ID is required");
      if (isTokenExpired(localStorage.getItem("authToken"))) {
        throw new Error("Session expired. Please log in again.");
      }
      try {
        const response = await fetchWithRetry(`${API_BASE_URL}/users/${id}`, {
          method: "GET",
          headers: getHeaders(true),
        });
        await handleApiError(response);
        const data = await response.json();
        return data.data;
      } catch (error) {
        console.error("Get user error:", error.message);
        throw error;
      }
    },

    updateUserById: async function (id, updates) {
      if (!id || !updates) throw new Error("User ID and updates are required");
      if (isTokenExpired(localStorage.getItem("authToken"))) {
        throw new Error("Session expired. Please log in again.");
      }
      try {
        const response = await fetchWithRetry(`${API_BASE_URL}/users/${id}`, {
          method: "PATCH",
          headers: getHeaders(true),
          body: JSON.stringify(updates),
        });
        await handleApiError(response);
        const data = await response.json();
        return data.data;
      } catch (error) {
        console.error("Update user error:", error.message);
        throw error;
      }
    },

    getUserRatings: async function (userId) {
      if (!userId) throw new Error("User ID is required");
      if (isTokenExpired(localStorage.getItem("authToken"))) {
        throw new Error("Session expired. Please log in again.");
      }
      try {
        const response = await fetchWithRetry(`${API_BASE_URL}/ratings/${userId}`, {
          method: "GET",
          headers: getHeaders(true),
        });
        await handleApiError(response);
        const data = await response.json();
        return data.data;
      } catch (error) {
        console.error("Get ratings error:", error.message);
        throw error;
      }
    },

    getUserEducation: async function (userId) {
      if (!userId) throw new Error("User ID is required");
      if (isTokenExpired(localStorage.getItem("authToken"))) {
        throw new Error("Session expired. Please log in again.");
      }
      try {
        const response = await fetchWithRetry(`${API_BASE_URL}/education/${userId}`, {
          method: "GET",
          headers: getHeaders(true),
        });
        await handleApiError(response);
        const data = await response.json();
        return data.data;
      } catch (error) {
        console.error("Get education error:", error.message);
        throw error;
      }
    },
  };

  // Helper function to map experience levels
  function mapExperience(experience) {
    const experienceMap = {
      "zero-one": "JUNIOR",
      "one-three": "INTERMEDIATE",
      "three-five": "SENIOR",
      PlusFive: "EXPERT",
    };
    return experienceMap[experience] || "JUNIOR";
  }

  // OAuth button handlers
  const googleBtns = document.querySelectorAll(".GoogleBtn");
  googleBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      try {
        window.location.href = `${API_BASE_URL}/auth/google`;
      } catch (error) {
        console.error("Google OAuth redirect error:", error);
        displayError("خطأ", "فشل الاتصال بخدمة Google. حاول مرة أخرى.");
      }
    });
  });

  const linkedinBtns = document.querySelectorAll(".linkedinBtn");
  linkedinBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      try {
        window.location.href = `${API_BASE_URL}/auth/linkedin`;
      } catch (error) {
        console.error("LinkedIn OAuth redirect error:", error);
        displayError("خطأ", "فشل الاتصال بخدمة LinkedIn. حاول مرة أخرى.");
      }
    });
  });
});