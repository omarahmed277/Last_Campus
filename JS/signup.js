window.common = window.common || {};

// Validate email
common.validateEmail = function (email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate password
common.validatePassword = function (password) {
  return password.length >= 8;
};

// Show error message
common.showError = function (element, message) {
  if (element) {
    element.innerHTML = message;
    element.style.display = "block";
    element.setAttribute("aria-live", "assertive");
    element.parentElement.querySelector("input")?.focus();
  }
};

// Clear error message
common.clearError = function (element) {
  if (element) {
    element.textContent = "";
    element.style.display = "none";
    element.removeAttribute("aria-live");
  }
};

// Scroll to first error
common.scrollToFirstError = function (form) {
  const firstError = form.querySelector(".error:not(:empty)");
  if (firstError) {
    firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    firstError.parentElement.querySelector("input")?.focus();
  }
};

// Form validation for signup step 1
common.validateForm1 = function (form) {
  let isValid = true;
  const fullName = form.querySelector("#fullName").value.trim();
  const email = form.querySelector("#signupEmail").value.trim();
  const phone = form.querySelector("#phone").value.trim();
  const password = form.querySelector("#signupPassword").value.trim();
  const confirmPassword = form.querySelector("#confirmPassword").value.trim();
  const privacyCheckbox = form.querySelector("#privacyCheckbox1").checked;

  const fullNameError = form.querySelector("#fullNameError");
  const emailError = form.querySelector("#signupEmailError");
  const phoneError = form.querySelector("#phoneError");
  const passwordError = form.querySelector("#signupPasswordError");
  const confirmPasswordError = form.querySelector("#confirmPasswordError");
  const privacyError = form.querySelector("#privacyError");

  common.clearError(fullNameError);
  common.clearError(emailError);
  common.clearError(phoneError);
  common.clearError(passwordError);
  common.clearError(confirmPasswordError);
  common.clearError(privacyError);

  if (!fullName) {
    common.showError(fullNameError, "يرجى إدخال الاسم الكامل");
    isValid = false;
  }
  if (!common.validateEmail(email)) {
    common.showError(emailError, "البريد الإلكتروني غير صحيح");
    isValid = false;
  }
  if (!phone || !/^\d{10,15}$/.test(phone)) {
    common.showError(phoneError, "رقم الهاتف غير صحيح");
    isValid = false;
  }
  if (!common.validatePassword(password)) {
    common.showError(passwordError, "كلمة المرور يجب أن تكون 8 أحرف على الأقل");
    isValid = false;
  }
  if (password !== confirmPassword) {
    common.showError(confirmPasswordError, "كلمة المرور غير متطابقة");
    isValid = false;
  }
  if (!privacyCheckbox) {
    common.showError(privacyError, "يرجى الموافقة على سياسة الخصوصية");
    isValid = false;
  }

  if (!isValid) {
    common.scrollToFirstError(form);
  }

  return isValid;
};

// Form validation for signup step 2
common.validateForm2 = function (form) {
  let isValid = true;
  const specialization = form.querySelector("#specialization").value.trim();
  const country = form.querySelector("#country").value;
  const experience = form.querySelector("#experience").value;
  const gender = form.querySelector("#gender").value;
  const aboutMe = form.querySelector("#about_me").value.trim();
  const privacyCheckbox = form.querySelector("#privacyCheckbox2").checked;

  const specializationError = form.querySelector("#specializationError");
  const countryError = form.querySelector("#countryError");
  const experienceError = form.querySelector("#experienceError");
  const genderError = form.querySelector("#genderError");
  const aboutMeError = form.querySelector("#aboutMeError");
  const privacyError = form.querySelector("#privacyError2");

  common.clearError(specializationError);
  common.clearError(countryError);
  common.clearError(experienceError);
  common.clearError(genderError);
  common.clearError(aboutMeError);
  common.clearError(privacyError);

  if (!specialization) {
    common.showError(specializationError, "يرجى إدخال التخصص");
    isValid = false;
  }
  if (!country) {
    common.showError(countryError, "يرجى اختيار البلد");
    isValid = false;
  }
  if (!experience) {
    common.showError(experienceError, "يرجى اختيار عدد سنوات الخبرة");
    isValid = false;
  }
  if (!gender) {
    common.showError(genderError, "يرجى اختيار الجنس");
    isValid = false;
  }
  if (!aboutMe || aboutMe.length < 20) {
    common.showError(aboutMeError, "يرجى إدخال نبذة عنك (20 حرفًا على الأقل)");
    isValid = false;
  }
  if (!privacyCheckbox) {
    common.showError(privacyError, "يرجى الموافقة على سياسة الخصوصية");
    isValid = false;
  }

  if (!isValid) {
    common.scrollToFirstError(form);
  }

  return isValid;
};

// Form validation for signup step 3
common.validateForm3 = function (form) {
  let isValid = true;
  const codes = form.querySelectorAll(".code-input");
  const codeInputs = Array.from(codes).map((input) => input.value.trim());

  const errorSpan = form.querySelector("#verificationCodeError");
  if (errorSpan) common.clearError(errorSpan);

  if (codeInputs.some((code) => !code || code.length !== 1)) {
    common.showError(errorSpan, "يرجى إدخال رمز التحقق الكامل");
    isValid = false;
  }

  if (!isValid) {
    common.scrollToFirstError(form);
  }

  return isValid;
};
