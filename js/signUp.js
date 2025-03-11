"use strict";

let signUpForm = document.querySelector(".signUp1-module form");
let userName = document.querySelector(".signUp1-module #user-name");
let userEmail = document.querySelector(".signUp1-module #email");
let userPhone = document.querySelector(".signUp1-module #phone");
let userPass = document.querySelector(".signUp1-module #password");
let userPassConfirm = document.querySelector(".signUp1-module #confirm-pass");
let checkbox = document.querySelector(".signUp1-module #checkbox");

const user = {
  userName: "hady",
  userEmail: "hady@gmail.com",
  userPhone: "01025541212",
  userPass: "123123",
  userPassConfirm: "123123",
};

function signUp(userName, userEmail, userPhone, userPass, userPassConfirm) {
  const user = { userName, userEmail, userPhone, userPass, userPassConfirm };
  console.log(user);
  return user;
}
let valid = false;

function styling(condition, error, input) {
  if (condition) {
    document.querySelector(`${input} + ${error}`).style.display = "block";
    document.querySelector(`${input}`).style.borderColor = `#db3b21`;
    return valid;
  } else {
    document.querySelector(`${input} + ${error}`).style.display = "none";
    document.querySelector(`${input}`).style.borderColor = `#d2d2d2`;
    valid = true;
    return valid;
  }
}

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  styling(
    userName.value === "" || userName.value.length <= 3,
    `p`,
    `#user-name`
  );

  const regEmail = /\w+@\w+\.\w+/g;
  styling(!regEmail.test(userEmail.value), `p`, `#email`);

  const regPhone = /(010|011|012|015)\d{8}/;
  styling(!regPhone.test(userPhone.value), `p`, `#phone`);

  const regPass = /\w{6,}/gi;
  styling(!regPass.test(userPass.value), `p`, `#password`);

  styling(userPassConfirm.value !== userPass.value, `p`, `#confirm-pass`);

  if (!valid) return;

  if (checkbox.checked === false) {
    document.querySelector(`#checkbox + label + p`).style.display = `block`;
    document.querySelector(`#checkbox + label`).style.color = `#db3b21`;
    return;
  } else {
    document.querySelector(`#checkbox + label + p`).style.display = `none`;
    document.querySelector(`#checkbox + label`).style.color = `#101828`;
  }

  document.querySelector(".signUp1-module").style.display = "none";
  document.querySelector(".signUp2-module").style.display = "block";
});

document.querySelector(".back-to1").addEventListener("click", () => {
  document.querySelector(".signUp1-module").style.display = "block";
  document.querySelector(".signUp2-module").style.display = "none";
});

document.querySelector(".back-to2").addEventListener("click", () => {
  document.querySelector(".signUp2-module").style.display = "block";
  document.querySelector(".confirm-email-module").style.display = "none";
});

let signUpForm2 = document.querySelector(".signUp2");
let userspecialty = document.querySelector("#specialty");
let usercountry = document.querySelector("#country");
let userexperience = document.querySelector("#experience");
let aboutUser = document.querySelector("#about");

signUpForm2.addEventListener("submit", (e) => {
  e.preventDefault();

  styling(userspecialty.value === "", `p`, `#specialty`);
  styling(usercountry.value === "select", `p`, `#country`);
  styling(userexperience.value === "select", `p`, `#experience`);
  styling(aboutUser.value === "", `p`, `#about`);
  if (!valid) {
    return;
  } else {
    document.querySelector(".signUp2-module").style.display = "none";
    document.querySelector(".confirm-email-module").style.display = "block";
  }
});

// logform.addEventListener("submit", (e) => {
//   const email = document.getElementById("log-email").value;
//   const password = document.getElementById("log-password").value;

//   const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   const validateEmail = regEmail.test(email);

//   const regpass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
//   const validatePass = regpass.test(password);

//   if (validateEmail && validatePass) {
//     window.location.href = "./home.html";
//   } else {
//     e.preventDefault();
//   }
// });
