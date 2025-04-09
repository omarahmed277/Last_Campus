
let passwordScreen1 = document.getElementById('passwordScreen1')
let passwordScreen2 = document.getElementById('passwordScreen2')
let passwordScreen3 = document.getElementById('passwordScreen3')
let forgetBtn = document.getElementById('forgetBtn')
let login1 = document.getElementById('login1')
let repassword = document.getElementById('repassword')
let donePass = document.getElementById('donePass')
let signup1 = document.getElementById('signup1')
let signup2 = document.getElementById('signup2')
let signup3 = document.getElementById('signup3')
let loginbtn2 = document.getElementById('loginbtn2')
let loginbtn = document.getElementById('loginbtn')
let arrowRightP1 = document.getElementById('arrowRightP1')
let arrowRightP2 = document.getElementById('arrowRightP2')
let arrowRightS1 = document.getElementById('arrowRightS1')
let arrowRightS2 = document.getElementById('arrowRightS2')
let arrowDown = document.querySelectorAll('.arrowDown')




let signupBtn = document.getElementById('signupBtn1')




// passwordScreen1.style.display = 'none'
// passwordScreen2.style.display = 'none'
// passwordScreen3.style.display = 'none'
// signup1.style.display = 'none'
// signup2.style.display = 'none'
// signup3.style.display = 'none'



forgetBtn.addEventListener('click' , function(){
    window.location.href = 'passwordScreen1.html'
// login1.style.display = 'none'
})

// repassword.addEventListener('click' , function(){
//     window.location.href = 'passwordScreen2.html'
//     // passwordScreen1.style.display = 'none'
// })
// donePass.addEventListener('click' , function(){
//     window.location.href = 'passwordScreen3.html'
//     passwordScreen2.style.display = 'none'
// })


    signupBtn.addEventListener('click' , function(){
        window.location.href = 'signup1.html'

    })

loginbtn.addEventListener('click' , function(){
// signup1.style.display = 'none'
window.location.href = 'signup2.html'
})

loginbtn2.addEventListener('click' , function(){
    window.location.href = 'signup2.html'
    // signup2.style.display = 'none'
    })

    arrowRightP1.addEventListener('click' , function(){
        passwordScreen1.style.display = 'none'
        window.location.href = 'login1.html'
    })
        arrowRightP2.addEventListener('click' , function(){
            passwordScreen2.style.display = 'none'
            window.location.href = 'passwordScreen1.html'
        })
            arrowRightS1.addEventListener('click' , function(){
                window.location.href = 'signup1.html'
                signup2.style.display = 'none'
                })
                arrowRightS2.addEventListener('click' , function(){
                    signup3.style.display = 'none'
                    window.location.href = 'signup2.html'
                })

                    
                            
                            document.querySelectorAll('.select-icon').forEach(icon => {
                                icon.addEventListener('click', function() {
                                    this.classList.toggle('rotate'); 
                                });
                            });

                            document.querySelectorAll('select').forEach(select => {
                                const icon = select.nextElementSibling; 
                            
                                select.addEventListener('focus', function() {
                                    icon.classList.add('rotate'); 
                                });
                            
                                select.addEventListener('blur', function() {
                                    icon.classList.remove('rotate'); 
                                });
                            });

                            function checkInputDirection(input) {
                                const text = input.value;
                                const isArabic = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text) || /[0-9]/.test(text);
                                
                                if (isArabic) {
                                    input.style.direction = 'rtl';
                                    input.style.textAlign = 'right'; // لجعل النص يبدأ من اليمين
                                } else {
                                    input.style.direction = 'ltr';
                                    input.style.textAlign = 'left'; // لجعل النص يبدأ من اليسار
                                }
                            }

                
                 