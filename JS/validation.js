document.addEventListener('DOMContentLoaded', function () {
    // ================ الجزء الأول: تحقق من صفحة التسجيل الأولى (البيانات الأساسية) ================
    // العناصر المطلوبة للصفحة الأولى
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('signupEmail');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const signupBtn = document.getElementById('signupBtn');

    // عناصر رسائل الخطأ للصفحة الأولى
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('signupEmailError');
    const phoneError = document.getElementById('phoneError');
    const passwordError = document.getElementById('signupPasswordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    // ================ الجزء الثاني: تحقق من صفحة التسجيل الثانية (البيانات المهنية) ================
    // العناصر المطلوبة للصفحة الثانية
    const specializationInput = document.getElementById('specialization');
    const countrySelect = document.getElementById('country');
    const experienceSelect = document.getElementById('experience');
    const genderSelect = document.getElementById('gender');
    const aboutMeTextarea = document.getElementById('about_me');
    const privacyCheckbox = document.getElementById('privacyCheckbox');

    // عناصر رسائل الخطأ للصفحة الثانية
    const specializationError = document.getElementById('specializationError');
    const countryError = document.getElementById('countryError');
    const experienceError = document.getElementById('experienceError');
    const genderError = document.getElementById('genderError');
    const aboutMeError = document.getElementById('aboutMeError');
    const privacyError = document.getElementById('privacyError');

    // ================ الجزء الثالث: تحقق من صفحة تغيير كلمة المرور ================
    // العناصر المطلوبة لصفحة تغيير كلمة المرور
    const newPasswordInput = document.getElementById('newPassword');
    const confirmNewPasswordInput = document.getElementById('confirmNewPassword');
    const changePasswordBtn = document.getElementById('changePasswordBtn');

    // عناصر رسائل الخطأ لصفحة تغيير كلمة المرور
    const newPasswordError = document.getElementById('newPasswordError');
    const confirmNewPasswordError = document.getElementById('confirmNewPasswordError');

    // ============================ دوال التحقق المشتركة ============================
    // دالة للتحقق من صحة البريد الإلكتروني
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // دالة للتحقق من صحة كلمة المرور
    function validatePassword(password) {
        return password.length >= 8;
    }

    // دالة للتحقق من صحة الاسم الكامل
    function validateFullName(fullName) {
        return fullName.trim() !== '';
    }

    // دالة للتحقق من صحة رقم الهاتف
    function validatePhone(phone) {
        const regex = /^\d{11}$/;
        return regex.test(phone);
    }

    // دالة للتحقق من تطابق كلمة المرور وتأكيدها
    function validateConfirmPassword(password, confirmPassword) {
        return password === confirmPassword;
    }

    // دالة للتحقق من صحة التخصص
    function validateSpecialization(specialization) {
        return specialization.trim() !== '';
    }

    // دالة للتحقق من صحة القوائم المنسدلة
    function validateSelect(selectElement) {
        return selectElement.value !== '';
    }

    // دالة للتحقق من صحة النبذة عني
    function validateAboutMe(aboutMe) {
        return aboutMe.trim() !== '';
    }

    // دالة للتحقق من الموافقة على سياسة الخصوصية
    function validatePrivacy(privacyCheckbox) {
        return privacyCheckbox.checked;
    }

    // ============================ أحداث التحقق للصفحة الأولى ============================
    if (fullNameInput) {
        // Live Validation للاسم الكامل
        fullNameInput.addEventListener('input', function () {
            if (!validateFullName(fullNameInput.value)) {
                fullNameError.textContent = 'الاسم الكامل مطلوب';
            } else {
                fullNameError.textContent = '';
            }
        });
    }

    if (emailInput) {
        // Live Validation للبريد الإلكتروني
        emailInput.addEventListener('input', function () {
            if (!validateEmail(emailInput.value)) {
                emailError.textContent = 'البريد الإلكتروني غير صحيح';
            } else {
                emailError.textContent = '';
            }
        });
    }

    if (phoneInput) {
        // Live Validation لرقم الهاتف
        phoneInput.addEventListener('input', function () {
            if (!validatePhone(phoneInput.value)) {
                phoneError.textContent = 'رقم الهاتف يجب أن يكون 11 رقمًا';
            } else {
                phoneError.textContent = '';
            }
        });
    }

    if (passwordInput) {
        // Live Validation لكلمة المرور
        passwordInput.addEventListener('input', function () {
            if (!validatePassword(passwordInput.value)) {
                passwordError.textContent = 'كلمة المرور يجب أن تحتوي على الأقل على 8 أحرف';
            } else {
                passwordError.textContent = '';
            }
        });
    }

    if (confirmPasswordInput) {
        // Live Validation لتأكيد كلمة المرور
        confirmPasswordInput.addEventListener('input', function () {
            if (!validateConfirmPassword(passwordInput.value, confirmPasswordInput.value)) {
                confirmPasswordError.textContent = 'كلمة المرور غير متطابقة';
            } else {
                confirmPasswordError.textContent = '';
            }
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', function (event) {
            if (
                !validateFullName(fullNameInput.value) ||
                !validateEmail(emailInput.value) ||
                !validatePhone(phoneInput.value) ||
                !validatePassword(passwordInput.value) ||
                !validateConfirmPassword(passwordInput.value, confirmPasswordInput.value)
            ) {
                event.preventDefault();
                alert('الرجاء إدخال بيانات صحيحة في جميع الحقول');
            } else {
                window.location.href = 'signup2.html';
            }
        });
    }

    // ============================ أحداث التحقق للصفحة الثانية ============================
    if (specializationInput) {
        // Live Validation للتخصص
        specializationInput.addEventListener('input', function () {
            if (!validateSpecialization(specializationInput.value)) {
                specializationError.textContent = 'التخصص مطلوب';
            } else {
                specializationError.textContent = '';
            }
        });
    }

    if (countrySelect) {
        // Live Validation للبلد
        countrySelect.addEventListener('change', function () {
            if (!validateSelect(countrySelect)) {
                countryError.textContent = 'البلد مطلوب';
            } else {
                countryError.textContent = '';
            }
        });
    }

    if (experienceSelect) {
        // Live Validation لعدد سنوات الخبرة
        experienceSelect.addEventListener('change', function () {
            if (!validateSelect(experienceSelect)) {
                experienceError.textContent = 'عدد سنوات الخبرة مطلوب';
            } else {
                experienceError.textContent = '';
            }
        });
    }

    if (genderSelect) {
        // Live Validation للجنس
        genderSelect.addEventListener('change', function () {
            if (!validateSelect(genderSelect)) {
                genderError.textContent = 'الجنس مطلوب';
            } else {
                genderError.textContent = '';
            }
        });
    }

    if (aboutMeTextarea) {
        // Live Validation للنبذة عني
        aboutMeTextarea.addEventListener('input', function () {
            if (!validateAboutMe(aboutMeTextarea.value)) {
                aboutMeError.textContent = 'نبذة عنك مطلوبة';
            } else {
                aboutMeError.textContent = '';
            }
        });
    }

    if (privacyCheckbox) {
        // Live Validation لسياسة الخصوصية
        privacyCheckbox.addEventListener('change', function () {
            if (!validatePrivacy(privacyCheckbox)) {
                privacyError.textContent = 'يجب الموافقة على سياسة الخصوصية';
            } else {
                privacyError.textContent = '';
            }
        });
    }

    if (document.getElementById('loginbtn2')) {
        // التحقق عند النقر على زر "التالي" في الصفحة الثانية
        document.getElementById('loginbtn2').addEventListener('click', function (event) {
            if (
                !validateSpecialization(specializationInput.value) ||
                !validateSelect(countrySelect) ||
                !validateSelect(experienceSelect) ||
                !validateSelect(genderSelect) ||
                !validateAboutMe(aboutMeTextarea.value) ||
                !validatePrivacy(privacyCheckbox)
            ) {
                event.preventDefault();
                alert('الرجاء إدخال بيانات صحيحة');
            } else {
                window.location.href = 'signup3.html';
            }
        });
    }

    // ============================ أحداث التحقق لصفحة تغيير كلمة المرور ============================
    if (newPasswordInput) {
        // Live Validation لكلمة المرور الجديدة
        newPasswordInput.addEventListener('input', function () {
            if (!validatePassword(newPasswordInput.value)) {
                newPasswordError.textContent = 'كلمة المرور يجب أن تحتوي على الأقل على 8 أحرف';
            } else {
                newPasswordError.textContent = '';
            }
        });
    }

    if (confirmNewPasswordInput) {
        // Live Validation لتأكيد كلمة المرور الجديدة
        confirmNewPasswordInput.addEventListener('input', function () {
            if (!validateConfirmPassword(newPasswordInput.value, confirmNewPasswordInput.value)) {
                confirmNewPasswordError.textContent = 'كلمة المرور غير متطابقة';
            } else {
                confirmNewPasswordError.textContent = '';
            }
        });
    }

    if (changePasswordBtn) {
        // التحقق عند النقر على زر "تغيير كلمة المرور"
        changePasswordBtn.addEventListener('click', function (event) {
            if (
                !validatePassword(newPasswordInput.value) ||
                !validateConfirmPassword(newPasswordInput.value, confirmNewPasswordInput.value)
            ) {
                event.preventDefault();
                alert('الرجاء إدخال كلمة مرور صحيحة وتأكيدها');
            } else {
                alert('تم تغيير كلمة المرور بنجاح');
                // يمكنك هنا إضافة منطق إرسال البيانات إلى الخادم
            }
        });
    }
});