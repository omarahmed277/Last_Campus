document.getElementById('loginButton').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

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
            alert(data.error || 'فشل تسجيل الدخول');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء تسجيل الدخول');
    }
});

//*************** */
document.getElementById('repassword').addEventListener('click', async () => {
    const email = document.getElementById('resetEmail').value;
    
  
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
            localStorage.setItem('token', data.access_token);
            alert('تم تسجيل الدخول بنجاح!');
            window.location.href = '/dashboard';
        } else {
            alert(data.error || 'فشل تسجيل الدخول');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء تسجيل الدخول');
    }
});

// *****************************************8

document.getElementById('repassword').addEventListener('click', async () => {
    const resetCode = document.querySelectorAll('.resetCodePass1').value;
    const newPassword = document.getElementById('newPassword').value;
    const token = localStorage.getItem('token')
    
    
  
    try {
        const response = await fetch('https://tawgeeh-v1-production.up.railway.app/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorizations' :'Bearer '+ token

    
            },
        
            body: JSON.stringify({resetCode,newPassword})
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.access_token);
            alert('تم تسجيل الدخول بنجاح!');
            window.location.href = '/dashboard';
        } else {
            alert(data.error || 'فشل تسجيل الدخول');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء تسجيل الدخول');
    }
});

// ********************************

document.getElementById('loginbtn2').addEventListener('click', async () => {
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('signupPassword').value;
    const gender = document.getElementById('gender').value;
    const country = document.getElementById('country').value;
    const specialization = document.getElementById('specialization').value;
    const experienceLevel = document.getElementById('experience').value;
    const bio = document.getElementById('about_me').value;
  
    try {
        const response = await fetch('https://tawgeeh-v1-production.up.railway.app/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
    
            },
        
            body: JSON.stringify({name, email, phone,password,specialization,gender,country,experienceLevel,bio})
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.access_token);
            alert('تم تسجيل الدخول بنجاح!');
            window.location.href = '/dashboard';
        } else {
            alert(data.error || 'فشل تسجيل الدخول');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء تسجيل الدخول');
    }
});





// *****************

document.getElementById('verification-code').addEventListener('click', async () => {
    
    const token = localStorage.getItem('token')


    try {
        const response = await fetch('https://tawgeeh-v1-production.up.railway.app/auth/resend-verification-code', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorizations' :'Bearer '+ token
            },
        
        });

        const data = await response.json();

        if (response.ok) {
            alert('تم إعاده  إرسال الكود  بنجاح!');
        } else {
            alert(data.error || 'فشل تسجيل الدخول');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('لم يتم إرسال الكود');
    }
});

// *****************

document.getElementById('loginbtn').addEventListener('click', async () => {
    
    const token = localStorage.getItem('token')
    
    const code = document.querySelectorAll('.resetCode').value;


    try {
        const response = await fetch('https://tawgeeh-v1-production.up.railway.app/auth/verify-email', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorizations' :'Bearer '+ token
            },

            body: JSON.stringify({code})

        
        });

        const data = await response.json();

        if (response.ok) {
            alert('تم  إرسال الكود  بنجاح!');
        } else {
            alert(data.error || 'فشل تسجيل الدخول');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('لم يتم إرسال الكود');
    }
});

// *******************


