// Form elements on first panel that need validation
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneNumber = document.querySelector("#phoneNumber");
const submitButton = document.getElementById("submit-btn");

// Set initial validation status
let nameInputValidation = false;
let emailInputValidation = false;
let phoneInputValidation = false;

// Add event listeners to the input fields to validate on blur
nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("blur", validateEmail);
phoneNumber.addEventListener("blur", validatePhone);

// Validate Name
function validateName() {
  const nameValue = nameInput.value.trim();
  nameInputValidation = false;

  if (nameValue === "") {
    setErrorFor(nameInput, "This field is required!");
  } else if (!isValidName(nameValue)) {
    setErrorFor(nameInput, "Name must contain only letters and spaces");
  } else if (nameValue.length < 2) {
    setErrorFor(nameInput, "Name must be at least 2 characters long");
  } else if (nameValue.length > 20) {
    setErrorFor(nameInput, "Name must be less than 20 characters long");
  } else {
    setErrorFor(nameInput, "");
    nameInputValidation = true;
  }
}

function isValidName(name) {
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(name);
}

// Validate Name
function validatePhone() {
  console.log("hi there");
  const phoneValue = phoneNumber.value.trim();
  phoneInputValidation = false;

  if (phoneValue === "") {
    setErrorFor(phoneNumber, "This field is required!");
  } else if (!isValidPhone(phoneValue)) {
    setErrorFor(phoneNumber, "This field requires numbers");
  } else if (phoneValue.length < 6) {
    setErrorFor(phoneNumber, "Phone must be at least 6 characters long");
  } else if (phoneValue.length > 20) {
    setErrorFor(phoneNumber, "Phone must be less than 20 characters long");
  } else {
    setErrorFor(phoneNumber, "");
    phoneInputValidation = true;
  }
}
function isValidPhone(phone) {
  const phoneRegex = /^\d+$/;
  return phoneRegex.test(phone);
}

// Validate E-mail
function validateEmail() {
  console.log("hi there");
  emailInputValidation = false;
  const emailValue = emailInput.value.trim();

  if (emailValue === "") {
    setErrorFor(emailInput, "This field is required!");
  } else if (!isValidEmail(emailValue)) {
    setErrorFor(emailInput, "Please enter a valid email address");
  } else if (emailValue.length < 5) {
    setErrorFor(emailInput, "E-mail must be at least 5 characters long");
  } else {
    setErrorFor(emailInput, "");
    emailInputValidation = true;
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Set errors function
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const errorMessage = formControl.querySelector(".error-message");
  errorMessage.innerText = message;
}

// Checks all the inputs..
function checkInputs() {
  validateName();
  validatePhone();
  validateEmail();
}

const submissionAlert = document.querySelector(".submission-alert");
const errorMessage = document.querySelector(".error-message");
const successMessage = document.querySelector(".success-message");
const loadingMessage = document.querySelector(".loading-message");
console.log(submissionAlert);
function submitForm(e) {
  e.preventDefault();

  // Log when the function is called.
  console.log("submitForm is called");

  const form = document.getElementById("contact-form");
  const scriptURL = "";

  console.log(nameInputValidation, emailInputValidation, phoneInputValidation);

  if (nameInputValidation && emailInputValidation && phoneInputValidation) {
    // Log when the form passes validation.
    console.log("Form validation passed");
    submissionAlert.classList.add("show");
    loadingMessage.classList.add("show");
    // Get form data
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phoneNumber = document.getElementById("phoneNumber").value;

    // Log the form data
    console.log(name, email, phoneNumber);

    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        // Log the response from fetch
        console.log("Fetch response", response);

        // Check if the request was successful.
        if (response.ok) {
          // Send data to PHP script with AJAX request
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "./phpmailer/index.php", true);
          xhr.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
          );

          xhr.onreadystatechange = function () {
            // Log xhr state and status
            console.log("XHR state", xhr.readyState);
            console.log("XHR status", xhr.status);

            if (xhr.readyState == 4 && xhr.status == 200) {
              loadingMessage.classList.remove("show");
              successMessage.classList.add("show");
            }
          };

          xhr.send(
            "name=" + name + "&email=" + email + "&phoneNumber=" + phoneNumber
          );
        } else {
          throw new Error("Failed to submit form to Google Apps Script");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        loadingMessage.classList.remove("show");
        errorMessage.classList.add("show");
      });
  } else {
    // Log when form validation fails.
    console.log("Form validation failed");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  submitButton.addEventListener("click", (e) => {
    checkInputs();
    submitForm(e);
  });
});
