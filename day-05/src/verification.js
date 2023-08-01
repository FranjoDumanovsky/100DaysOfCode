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

async function submitForm(e) {
  e.preventDefault();
  console.log("submitForm is called");

  const form = document.getElementById("contact-form");
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyQp57j3RVtKyM-ZkszMbCMgq6pn1IenSN7TAdbxTJi9yyp506KBGEPHbsbolhRRn2tkQ/exec";

  if (nameInputValidation && emailInputValidation && phoneInputValidation) {
    console.log("Form validation passed");
    submissionAlert.classList.add("show");
    loadingMessage.classList.add("show");

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;

    console.log(name, email, phoneNumber);

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: new FormData(form),
      });
      if (!response.ok)
        throw new Error("Failed to submit form to Google Apps Script");
      console.log("Fetch response", response);

      const data = {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        //... other data you need to send
      };

      const res = await fetch("./phpmailer/index.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        console.log("PHPMailer response", res);
        loadingMessage.classList.remove("show");
        successMessage.classList.add("show");
        phoneNumber.parentElement.style.display = "none";
      } else {
        throw new Error("Failed to send email via PHPMailer");
      }
    } catch (error) {
      console.error("Error:", error);
      loadingMessage.classList.remove("show");
      errorMessage.classList.add("show");
    }
  } else {
    console.log("Form validation failed");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  submitButton.addEventListener("click", (e) => {
    checkInputs();
    submitForm(e);
  });
});
