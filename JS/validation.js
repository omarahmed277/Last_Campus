document.addEventListener('DOMContentLoaded', function () {
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

    // Live Validation للعناصر
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            const errorElement = document.getElementById(`${input.id}Error`);
            if (input.id === 'email' || input.id === 'resetEmail' || input.id === 'signupEmail') {
                if (!validateEmail(input.value)) {
                    errorElement.textContent = 'البريد الإلكتروني غير صحيح';
                } else {
                    errorElement.textContent = '';
                }
            } else if (input.id === 'password' || input.id === 'signupPassword') {
                if (!validatePassword(input.value)) {
                    errorElement.textContent = 'كلمة المرور يجب أن تحتوي على الأقل على 8 أحرف';
                } else {
                    errorElement.textContent = '';
                }
            } else if (input.id === 'fullName') {
                if (!validateFullName(input.value)) {
                    errorElement.textContent = 'الاسم الكامل مطلوب';
                } else {
                    errorElement.textContent = '';
                }
            } else if (input.id === 'phone') {
                if (!validatePhone(input.value)) {
                    errorElement.textContent = 'رقم الهاتف يجب أن يكون 11 رقمًا';
                } else {
                    errorElement.textContent = '';
                }
            } else if (input.id === 'confirmPassword') {
                const password = document.getElementById('signupPassword').value;
                if (!validateConfirmPassword(password, input.value)) {
                    errorElement.textContent = 'كلمة المرور غير متطابقة';
                } else {
                    errorElement.textContent = '';
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // العناصر المطلوبة
    const specializationInput = document.getElementById('specialization');
    const countrySelect = document.getElementById('country');
    const experienceSelect = document.getElementById('experience');
    const genderSelect = document.getElementById('gender');
    const aboutMeTextarea = document.getElementById('about_me');
    const privacyCheckbox = document.getElementById('privacyCheckbox');

    // عناصر رسائل الخطأ
    const specializationError = document.getElementById('specializationError');
    const countryError = document.getElementById('countryError');
    const experienceError = document.getElementById('experienceError');
    const genderError = document.getElementById('genderError');
    const aboutMeError = document.getElementById('aboutMeError');
    const privacyError = document.getElementById('privacyError');

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

    // Live Validation للتخصص
    specializationInput.addEventListener('input', function () {
        if (!validateSpecialization(specializationInput.value)) {
            specializationError.textContent = 'التخصص مطلوب';
        } else {
            specializationError.textContent = '';
        }
    });

    // Live Validation للبلد
    countrySelect.addEventListener('change', function () {
        if (!validateSelect(countrySelect)) {
            countryError.textContent = 'البلد مطلوب';
        } else {
            countryError.textContent = '';
        }
    });

    // Live Validation لعدد سنوات الخبرة
    experienceSelect.addEventListener('change', function () {
        if (!validateSelect(experienceSelect)) {
            experienceError.textContent = 'عدد سنوات الخبرة مطلوب';
        } else {
            experienceError.textContent = '';
        }
    });

    // Live Validation للجنس
    genderSelect.addEventListener('change', function () {
        if (!validateSelect(genderSelect)) {
            genderError.textContent = 'الجنس مطلوب';
        } else {
            genderError.textContent = '';
        }
    });

    // Live Validation للنبذة عني
    aboutMeTextarea.addEventListener('input', function () {
        if (!validateAboutMe(aboutMeTextarea.value)) {
            aboutMeError.textContent = 'نبذة عنك مطلوبة';
        } else {
            aboutMeError.textContent = '';
        }
    });

    // Live Validation لسياسة الخصوصية
    privacyCheckbox.addEventListener('change', function () {
        if (!validatePrivacy(privacyCheckbox)) {
            privacyError.textContent = 'يجب الموافقة على سياسة الخصوصية';
        } else {
            privacyError.textContent = '';
        }
    });

    // التحقق عند النقر على زر "التالي"
    document.getElementById('loginbtn2').addEventListener('click', function (event) {
        if (
            !validateSpecialization(specializationInput.value) ||
            !validateSelect(countrySelect) ||
            !validateSelect(experienceSelect) ||
            !validateSelect(genderSelect) ||
            !validateAboutMe(aboutMeTextarea.value) ||
            !validatePrivacy(privacyCheckbox)
        ) {
            event.preventDefault(); // منع إرسال النموذج إذا كانت البيانات غير صحيحة
            alert('الرجاء إدخال بيانات صحيحة');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // العناصر المطلوبة
    const newPasswordInput = document.getElementById('newPassword');
    const confirmNewPasswordInput = document.getElementById('confirmNewPassword');
    const changePasswordBtn = document.getElementById('changePasswordBtn');

    // عناصر رسائل الخطأ
    const newPasswordError = document.getElementById('newPasswordError');
    const confirmNewPasswordError = document.getElementById('confirmNewPasswordError');

    // دالة للتحقق من صحة كلمة المرور
    function validatePassword(password) {
        return password.length >= 8;
    }

    // دالة للتحقق من تطابق كلمة المرور وتأكيدها
    function validateConfirmPassword(password, confirmPassword) {
        return password === confirmPassword;
    }

    // Live Validation لكلمة المرور
    newPasswordInput.addEventListener('input', function () {
        if (!validatePassword(newPasswordInput.value)) {
            newPasswordError.textContent = 'كلمة المرور يجب أن تحتوي على الأقل على 8 أحرف';
        } else {
            newPasswordError.textContent = '';
        }
    });

    // Live Validation لتأكيد كلمة المرور
    confirmNewPasswordInput.addEventListener('input', function () {
        if (!validateConfirmPassword(newPasswordInput.value, confirmNewPasswordInput.value)) {
            confirmNewPasswordError.textContent = 'كلمة المرور غير متطابقة';
        } else {
            confirmNewPasswordError.textContent = '';
        }
    });

    // التحقق عند النقر على زر "تغيير كلمة المرور"
    changePasswordBtn.addEventListener('click', function (event) {
        if (
            !validatePassword(newPasswordInput.value) ||
            !validateConfirmPassword(newPasswordInput.value, confirmNewPasswordInput.value)
        ) {
            event.preventDefault(); // منع إرسال النموذج إذا كانت البيانات غير صحيحة
            alert('الرجاء إدخال كلمة مرور صحيحة وتأكيدها');
        } else {
            alert('تم تغيير كلمة المرور بنجاح');
            // يمكنك هنا إضافة منطق إرسال البيانات إلى الخادم
        }
    });
});