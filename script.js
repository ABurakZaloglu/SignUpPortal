const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(input) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if(re.test(input.value)){
    showSuccess(input)
  }else{
    showError(input, 'Email is not valid');
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}
function checkLength (input, min, max){
    if (input.value.length < min) {
        
        showError(input, `${getFieldName(input)} is too short`);
      } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} is too long`);
      } else {
        showSuccess(input);
      }
}
function matchPassword(e, a){
    if(e.value==a.value){
        showSuccess(e)
        showSuccess(a)
    }else{
        showError(e,`Passwords not matching`)
        showError(a,`Passwords not matching`)
    }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username,3,15);
  checkLength(password,6,25);
  checkEmail(email);
  matchPassword(password,password2);
});
