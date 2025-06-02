// curl -X 'POST' \
//   'https://tawgeeh-v1-production.up.railway.app/auth/register' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "name": "John Doe",
//   "email": "user@example.com",
//   "password": "SecurePassword123!",
//   "phone": "01012345678",
//   "gender": "MALE",
//   "country": "Egypt",
//   "specialization": "Software Engineering",
//   "experienceLevel": "INTERMEDIATE",
//   "bio": "Full-stack developer with 5 years experience"
// }'
import { toast } from 'react-toastify';

//register user
export async function registerUser(user) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    if (!res.ok) {
      let errorMsg = "فشل في تسجيل المستخدم";
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch (e) { /* Ignore */ }
      throw new Error(errorMsg);
    }
    const data = await res.json();
    toast.success("تم التسجيل بنجاح! يرجى التحقق من بريدك الإلكتروني.");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في التسجيل: ${error.message}`);
    console.error("Error registering user:", error);
  }
}

//login user
export async function loginUser(user) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    if (!res.ok) {
      let errorMsg = "فشل في تسجيل الدخول";
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch (e) { /* Ignore */ }
      throw new Error(errorMsg);
    }
    const data = await res.json();
    localStorage.setItem("token", data.data.token);
    toast.success("تم تسجيل الدخول بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في تسجيل الدخول: ${error.message}`);
    console.error("Error logging in user:", error);
  }
}

// Initiate Google OAuth authentication flow
export async function initiateGoogleOAuth() {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/auth/google-oauth/initiate`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("فشل في بدء المصادقة عبر جوجل");
    }
    const data = await res.json();
    // toast.success("Redirecting to Google..."); // Usually redirects
    return data.data;
  } catch (error) {
    toast.error(`خطأ في المصادقة عبر جوجل: ${error.message}`);
    console.error("Error initiating Google OAuth:", error);
  }
}

// Initiate LinkedIn OAuth authentication flow
export async function initiateLinkedInOAuth() {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/auth/linkedin-oauth/initiate`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("فشل في بدء المصادقة عبر لينكد إن");
    }
    const data = await res.json();
    // toast.success("Redirecting to LinkedIn..."); // Usually redirects
    return data.data;
  } catch (error) {
    toast.error(`خطأ في المصادقة عبر لينكد إن: ${error.message}`);
    console.error("Error initiating LinkedIn OAuth:", error);
  }
}

// Initiate password reset process
export async function initiatePasswordReset(email) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/auth/forget-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    if (!res.ok) {
      throw new Error("فشل في بدء عملية إعادة تعيين كلمة المرور");
    }
    const data = await res.json();
    localStorage.setItem("token", data.data.token);
    toast.success("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في إعادة تعيين كلمة المرور: ${error.message}`);
    console.error("Error initiating password reset:", error);
  }
}

// Reset password
// curl -X 'POST' \
//   'https://tawgeeh-v1-production.up.railway.app/auth/reset-password' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "resetCode": "ABC123",
//   "newPassword": "NewSecurePassword123!"
// }'
export async function resetPassword(resetCode, newPassword) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ resetCode, newPassword }),
      }
    );
    if (!res.ok) {
      throw new Error("فشل في إعادة تعيين كلمة المرور");
    }
    const data = await res.json();
    toast.success("تم إعادة تعيين كلمة المرور بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في إعادة تعيين كلمة المرور: ${error.message}`);
    console.error("Error resetting password:", error);
  }
}

// Verify user email with verification code
// {
//     "code": "string"
//   }
export async function verifyEmail(code) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/auth/verify-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ code }),
      }
    );
    if (!res.ok) {
      throw new Error("فشل في التحقق من البريد الإلكتروني");
    }
    const data = await res.json();
    toast.success("تم التحقق من البريد الإلكتروني بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في التحقق من البريد الإلكتروني: ${error.message}`);
    console.error("Error verifying email:", error);
  }
}

// Resend email verification code
// curl -X 'POST' \
//   'https://tawgeeh-v1-production.up.railway.app/auth/resend-verification-code' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "email": "user@example.com"
// }'
export async function resendVerificationCode(email) {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/auth/resend-verification-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    if (!res.ok) {
      throw new Error("فشل في إعادة إرسال رمز التحقق");
    }
    const data = await res.json();
    toast.success("تم إعادة إرسال رمز التحقق بنجاح!");
    return data.data;
  } catch (error) {
    toast.error(`خطأ في إعادة إرسال رمز التحقق: ${error.message}`);
    console.error("Error resending verification code:", error);
  }
}

// ... (rest of the code remains the same)
export async function getProfile() {
  try {
    const res = await fetch(
      `https://tawgeeh-v1-production.up.railway.app/auth/profile`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to get profile");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error loading data:", error);
  }
}
