// تسجيل الدخول
document.getElementById('loginButton')?.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('الرجاء إدخال البريد الإلكتروني وكلمة المرور');
        return;
    }

    try {
        const response = await fetch('https://tawgeeh-v1-production.up.railway.app/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.access_token);
            alert('تم تسجيل الدخول بنجاح!');
            window.location.href = '/dashboard';
        } else {
            alert(data.message || data.error || 'فشل تسجيل الدخول');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء الاتصال بالخادم');
    }
});

document.getElementById('repassword')?.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value;
    
    if (!email) {
        alert('الرجاء إدخال البريد الإلكتروني');
        return;
    }

    try {
        const response = await fetch('https://tawgeeh-v1-production.up.railway.app/auth/forget-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email})
        });

        const data = await response.json();

        if (response.ok) {
            alert('تم إرسال رمز إعادة التعيين إلى بريدك الإلكتروني');
            window.location.href = 'passwordScreen1.html';
        } else {
            alert(data.message || data.error || 'فشل إرسال رمز الإستعادة');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء الاتصال بالخادم');
    }
});

document.getElementById('resetPasswordBtn')?.addEventListener('click', async (e) => {
    e.preventDefault();
    const resetCode = document.querySelector('.resetCodePass1')?.value;
    const newPassword = document.getElementById('newPassword')?.value;
    const token = localStorage.getItem('token');
    
    if (!resetCode || !newPassword) {
        alert('الرجاء إدخال الرمز وكلمة المرور الجديدة');
        return;
    }

    try {
        const response = await fetch('https://tawgeeh-v1-production.up.railway.app/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
            },
            body: JSON.stringify({resetCode, newPassword})
        });

        const data = await response.json();

        if (response.ok) {
            alert('تم تغيير كلمة المرور بنجاح');
            window.location.href = 'index.html';
        } else {
            alert(data.message || data.error || 'فشل تغيير كلمة المرور');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء الاتصال بالخادم');
    }
});

document.getElementById('loginbtn2')?.addEventListener('click', async (e) => {
    e.preventDefault();
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('signupPassword').value;
    const gender = document.getElementById('gender').value;
    const country = document.getElementById('country').value;
    const specialization = document.getElementById('specialization').value;
    const experienceLevel = document.getElementById('experience').value;
    const bio = document.getElementById('about_me').value;
  
    if (!name || !email || !phone || !password || !gender || !country || !specialization || !experienceLevel) {
        alert('الرجاء إدخال جميع الحقول المطلوبة');
        return;
    }

    try {
        const response = await fetch('https://tawgeeh-v1-production.up.railway.app/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name, 
                email, 
                phone,
                password,
                specialization,
                gender,
                country,
                experienceLevel,
                bio
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.access_token);
            alert('تم إنشاء الحساب بنجاح!');
            window.location.href = '/dashboard';
        } else {
            alert(data.message || data.error || 'فشل إنشاء الحساب');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء إنشاء الحساب');
    }
});

document.getElementById('verification-code')?.addEventListener('click', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
        alert('الرجاء تسجيل الدخول أولاً');
        return;
    }

    try {
        const response = await fetch('https://tawgeeh-v1-production.up.railway.app/auth/resend-verification-code', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
            },
        });

        const data = await response.json();

        if (response.ok) {
            alert('تم إعادة إرسال الكود بنجاح!');
        } else {
            alert(data.message || data.error || 'فشل إعادة إرسال الكود');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء إعادة إرسال الكود');
    }
});

document.getElementById('loginbtn')?.addEventListener('click', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const code = document.querySelector('.resetCode')?.value;

    if (!token || !code) {
        alert('الرجاء إدخال كود التحقق');
        return;
    }

    try {
        const response = await fetch('https://tawgeeh-v1-production.up.railway.app/auth/verify-email', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
            },
            body: JSON.stringify({code})
        });

        const data = await response.json();

        if (response.ok) {
            alert('تم التحقق من البريد الإلكتروني بنجاح!');
            window.location.href = '/dashboard';
        } else {
            alert(data.message || data.error || 'فشل التحقق من البريد الإلكتروني');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء التحقق من البريد الإلكتروني');
    }
});