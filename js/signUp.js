"use strict";

let signUpForm = document.querySelector(".signUp1-module form");
let userName = document.querySelector(".signUp1-module #user-name");
let userEmail = document.querySelector(".signUp1-module #email");
let userPhone = document.querySelector(".signUp1-module #phone");
let userPass = document.querySelector(".signUp1-module #password");
let userPassConfirm = document.querySelector(".signUp1-module #confirm-pass");
let checkbox = document.querySelector(".signUp1-module #checkbox");

let valid = false;

function styling(condition, error, input, color = "#d2d2d2") {
  if (condition) {
    document.querySelector(`${input} + ${error}`).style.display = "block";
    document.querySelector(`${input}`).style.borderColor = `#db3b21`;
    valid = false;
  } else {
    document.querySelector(`${input} + ${error}`).style.display = "none";
    document.querySelector(`${input}`).style.borderColor = color;
    valid = true;
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

  styling(checkbox.checked === false, `p`, `#checkbox + label`, `#101828`);

  if (!valid) return;

  document.querySelector(".signUp1-module").style.display = "none";
  document.querySelector(".signUp2-module").style.display = "block";

  let formData = {
    userName: document.getElementById("user-name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    passwordConfirm: document.getElementById("confirm-pass").value,
    phone: document.getElementById("phone").value,
  };

  async function signUp() {
    try {
      const res = await fetch(
        "https://tawgeeh-v1-production.up.railway.app/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.errors) {
        Object.keys(data.errors).forEach((field) => {
          throw new Error(field);
        });
      }

      if (data.successMessage) {
        document.querySelector(
          ".end-message"
        ).textContent = `${data.successMessage}`;
        // window.alert(data.successMessage);

        document.querySelector(".signUp2-module").style.display = "none";
        document.querySelector(".confirm-email-module").style.display = "block";
      }
    } catch (err) {
      document.querySelector(".end-message").textContent = `${err}`;
      // window.alert(err);
    }
  }
  signUp();
});

document.querySelector(".back-to1").addEventListener("click", () => {
  document.querySelector(".signUp1-module").style.display = "block";
  document.querySelector(".signUp2-module").style.display = "none";
});
//////////////
document.querySelector(".back-to2").addEventListener("click", () => {
  document.querySelector(".signUp2-module").style.display = "block";
  document.querySelector(".confirm-email-module").style.display = "none";
});

//////////////
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

  let formData = {
    userspecialty: userspecialty.value,
    usercountry: usercountry.value,
    userexperience: userexperience.value,
    aboutUser: aboutUser.value,
  };

  async function signUp() {
    try {
      const res = await fetch(
        "https://tawgeeh-v1-production.up.railway.app/users",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.errors) {
        Object.keys(data.errors).forEach((field) => {
          throw new Error(field);
        });
      }

      if (data.successMessage) {
        document.querySelector(
          ".end-message"
        ).textContent = `${data.successMessage}`;
        // window.alert(data.successMessage);

        document.querySelector(".signUp2-module").style.display = "none";
        document.querySelector(".confirm-email-module").style.display = "block";
      }
    } catch (err) {
      document.querySelector(".end-message").textContent = `${err}`;
      // window.alert(err);
    }
  }
  signUp();
});

// console.log(formData);
////////////////

// const codes = document.querySelectorAll(".code input");
// const confirmEmailForm = document.querySelector(".confirm-email");
// // console.log(c);

// confirmEmailForm.addEventListener("submit", (event) => {
//   event.preventDefault();

//   codes.forEach((e, i) => {
//     e.addEventListener("input", (ele) => {
//       ele.target.value.length === 1 && codes[i + 1].focus();
//     });

//     let opt = "";

//     opt += codes[i].value;
//     let formData = {
//       opt: opt,
//     };
//     console.log(formData);
//   });
// });

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
