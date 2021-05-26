const currencyElOne = document.getElementById("currency-one");
const currencyElTwo = document.getElementById("currency-two");
const amountElOne = document.getElementById("amount-one");
const amountElTwo = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

function calculate() {
  const currencyOne = currencyElOne.value;
  const currencyTwo = currencyElTwo.value;

  fetch(
    `http://api.exchangeratesapi.io/v1/latest?access_key=bf377ca0d7366439a7692df8eaa3e117&base=EUR`
  )
    .then((res) => res.json())
    .then((res) => {
      const rate = res.rates[currencyTwo];

      rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

      amountElTwo.value = (amountElOne.value * rate).toFixed(2);
    });
}

amountElOne.addEventListener("input", calculate);

swap.addEventListener("click", calculate);
