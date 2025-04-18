import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = ({ setCurAcount }) => {
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

    if (!formData.email.match(/\w+@\w+\.\w+/)) {
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
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "فشل تسجيل الدخول");
        }

        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
          if (formData.rememberMe) {
            localStorage.setItem("email", formData.email);
          }
          // Fetch user data after successful login

          const userResponse = await fetch("/api/auth/profile", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Origin: window.location.origin,
            },
            // Include the token in the headers for authentication
            credentials: "include",
            body: JSON.stringify({
              token: localStorage.getItem("token"),
              email: formData.email,
              password: formData.password,
            }),
          });
          // Check if the user data was fetched successfully
          // If the response is not ok, throw an error
          if (!userResponse.ok) {
            throw new Error("فشل في جلب بيانات المستخدم");
          }
          // If the response is ok, parse the JSON data
          if (userResponse.ok) {
            const userData = await userResponse.json();
            localStorage.setItem("userData", JSON.stringify(userData));
            setCurAcount(localStorage.getItem("userData"));
            navigate("/");
          } else {
            throw new Error("فشل في جلب بيانات المستخدم");
          }
        } else {
          throw new Error("لم يتم استلام رمز الدخول");
        }
      } catch (error) {
        setErrors({ submit: error.message });
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
          <Link to="forgot-password" className="forgot-password">
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
