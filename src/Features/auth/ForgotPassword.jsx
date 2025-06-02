import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = () => {
    const emailRegex = /\w+@\w+\.\w+/g;
    if (!emailRegex.test(email)) {
      setError("من فضلك ادخل بريد إلكتروني صحيح");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://tawgeeh-v1-production.up.railway.app/auth/forget-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "حدث خطأ أثناء إرسال البريد الإلكتروني"
        );
      }

      alert("تم إرسال تعليمات إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.");
      navigate("/verify-email");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="module">
      <h2>
        نسيت كلمة المرور؟{" "}
        <svg
          onClick={() => navigate("/login")}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M8.90997 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.90997 4.08002"
            stroke="#101828"
            strokeWidth={1.5}
            strokeMiterlimit="10"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </h2>
      <p>لا تقلق , سنرسل لك تعليمات إعادة تعيين كلمة المرور .</p>
      <form onSubmit={handleSubmit} className="forgot-form">
        <div className="form-group">
          <label htmlFor="forgot-email">البريد الإلكتروني</label>
          <input
            type="email"
            id="forgot-email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="Moatasmshabaan@gmail.com"
            className={error ? "error" : ""}
          />
          {error && <p className="error-message">{error}</p>}
        </div>

        <div>
          <input type="submit" value="تسجيل الدخول" name="submit" />
          <p>
            هل ليس لديك حساب بعد؟ <Link to="/signUp">انشاء حساب جديد</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
