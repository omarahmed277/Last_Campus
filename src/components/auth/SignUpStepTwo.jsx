import React, { useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:9000/users";

const SignUpStepTwo = ({ onBack, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    specialty: "",
    country: "",
    experience: "",
    about: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.specialty.trim()) {
      newErrors.specialty = "يرجى كتابه التخصص";
    }

    if (!formData.country || formData.country === "select") {
      newErrors.country = "يرجى اختيار اسم دولتك";
    }

    if (!formData.experience || formData.experience === "select") {
      newErrors.experience = "يرجى اختيار سنين خبرتك";
    }

    if (!formData.about.trim()) {
      newErrors.about = "يرجى كتابه نبذة عنك";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Format data according to API requirements
      const completeData = {
        name: initialData.name,
        email: initialData.email,
        password: initialData.password,
        phone: initialData.phone,
        specialization: formData.specialty,
        country: formData.country.toLowerCase(),
        // experienceLevel: formData.experience,
        bio: formData.about,
        gender: "MALE",
        experienceLevel: "INTERMEDIATE",
      };

      try {
        const response = await fetch(BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Accept: "application/json",
          },
          body: JSON.stringify(completeData),
        });

        const data = await response.json();
        console.log("Full response:", {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          data: data,
        });

        if (!response.ok) {
          if (response.status === 400) {
            console.log("Raw error response:", data);

            if (data.error && Array.isArray(data.error)) {
              // Log each validation error
              console.log("Validation errors:", data.error);

              // Handle array of validation errors
              const validationErrors = data.error.reduce((acc, err) => {
                console.log("Processing error:", err);

                if (typeof err === "string") {
                  acc.submit = err;
                } else if (err.field && err.message) {
                  acc[err.field] = err.message;
                } else {
                  // Log unknown error format
                  console.log("Unknown error format:", err);
                }
                return acc;
              }, {});

              console.log("Processed validation errors:", validationErrors);
              setErrors(validationErrors);

              const firstError = Object.values(validationErrors)[0];
              console.log("First error message:", firstError);
              throw new Error(firstError || "فشل التحقق من البيانات");
            } else if (data.message) {
              if (data.message.toLowerCase().includes("email")) {
                // onBack();
                throw new Error("البريد الإلكتروني مستخدم بالفعل");
              }
              throw new Error(data.message);
            }
          }
          throw new Error("فشل التسجيل - يرجى المحاولة مرة أخرى");
        }

        // If registration is successful
        localStorage.setItem("registrationEmail", completeData.email);
        onSubmit(data);
      } catch (error) {
        // console.error("Registration error:", error);
        if (!errors.submit) {
          setErrors((prev) => ({ ...prev, submit: error.message }));
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <>
      <div>
        <span className="active-slide"></span>
        <span className="active-slide"></span>
        <span></span>
        <svg
          className="back-to1"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          onClick={onBack}
        >
          <path
            d="M8.90997 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.90997 4.07999"
            stroke="#101828"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h1>انشاء حساب جديد</h1>
      <form onSubmit={handleSubmit} className="signUp2">
        <div>
          <label htmlFor="specialty">التخصص</label>
          <input
            type="text"
            placeholder="اكتب تخصصك"
            name="specialty"
            id="specialty"
            value={formData.specialty}
            onChange={handleChange}
          />
          {errors.specialty && (
            <p className="error-message">{errors.specialty}</p>
          )}
        </div>

        <div>
          <label htmlFor="country">البلد</label>
          <select
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="select">اختر دولتك</option>
            <option value="egypt">مصر</option>
            <option value="saudi">السعوديه</option>
            <option value="palastine">فلسطين</option>
          </select>
          {errors.country && <p className="error-message">{errors.country}</p>}
        </div>

        <div>
          <label htmlFor="experience">عدد سنوات الخبرة</label>
          <select
            name="experience"
            id="experience"
            value={formData.experience}
            onChange={handleChange}
          >
            <option value="select">اختر سنين خبرتك</option>
            <option value="1-3">1 : 3</option>
            <option value="3-5">3 : 5</option>
          </select>
          {errors.experience && (
            <p className="error-message">{errors.experience}</p>
          )}
        </div>

        <div>
          <label htmlFor="about">نبذة عني</label>
          <textarea
            name="about"
            id="about"
            placeholder="نبذة عني"
            value={formData.about}
            onChange={handleChange}
          ></textarea>
          {errors.about && <p className="error-message">{errors.about}</p>}
        </div>

        <div>
          <p className="error-message">{errors.submit}</p>
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

export default SignUpStepTwo;
