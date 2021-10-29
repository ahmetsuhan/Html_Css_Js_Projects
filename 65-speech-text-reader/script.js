const main = document.querySelector("main");
const voicesSelect = document.querySelector("#voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/food.jpg",
    text: "I am Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I am Tired",
  },
  {
    image: "./img/angry.jpg",
    text: "I am Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I am Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I am Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I want to go to Outside",
  },
  {
    image: "./img/hurt.jpg",
    text: "I am Hurt",
  },
  {
    image: "./img/home.jpg",
    text: "I want to go Home",
  },
  {
    image: "./img/happy.jpg",
    text: "I am Happy",
  },
  {
    image: "./img/grandma.jpg",
    text: "I want to go to Grandmas",
  },
  {
    image: "./img/school.jpg",
    text: "I want to go to School",
  },
];

function createBox(item, index) {
  const box = document.createElement("div");

  const { image, text } = item;

  box.classList.add("box");
  box.innerHTML = `
    <img src=${image} alt=${text}/>
    <p class="info">${text}</p>
  `;

  box.addEventListener("click", function clickHandler() {
    let timeout;
    setTextMessage(text);
    speakText();

    box.classList.add("active");
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      box.classList.remove("active");
    }, 800);
  });

  main.appendChild(box);
}
data.forEach(createBox);

const message = new SpeechSynthesisUtterance();

let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;

    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

function setTextMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

speechSynthesis.addEventListener("voiceschanged", getVoices);

toggleBtn.addEventListener("click", function toggleTextBox() {
  document.getElementById("text-box").classList.toggle("show");
});

function closeTextBox() {
  document.getElementById("text-box").classList.remove("show");
}
closeBtn.addEventListener("click", closeTextBox);

function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

voicesSelect.addEventListener("change", setVoice);

readBtn.addEventListener("click", function readText() {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
