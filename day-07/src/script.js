const inputFields = document.querySelectorAll("form input");
const header = document.querySelector(".header");
const para = document.querySelector(".para");

window.addEventListener("click", function () {
  console.log(inputFields[0] === document.activeElement);

  console.log("active");
  for (let i = 0; i < inputFields.length; i++) {
    if (inputFields[i] === document.activeElement) {
      header.classList.add("active-anim");
      para.classList.add("active");
      break;
    } else {
      header.classList.remove("active-anim");
      para.classList.remove("active");
    }
  }
});
