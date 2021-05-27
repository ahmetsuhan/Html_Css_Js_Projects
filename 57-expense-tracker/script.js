const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const sessionStorageTransactions = JSON.parse(
  sessionStorage.getItem("transactions")
);

let transactions =
  sessionStorage.getItem("transactions") !== null
    ? sessionStorageTransactions
    : [];

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateRandomId(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);

    updateValues();

    updateSessionStorageTransactions();

    text.value = "";
    amount.value = "";
  }
}

function updateSessionStorageTransactions() {
  sessionStorage.setItem("transactions", JSON.stringify(transactions));
}

function generateRandomId() {
  return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
  ${transaction.text} <span >${sign}${Math.abs(transaction.amount)}</span>
  <button onClick="removeTransactionById(${
    transaction.id
  })" class="delete-btn">X</button>
  `;
  list.appendChild(item);
}

function removeTransactionById(transactionId) {
  transactions = transactions.filter(
    (transaction) => transaction.id !== transactionId
  );

  updateSessionStorageTransactions();

  init();
}

function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, cum) => acc + cum, 0)
    .toFixed(2);

  const expense = (
    amounts.filter((amount) => amount < 0).reduce((acc, cum) => acc + cum, 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;
}

function init() {
  list.innerHTML = "";
  transactions.forEach((transaction) => addTransactionDOM(transaction));

  updateValues();
}
if (sessionStorage.getItem("transactions") === null) {
  sessionStorage.setItem(
    "transactions",
    JSON.stringify([{ id: 1, text: "Computer", amount: -3500 }])
  );
}
init();

form.addEventListener("submit", addTransaction);
