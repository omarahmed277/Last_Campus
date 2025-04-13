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

// APIs.js
document.addEventListener("DOMContentLoaded", function () {
  // Handle Google buttons
  const googleBtns = document.querySelectorAll(".GoogleBtn");
  googleBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      window.location.href =
        "https://tawgeeh-v1-production.up.railway.app/auth/google";
    });
  });

  // Handle LinkedIn buttons
  const linkedinBtns = document.querySelectorAll(".linkedinBtn");
  linkedinBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      window.location.href =
        "https://tawgeeh-v1-production.up.railway.app/auth/linkedin";
    });
  });
});

// Enhanced error handling
async function handleApiError(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || "حدث خطأ في الخادم";

    switch (response.status) {
      case 400:
        throw new Error(`طلب غير صحيح: ${errorMessage}`);
      case 401:
        throw new Error(`غير مصرح به: ${errorMessage}`);
      case 403:
        throw new Error(`غير مسموح: ${errorMessage}`);
      case 404:
        throw new Error(`المورد غير موجود: ${errorMessage}`);
      case 500:
        throw new Error(`خطأ في الخادم: ${errorMessage}`);
      default:
        throw new Error(`خطأ غير متوقع: ${errorMessage}`);
    }
  }
  return response;
}

// Authentication Functions
window.auth = {
  login: async function (email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email, password }),
      });

      await handleApiError(response);
      const data = await response.json();

      localStorage.setItem("authToken", data.access_token);
      localStorage.setItem("userData", JSON.stringify(data.user));

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  register: async function (userData) {
    try {
      // Transform data to match backend expectations
      const requestBody = {
        name: userData.fullName,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        gender: userData.gender.toUpperCase(), // Ensure uppercase
        country: userData.country,
        specialization: userData.specialization,
        experienceLevel: mapExperience(userData.experience),
        bio: userData.aboutMe,
      };

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(requestBody),
      });

      await handleApiError(response);
      return await response.json();
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  verifyPhone: async function (userId, code) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-phone`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ userId, code }),
      });

      await handleApiError(response);
      return await response.json();
    } catch (error) {
      console.error("Verification error:", error);
      throw error;
    }
  },

  requestPasswordReset: async function (email) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email }),
      });

      await handleApiError(response);
      return await response.json();
    } catch (error) {
      console.error("Password reset request error:", error);
      throw error;
    }
  },

  resetPassword: async function (email, newPassword, code) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email, newPassword, code }),
      });

      await handleApiError(response);
      return await response.json();
    } catch (error) {
      console.error("Password reset error:", error);
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
