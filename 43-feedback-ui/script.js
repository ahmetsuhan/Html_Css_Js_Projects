const ratings = document.querySelectorAll(".rating");
const ratingsContainer = document.querySelector(".ratings-container");

const btnSend = document.getElementById("send");
const panel = document.querySelector("#panel");
let selectedRating = "Satisfied";

ratingsContainer.addEventListener("click", (e) => {
  if (e.target.parentNode.classList.contains("rating")) {
    removeActive();
    e.target.parentNode.classList.add("active");
    selectedRating = e.target.nextElementSibling.textContent;
  }
});

btnSend.addEventListener("click", (e) => {
  panel.innerHTML = `
  <i class="fas fa-heart"></i>
  <strong>Thank You!</strong>
  </br>
  <strong>Feedback: ${selectedRating}</strong>
  <p>We'll use your feedback to improve out customer support</p>
  `;

  setTimeout(() => {
    window.location.reload();
  }, 3000);
});
function removeActive() {
  ratings.forEach((rating) => {
    rating.classList.remove("active");
  });
}
