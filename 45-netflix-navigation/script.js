window.addEventListener("DOMContentLoaded", function () {
  const btnOpen = document.querySelector(".open-btn");
  const btnClose = document.querySelector(".close-btn");
  const navs = document.querySelectorAll(".nav");

  btnOpen.addEventListener("click", () => {
    navs.forEach((nav) => nav.classList.add("visible"));
  });

  btnClose.addEventListener("click", () => {
    navs.forEach((nav) => nav.classList.remove("visible"));
  });
});
