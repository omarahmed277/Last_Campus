let mentorsection = document.getElementById('mentorsection');
let mentorsection2 = document.getElementById('mentorsection2');
let mentorsection3 = document.getElementById('mentorsection3');
let sessionName = document.getElementById('sessionName');
let sessionName2 = document.getElementById('sessionName2');
let sessionName3 = document.getElementById('sessionName3');
let mentorComments = document.getElementById('mentorComments');
let mentorComments2 = document.getElementById('mentorComments2');
let mentorComments3 = document.getElementById('mentorComments3');
let arrow_left1 = document.getElementById('arrow_left1');
let arrow_left2 = document.getElementById('arrow_left2');
let arrow_left3 = document.getElementById('arrow_left3');
let history = document.getElementById('history');
let penddingSessions = document.getElementById('penddingSessions');
let nextSessions = document.getElementById('nextSessions');




mentorsection.classList.toggle('none') 
mentorsection2.classList.toggle('none') 
mentorsection3.classList.toggle('none') 
sessionName.classList.toggle('none') 
sessionName2.classList.toggle('none') 
sessionName3.classList.toggle('none') 
mentorComments.classList.toggle('none') 
mentorComments2.classList.toggle('none') 
mentorComments3.classList.toggle('none') 

arrow_left1.addEventListener('click', function() {
    this.classList.toggle('arrow_left_active');
    mentorsection.classList.toggle('none')
    sessionName.classList.toggle('none')
    mentorComments.classList.toggle('none')
    
});
arrow_left2.addEventListener('click', function() {
    this.classList.toggle('arrow_left_active');
    mentorsection2.classList.toggle('none')
    sessionName2.classList.toggle('none')
    mentorComments2.classList.toggle('none')
});
arrow_left3.addEventListener('click', function() {
    this.classList.toggle('arrow_left_active');
    mentorsection3.classList.toggle('none')
    sessionName3.classList.toggle('none')
    mentorComments3.classList.toggle('none')
});

history.addEventListener('click' , function(){
    window.location.href = 'history-scssions.html';
})
penddingSessions.addEventListener('click' , function(){
    window.location.href = 'pendding-scssions.html';
})
nextSessions.addEventListener('click' , function(){
    window.location.href = 'index.html';
})