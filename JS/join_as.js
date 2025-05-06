let instructions = document.getElementById('instructions');
let joinAs = document.getElementById('joinAs');
let penddingScreen = document.getElementById('penddingScreen');
let sucssesScreen = document.getElementById('sucssesScreen');
let feildScreen = document.getElementById('feildScreen');
let joinBtn = document.getElementById('joinBtn');
let submitBtn = document.getElementById('submitBtn');
let joinBtn_Pendding = document.getElementById('joinBtn_Pendding');
let joinBtn_Sucsess = document.getElementById('joinBtn_Sucsess');
let joinBtn_Feild = document.getElementById('joinBtn_Feild');
joinAs.style.display = 'none';
penddingScreen.style.display = 'none';
sucssesScreen.style.display = 'none';
feildScreen.style.display = 'none';
joinBtn.addEventListener('click', () => {
    joinAs.style.display = 'block';
    instructions.style.display = 'none';
});
submitBtn.addEventListener('click', () => {
    joinAs.style.display = 'none';
    penddingScreen.style.display = 'block';
});
joinBtn_Pendding.addEventListener('click', () => {
    penddingScreen.style.display = 'none';
    sucssesScreen.style.display = 'block';
});
joinBtn_Sucsess.addEventListener('click', () => {
    sucssesScreen.style.display = 'none';
    instructions.style.display = 'block';
});