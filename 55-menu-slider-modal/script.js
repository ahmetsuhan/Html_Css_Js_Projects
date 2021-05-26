const btnToggle = document.getElementById("toggle");
const btnClose = document.getElementById("close");
const btnOpen = document.getElementById("open");
const modal = document.getElementById("modal");
const btnSubmit = document.querySelector(".submit-btn");

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
});

btnToggle.addEventListener("click", function () {
  document.body.classList.toggle("show-nav");
});

btnOpen.addEventListener("click", function () {
  modal.classList.add("show-modal");
});

btnClose.addEventListener("click", function () {
  modal.classList.remove("show-modal");
});

window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.classList.remove("show-modal");
  } else {
    return false;
  }
});
