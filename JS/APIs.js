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
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("JWT decode error:", error);
      return null;
    }
  }

  // Retry logic with exponential backoff
  async function fetchWithRetry(url, options, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
        options.signal = controller.signal;

        const response = await fetch(url, options);
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        if (i === retries - 1) {
          throw new Error(
            `فشل الاتصال بعد ${retries} محاولات: ${error.message}`
          );
        }
        await new Promise((resolve) =>
          setTimeout(resolve, delay * Math.pow(2, i))
        );
      }
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
      const errorMessage = errorData.message || "حدث خطأ غير متوقع";
      const validationErrors = errorData.errors || [];
      switch (response.status) {
        case 400:
          if (validationErrors.length > 0) {
            throw new Error(
              `فشل التحقق: ${validationErrors
                .map((err) => err.msg || err.message)
                .join("، ")}`
            );
          }
          throw new Error(`طلب غير صالح: ${errorMessage}`);
        case 401:
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
          localStorage.removeItem("userId");
          window.location.href = "../index.html";
          throw new Error(`غير مصرح: ${errorMessage}`);
        case 403:
          throw new Error(`ممنوع: ${errorMessage}`);
        case 404:
          throw new Error(`المورد غير موجود: ${errorMessage}`);
        case 409:
          throw new Error(`إدخال مكرر: ${errorMessage}`);
        case 429:
          throw new Error(`طلبات كثيرة جدًا: حاول مرة أخرى لاحقًا`);
        case 500:
          throw new Error(`خطأ في الخادم: ${errorMessage}`);
        default:
          throw new Error(`خطأ غير متوقع: ${errorMessage}`);
      }
    }
    return response;
  }

  // Show alert with fallback
  function showAlert(title, text, icon) {
    if (window.Swal) {
      return window.Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: "موافق",
      });
    } else {
      alert(`${title}: ${text}`);
      return Promise.resolve();
    }
  }

  // Authentication Functions
  window.auth = {
    login: async function (email, password) {
      try {
        console.log("Sending login request:", { email });
        const response = await fetchWithRetry(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ email, password }),
        });

        console.log("Login response status:", response.status);
        await handleApiError(response);

        const data = await response.json();
        console.log("Login response data:", data);

        if (!data.access_token) {
          throw new Error("استجابة الخادم غير صالحة: الرمز مفقود");
        }

        // Validate token
        const decodedToken = decodeJWT(data.access_token);
        if (!decodedToken || (!decodedToken.sub && !decodedToken.id)) {
          localStorage.removeItem("authToken");
          throw new Error("رمز غير صالح: معرف المستخدم مفقود");
        }

        localStorage.setItem("authToken", data.access_token);
        let userData = await window.common.fetchUserData(data.access_token);

        userData = {
          id: userData.id || decodedToken.sub || decodedToken.id || null,
          name: userData.name || email.split("@")[0],
          email: userData.email || email,
          image_url: userData.image_url || "./default-avatar.png",
          isMentor: userData.isMentor || false,
          phoneVerified: userData.phoneVerified !== false,
          emailVerified: userData.emailVerified !== false,
          specialization: userData.specialization || "",
          bio: userData.bio || "",
        };

        if (!userData.id) {
          console.warn(
            "User ID missing in user data, proceeding with limited functionality"
          );
        }

        localStorage.setItem("userData", JSON.stringify(userData));
        return { access_token: data.access_token, user: userData };
      } catch (error) {
        console.error("Login error:", error.message);
        throw error;
      }
    },

    register: async function (userData) {
      try {
        // Format phone number with country code
        let phone = userData.phone.trim();
        if (!phone.startsWith("+")) {
          phone = `+20${phone}`; // Assume Egypt country code
        }

        const requestBody = {
          name: userData.fullName.trim(),
          email: userData.email.trim(),
          password: userData.password.trim(),
          phone: phone,
          gender: userData.gender,
          country: userData.country.toUpperCase(),
          specialization: userData.specialization.trim(),
          experienceLevel: mapExperience(userData.experience),
          bio: userData.aboutMe.trim(),
        };
        console.log("Sending registration request:", requestBody);
        const response = await fetchWithRetry(`${API_BASE_URL}/auth/register`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(requestBody),
        });
        await handleApiError(response);
        const data = await response.json();
        console.log("Registration response:", data);

        if (!data.access_token) {
          throw new Error("استجابة الخادم غير صالحة: الرمز مفقود");
        }

        // Validate token
        const decodedToken = decodeJWT(data.access_token);
        if (!decodedToken || (!decodedToken.sub && !decodedToken.id)) {
          localStorage.removeItem("authToken");
          throw new Error("رمز غير صالح: معرف المستخدم مفقود");
        }

        const userId = decodedToken.sub || decodedToken.id;
        localStorage.setItem("userId", userId);
        localStorage.setItem("authToken", data.access_token);

        // Fetch user data
        let user = await window.common.fetchUserData(data.access_token);
        user = {
          id: user.id || userId,
          name: user.name || requestBody.name,
          email: user.email || requestBody.email,
          image_url: user.image_url || "./default-avatar.png",
          isMentor: user.isMentor || false,
          phoneVerified: user.phoneVerified !== false,
          emailVerified: user.emailVerified !== false,
          specialization: user.specialization || requestBody.specialization,
          bio: user.bio || requestBody.bio,
        };

        localStorage.setItem("userData", JSON.stringify(user));
        return { access_token: data.access_token, userId, user };
      } catch (error) {
        console.error("Registration error:", error.message);
        throw error;
      }
    },

    verifyEmail: async function (userId, code) {
      try {
        console.log("Sending email verification request:", { userId, code });
        const response = await fetchWithRetry(
          `${API_BASE_URL}/auth/verify-email`,
          {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ userId, code }),
          }
        );
        await handleApiError(response);
        const data = await response.json();
        console.log("Email verification response:", data);
        if (data.success) {
          localStorage.removeItem("userId");
          localStorage.removeItem("signupEmail");
        }
        return data;
      } catch (error) {
        console.error("Email verification error:", error.message);
        throw error;
      }
    },

    requestVerificationCode: async function (email) {
      try {
        console.log("Sending verification code request:", { email });
        const response = await fetchWithRetry(
          `${API_BASE_URL}/auth/resend-verification`,
          {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ email }),
          }
        );
        await handleApiError(response);
        const data = await response.json();
        console.log("Verification code resend response:", data);
        return data;
      } catch (error) {
        console.error("Verification code resend error:", error.message);
        throw error;
      }
    },

    requestPasswordReset: async function (email) {
      try {
        console.log("Sending password reset request:", { email });
        const response = await fetchWithRetry(
          `${API_BASE_URL}/auth/forget-password`,
          {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ email }),
          }
        );
        await handleApiError(response);
        const data = await response.json();
        console.log("Password reset response:", data);
        localStorage.setItem("resetEmail", email);
        return data;
      } catch (error) {
        console.error("Password reset request error:", error.message);
        throw error;
      }
    },

    resetPassword: async function (email, newPassword, code) {
      try {
        console.log("Sending reset password request:", { email, code });
        const response = await fetchWithRetry(
          `${API_BASE_URL}/auth/reset-password`,
          {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ email, newPassword, code }),
          }
        );
        await handleApiError(response);
        const data = await response.json();
        console.log("Reset password response:", data);
        localStorage.removeItem("resetEmail");
        localStorage.removeItem("resetCode");
        return data;
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
        localStorage.removeItem("signupEmail");
        localStorage.removeItem("resetEmail");
        return { success: true };
      } catch (error) {
        console.error("Logout error:", error.message);
        throw error;
      }
    },

    fetchNotifications: async function () {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("غير مصرح: يجب تسجيل الدخول");
        }
        const decodedToken = decodeJWT(token);
        if (!decodedToken || (!decodedToken.sub && !decodedToken.id)) {
          throw new Error("رمز غير صالح: معرف المستخدم مفقود");
        }
        const userId = decodedToken.sub || decodedToken.id;

        const response = await fetchWithRetry(
          `${API_BASE_URL}/notifications?userId=${userId}`,
          {
            method: "GET",
            headers: getHeaders(true),
          }
        );
        await handleApiError(response);
        const data = await response.json();
        console.log("Notifications response:", data);

        // Format notifications to match common.js expectations
        return (data.notifications || []).map((notif) => ({
          id: notif.id || null,
          title: notif.title || "إشعار جديد",
          text: notif.text || "",
          avatar: notif.avatar || "",
          actions: notif.actions || [],
          variant: notif.variant || "",
          compact: notif.compact || false,
        }));
      } catch (error) {
        console.error("Fetch notifications error:", error.message);
        throw error;
      }
    },

    handleOAuthCallback: async function () {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        if (!token) {
          throw new Error("لم يتم العثور على رمز OAuth");
        }

        // Validate token
        const decodedToken = decodeJWT(token);
        if (!decodedToken || (!decodedToken.sub && !decodedToken.id)) {
          throw new Error("رمز OAuth غير صالح: معرف المستخدم مفقود");
        }

        localStorage.setItem("authToken", token);
        const userData = await window.common.fetchUserData(token);

        const user = {
          id: userData.id || decodedToken.sub || decodedToken.id || null,
          name: userData.name || "مستخدم OAuth",
          email: userData.email || "",
          image_url: userData.image_url || "./default-avatar.png",
          isMentor: userData.isMentor || false,
          phoneVerified: userData.phoneVerified !== false,
          emailVerified: userData.emailVerified !== false,
          specialization: userData.specialization || "",
          bio: userData.bio || "",
        };

        localStorage.setItem("userData", JSON.stringify(user));

        // Clear query parameters
        window.history.replaceState({}, document.title, window.location.pathname);

        return { access_token: token, user };
      } catch (error) {
        console.error("OAuth callback error:", error.message);
        localStorage.removeItem("authToken");
        await showAlert("خطأ", "فشل معالجة تسجيل الدخول عبر OAuth. حاول مرة أخرى.", "error");
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
    btn.addEventListener("click", async function () {
      try {
        window.location.href = `${API_BASE_URL}/auth/google`;
      } catch (error) {
        console.error("Google OAuth redirect error:", error);
        await showAlert("خطأ", "فشل الاتصال بخدمة Google. حاول مرة أخرى.", "error");
      }
    });
  });

  const linkedinBtns = document.querySelectorAll(".linkedinBtn");
  linkedinBtns.forEach((btn) => {
    btn.addEventListener("click", async function () {
      try {
        window.location.href = `${API_BASE_URL}/auth/linkedin`;
      } catch (error) {
        console.error("LinkedIn OAuth redirect error:", error);
        await showAlert("خطأ", "فشل الاتصال بخدمة LinkedIn. حاول مرة أخرى.", "error");
      }
    });
  });

  // Handle OAuth callback on page load
  if (window.location.search.includes("token=")) {
    window.auth.handleOAuthCallback().then(() => {
      window.location.href = "../pages/mentor-veiw.html"; // Redirect to mentor page after OAuth
    }).catch((error) => {
      console.error("Failed to handle OAuth callback:", error);
      window.location.href = "../index.html"; // Redirect to home on error
    });
  }
});