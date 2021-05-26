const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.add("error");
  const errorMessage = input.nextElementSibling;
  errorMessage.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.remove("error");
  formControl.classList.add("success");
  const errorMessage = input.nextElementSibling;
  errorMessage.innerText = "message";
}

function checkEmail(input) {
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid!");
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password do not match!!!");
  }
}

function getFieldName(field) {
  return doUpperCase(field.id, 0);
}

function doUpperCase(str, index) {
  return str
    .split("")
    .map((letter, i) => (i === index ? letter.toLocaleUpperCase() : letter))
    .join("");
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function isEmptyString(str) {
  return str === "";
}

function checkInputLength(input, min, max) {
  if (input.value !== "") {
    if (input.value.length < min) {
      showError(
        input,
        `${getFieldName(input)} must be at least ${min} characters`
      );
    } else if (input.value.length > max) {
      showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`
      );
    } else {
      showSuccess(input);
      return true;
    }
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkInputLength(username, 3, 15);
  checkInputLength(password, 6, 15);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
