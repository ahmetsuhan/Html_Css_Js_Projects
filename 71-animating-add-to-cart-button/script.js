document.addEventListener("DOMContentLoaded", () => {
  const cartBtns = document.querySelectorAll(".btn.cart-btn");

  cartBtns.forEach((btn) => {
    btn.addEventListener("click", addToCartBtnClick);
  });

  function addToCartBtnClick() {
    let timeout;
    clearTimeout(timeout);
    this.classList.remove("clicked");
    this.classList.add("clicked");
    this.disabled = true;

    timeout = setTimeout(() => {
      this.classList.remove("clicked");
      this.disabled = false;
    }, 3000);
  }
});
