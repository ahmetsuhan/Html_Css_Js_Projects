const btn = document.getElementById("button");
const toasts = document.getElementById("toasts");

const messages = [
  "Message One",
  "Message Two",
  "Message Three",
  "Message Four",
  "Message Five",
  "Message Six",
  "Message Seven",
  "Message Eight",
  "Message Nine",
  "Message Ten",
];
const types = ["info", "success", "error"];
const getRandomType = (types = []) => {
  return types[Math.floor(Math.random() * types.length)];
};
const getRandomMessage = (messages = []) => {
  return messages[Math.floor(Math.random() * messages.length)];
};

const createNotification = (type = null) => {
  const notificationDiv = document.createElement("div");
  notificationDiv.classList.add("toast");
  type = getRandomType(types);
  notificationDiv.classList.add(type ? type : "info");

  notificationDiv.innerText = getRandomMessage(messages);

  notificationDiv.classList.add("animate-pull-left");
  toasts.appendChild(notificationDiv);

  setTimeout(() => {
    notificationDiv.remove();
  }, 5000);
};

btn.addEventListener("click", () => createNotification());
