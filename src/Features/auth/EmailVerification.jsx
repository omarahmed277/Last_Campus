import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:9000/users";

const EmailVerification = ({ direction, email }) => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
      const response = await fetch(
        `https://tawgeeh-v1-production.up.railway.app/auth/verify-email`,
        {
          headers: {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
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
      // Handle successful verification
      if (direction === "signup") {
        navigate("/login");
      }
      if (direction === "reset") {
        navigate("/reset-password");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://tawgeeh-v1-production.up.railway.app/auth/resend-verification-code`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "فشل في إعادة إرسال الكود");
      }
      setSuccess("تم إرسال الكود مرة أخرى إلى بريدك الإلكتروني");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="module">
      <div>
        <span className="active-slide"></span>
        <span className="active-slide"></span>
        <span className="active-slide"></span>
      </div>
      <h2>التحقق من البريد الإلكتروني</h2>
      <p className="email-info">تم إرسال رمز التحقق إلى {email}</p>

      <form onSubmit={handleSubmit}>
        <div className="code">
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
          {success && <p className="success-message">{success}</p>}
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "جاري التحقق..." : "تم"}
        </button>
        <p onClick={handleResendCode}>
          لم يتم ارسال الكود ؟ <span>ارسل الكود مرة اخرى</span>
        </p>
      </form>
    </div>
  );
};

export default EmailVerification;
