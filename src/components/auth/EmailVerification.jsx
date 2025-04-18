import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BASE_URL = "http://localhost:9000/users";

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, nextStep, message } = location.state || {};
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Move to next input if value is entered
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const code = verificationCode.join("");

    if (code.length !== 4) {
      setError("يرجى إدخال الكود كاملا");
      return;
    }

    setIsLoading(true);
    try {
      let endpoint = "";

      // Determine which endpoint to use based on the flow
      switch (nextStep) {
        case "reset-password":
          endpoint = "/auth/verify-reset-code";
          break;
        default: // signup
          endpoint = "/auth/verify-email";
      }

      const response = await fetch(
        `https://tawgeeh-v1-production.up.railway.app${endpoint}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: window.location.origin,
          },
          body: JSON.stringify({
            email,
            code,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "فشل التحقق من البريد الإلكتروني");
      }
      const data = await response.json();
      // Handle different flows after verification
      switch (nextStep) {
        case "reset-password":
          navigate(`/reset-password?token=${data.resetToken}`, {
            state: { email },
          });
          break;
        default:
          // For regular signup flow
          navigate("/login", {
            state: {
              message:
                "تم التحقق من البريد الإلكتروني بنجاح. يمكنك الآن تسجيل الدخول.",
            },
          });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      let endpoint = "";

      // Determine which endpoint to use based on the flow
      switch (nextStep) {
        case "reset-password":
          endpoint = "/auth/resend-reset-code";
          break;

        default:
          endpoint = "/auth/resend-verification-code";
      }

      const response = await fetch(
        `https://tawgeeh-v1-production.up.railway.app${endpoint}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: window.location.origin,
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "فشل إرسال الكود");
      }

      setError("تم إرسال كود جديد إلى بريدك الإلكتروني");
      setTimeout(() => setError(""), 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="verification-container">
      <h2>التحقق من البريد الإلكتروني</h2>
      {message && <p className="info-message">{message}</p>}
      <p className="email-info">تم إرسال رمز التحقق إلى {email}</p>

      <form onSubmit={handleSubmit} className="verification-form">
        <div className="code-inputs">
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={error ? "error" : ""}
            />
          ))}
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "جاري التحقق..." : "تحقق من الكود"}
        </button>

        <button
          type="button"
          onClick={handleResendCode}
          className="resend-button"
        >
          إعادة إرسال الكود
        </button>
      </form>
    </div>
  );
};

export default EmailVerification;
