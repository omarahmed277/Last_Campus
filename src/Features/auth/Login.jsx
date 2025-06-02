import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage] = useState(location.state?.message || "");

  const validateForm = () => {
    const newErrors = {};

    if (
      !formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      newErrors.email = "البريد الاليكترونى غير صحيح";
    }

    if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور غير صحيحه";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch(
          "https://tawgeeh-v1-production.up.railway.app/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          }
        );

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          throw new Error(data.message || "فشل تسجيل الدخول");
        }
        // Check if Invalid credentials
        if (data.error === "Invalid credentials.") {
          throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        }

        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
          console.log("Login response:", data);
          //stop preflight request and redirect to home page
          navigate("/");

          if (formData.rememberMe) {
            localStorage.setItem("email", formData.email);
          }
        }
      } catch (error) {
        console.log(error);
        setErrors((errors) => ({ ...errors, submit: error.message }));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="module">
      <h1>تسجيل الدخول</h1>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit} className="login">
        <div>
          <label htmlFor="email">البريد الإلكتروني</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Moatasmshabaan@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">كلمة المرور</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="************************"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>

        <div className="remember-me">
          <input
            type="checkbox"
            name="rememberMe"
            id="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <label htmlFor="rememberMe">تذكرني</label>
          <Link to="/forgot-password" className="forgot-password">
            نسيت كلمة المرور؟
          </Link>
        </div>

        {errors.submit && <p className="error-message">{errors.submit}</p>}

        <div>
          <span>أو</span>
          <div>
            <a href="#">
              <img src="/images/linkedin.svg" alt="linkedin" />
            </a>
            <a href="#">
              <img src="/images/Google.svg" alt="Google" />
            </a>
          </div>
          <input type="submit" value="تسجيل الدخول" />
          <p>
            ليس لديك حساب؟ <Link to="/signup">انشاء حساب جديد</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
