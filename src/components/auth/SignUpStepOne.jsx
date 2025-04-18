import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUpStepOne = ({ onNext }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "الاسم غير صحيح";
    }

    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      newErrors.email = "البريد الاليكترونى غير صحيح";
    }

    if (!formData.phone.match(/^01[0125][0-9]{8}$/)) {
      newErrors.phone = "رقم الهاتف غير صحيح";
    }

    if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمه المرور غير متطابقه";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "يرجي قراه سياسه الخصوصيه";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Prepare data for next step
      const dataForNextStep = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      };

      onNext(dataForNextStep);
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
    <>
      <div>
        <span className="active-slide"></span>
        <span></span>
        <span></span>
      </div>
      <h1>انشاء حساب جديد</h1>
      <form onSubmit={handleSubmit} className="signUp1">
        <div>
          <label htmlFor="name">الإسم كاملا</label>
          <input
            type="text"
            placeholder="ادخل اسمك كاملا"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

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
          <label htmlFor="phone">رقم الهاتف</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="01116304577"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
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

        <div>
          <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="************************"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="checkbox">
          <input
            type="checkbox"
            name="acceptTerms"
            id="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
          />
          <label htmlFor="acceptTerms">لقد قرأت وفهمت سياسة الخصوصية</label>
          {errors.acceptTerms && (
            <p className="error-message">{errors.acceptTerms}</p>
          )}
        </div>

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
          <input type="submit" value="التالي" />
          <p>
            هل لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default SignUpStepOne;
