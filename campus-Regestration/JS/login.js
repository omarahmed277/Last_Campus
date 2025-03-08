
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
let loginbtn = document.getElementById('loginbtn1')
let arrowRightP1 = document.getElementById('arrowRightP1')
let arrowRightP2 = document.getElementById('arrowRightP2')
let arrowRightS1 = document.getElementById('arrowRightS1')
let arrowRightS2 = document.getElementById('arrowRightS2')
let arrowDown = document.querySelectorAll('.arrowDown')




let signupBtn = document.querySelectorAll('.signupBtn')




passwordScreen1.style.display = 'none'
passwordScreen2.style.display = 'none'
passwordScreen3.style.display = 'none'
signup1.style.display = 'none'
signup2.style.display = 'none'
signup3.style.display = 'none'



forgetBtn.addEventListener('click' , function(){
passwordScreen1.style.display = 'block'
login1.style.display = 'none'
})

repassword.addEventListener('click' , function(){
    passwordScreen2.style.display = 'block'
    passwordScreen1.style.display = 'none'
})
donePass.addEventListener('click' , function(){
    passwordScreen3.style.display = 'block'
    passwordScreen2.style.display = 'none'
})

signupBtn.forEach(btn => {
    btn.addEventListener('click' , function(){
        signup1.style.display = 'block'
        login1.style.display = 'none'
passwordScreen1.style.display = 'none'
passwordScreen3.style.display = 'none'


    })
})

loginbtn.addEventListener('click' , function(){
signup1.style.display = 'none'
signup2.style.display = 'block'
})

loginbtn2.addEventListener('click' , function(){
    signup3.style.display = 'block'
    signup2.style.display = 'none'
    })

    arrowRightP1.addEventListener('click' , function(){
        passwordScreen1.style.display = 'none'
        login1.style.display = 'block'
        })
        arrowRightP2.addEventListener('click' , function(){
            passwordScreen2.style.display = 'none'
            passwordScreen1.style.display = 'block'
            })
            arrowRightS1.addEventListener('click' , function(){
                signup1.style.display = 'block'
                signup2.style.display = 'none'
                })
                arrowRightS2.addEventListener('click' , function(){
                    signup3.style.display = 'none'
                    signup2.style.display = 'block'
                    })

                    arrowRightS2.addEventListener('click' , function(){
                        signup3.style.display = 'none'
                        signup2.style.display = 'block'
                        })
                        arrowRightS2.addEventListener('click' , function(){
                            signup3.style.display = 'none'
                            signup2.style.display = 'block'
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

                
                 