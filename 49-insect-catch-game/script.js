window.addEventListener("DOMContentLoaded", function () {
  let users = [];
  let highestScoreUsers = [];
  let userNameIsValid = false;
  let timeInterval = null;
  let seconds = 0,
    score = 0,
    selectedInsect = {};
  fetchUsers();
  console.log(users);
  loadRegisterPage();

  const registerForm = document.querySelector("form");
  const userNameInput = document.querySelector("form input");

  eventHandler();
  function eventHandler() {
    registerForm.addEventListener("submit", (e) => handleSubmit(e));
    userNameInput.addEventListener("input", (e) => {
      userNameIsValid = checkUserNameIsValid(e.target.value);
      if (!userNameIsValid || e.target.value === "") {
        disableStartBtn();
      } else {
        openStartBtn();
      }
    });
  }

  function selectStage() {
    const chooseInsectBtns = document.querySelectorAll(
      ".btn.choose-insect-btn"
    );
    chooseInsectBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        gamePage();
        const img = btn.querySelector("img");
        const src = img.getAttribute("src");
        const alt = img.getAttribute("alt");
        selectedInsect = {
          src,
          alt,
        };

        let screen = getElement(".choose");
        screen.classList.add("up");

        setTimeout(screen.remove(), 1500);
      });
    });
  }

  function checkUserNameIsValid(username) {
    const existing = users.filter((user) => user.userName === username);

    if (!username || username.length < 6 || existing[0]) {
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    addNewUser({ userName: userNameInput.value, score: 0 });
    choosePage();
    let screen = getElement(".register");
    screen.classList.add("up");
    setTimeout(function () {
      screen.remove();
    }, 1500);
  }

  function disableStartBtn() {
    let startBtn = null ?? getElement(".start-btn");
    startBtn.setAttribute("disabled", true);
  }

  function openStartBtn() {
    let startBtn = null ?? getElement(".start-btn");
    startBtn.removeAttribute("disabled");
  }

  function addNewUser(user) {
    users.push(user);
    window.sessionStorage.setItem("users", JSON.stringify(users));
  }

  function fetchUsers() {
    let usersS = JSON.parse(window.sessionStorage.getItem("users"));
    users = usersS ?? [];
  }

  function createInsect() {
    const insect = document.createElement("div");
    insect.classList.add("insect");
    const { x, y } = getRandomLocation();
    insect.style.top = `${y}px`;
    insect.style.left = `${x}px`;
    insect.innerHTML = `<img src="${selectedInsect.src}" alt="${
      selectedInsect.alt
    }" style="transform:rotate(${Math.random() * 360}deg)" >`;

    insect.addEventListener("click", catchInsect);
    let gameContainer = getElement(".game-container");
    gameContainer.appendChild(insect);
  }

  function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
  }

  function catchInsect() {
    let self = this;
    increaseScore();
    self.classList.add("caught");
    setTimeout(() => self.remove(), 2000);
    if (!document.querySelector(".message.visible")) {
      addInsects();
    }
  }

  function addInsects() {
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1500);
  }

  function pauseGame() {
    let insects = document.querySelectorAll(".insect");
    insects.forEach((ins) => {
      ins.removeEventListener("click", catchInsect);
    });

    clearInterval(timeInterval);
    let exitBtn = getElement(".exit-btn");
    let continueBtn = getElement(".continue-btn");
    exitBtn.addEventListener("click", function () {
      setTimeout(exitGame, 1000);
    });

    continueBtn.addEventListener("click", function () {
      hideMessage();
      continueGame();
    });
  }

  function exitGame() {
    clearInterval(timeInterval);
    updateUserScore();
    highScorePage();
    getUSerByHighestScores();
    manageTableRow();
    let screen = getElement(".game-container");

    screen.classList.add("up");

    setTimeout(function () {
      screen.remove();
    }, 1500);
  }

  function manageTableRow() {
    let table = getElement(".highscore-table");
    if (table.childElementCount > 6) {
      for (let i = 5; i < table.childElementCount; i++) {
        table.children[i].remove();
      }
    }
  }

  function getUSerByHighestScores() {
    let users = JSON.parse(window.sessionStorage.getItem("users"));

    let sortedUsers = sortUserByScore(users);

    if (sortedUsers.length > 5) {
      highestScoreUsers = sortedUsers.slice(0, 5);
    } else {
      highestScoreUsers = sortedUsers.slice(0, sortedUsers.length);
    }

    addHighestScorerUsersToTable(highestScoreUsers);
  }

  function addHighestScorerUsersToTable(highestScorerUsers = []) {
    let users = highestScorerUsers || [];
    const highestScoreTable = getElement(".highscore-table");
    users.forEach((user) => {
      const userLi = createTableLi(user);
      highestScoreTable.appendChild(userLi);
    });
  }

  function createTableLi(user) {
    let li = document.createElement("li");
    let nameSpan = document.createElement("span");
    nameSpan.textContent = user.userName;
    let scoreSpan = document.createElement("span");
    scoreSpan.textContent = user.score;
    li.appendChild(nameSpan);
    li.appendChild(scoreSpan);
    return li;
  }

  function sortUserByScore(users) {
    let sortable = [];
    for (let i = 0; i < users.length; i++) {
      sortable.push(Object.entries(users[i]));
    }

    for (let i = 0; i < sortable.length; i++) {
      for (let j = 0; j < sortable.length - 1; j++) {
        if (sortable[j][1][1] < sortable[j + 1][1][1]) {
          let temp = sortable[j];
          sortable[j] = sortable[j + 1];
          sortable[j + 1] = temp;
        }
      }
    }
    let arr = [];
    for (let i = 0; i < sortable.length; i++) {
      arr = [...arr, Object.fromEntries(new Map(sortable[i]))];
    }
    return arr;
  }

  function restartGame() {
    window.location.reload();
  }

  function continueGame() {
    timeInterval = setInterval(increaseTime, 1000);
    let insects = document.querySelectorAll(".insect");
    insects.forEach((ins) => {
      ins.addEventListener("click", catchInsect);
    });
  }

  function startGame() {
    setTimeout(createInsect, 1000);
    timeInterval = setInterval(increaseTime, 1000);
  }

  function increaseTime() {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;
    const timeEl = document.getElementById("time");

    if (timeEl) {
      timeEl.innerHTML = `Time: ${min}:${sec}`;
    }
    seconds++;
  }

  function increaseScore() {
    score++;

    if (score % 10 === 0) {
      showMessage();
      pauseGame();
    }
    const scoreEl = document.getElementById("score");

    scoreEl.innerHTML = `Score: ${score}`;
  }

  function showMessage() {
    const messageEl = document.getElementById("message");
    messageEl.classList.add("visible");
  }

  function hideMessage() {
    const messageEl = document.getElementById("message");
    messageEl.classList.remove("visible");
  }

  function updateUserScore() {
    users[users.length - 1].score = score;
    window.sessionStorage.setItem("users", JSON.stringify(users));
  }

  function getElement(elementClass = "") {
    let element = null;
    if (!isString(elementClass)) {
      return element;
    }
    if (!compareFisrtLetter(elementClass, ".")) {
      element = document.querySelector("." + elementClass);
      return element;
    }
    element = document.querySelector(elementClass);
    return element;
  }

  function isString(value) {
    if (!(typeof value === "string")) {
      return false;
    }
    return true;
  }

  function compareFisrtLetter(str = "", value = "") {
    let newStr = str.split("");
    return newStr[0] === value;
  }

  function loadRegisterPage() {
    let screen = document.createElement("div");
    screen.classList = "screen register";
    let h1 = document.createElement("h1");
    h1.classList.add("title");
    h1.textContent = "Catch The Insect";
    screen.appendChild(h1);
    let form = document.createElement("form");
    let input = document.createElement("input");
    input.setAttribute("required", true);
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "At least 6 character...");
    form.appendChild(input);
    let btn = document.createElement("button");
    btn.setAttribute("type", "submit");
    btn.setAttribute("disabled", true);
    btn.id = "start-btn";
    btn.classList = "btn start-btn animated-idle";
    btn.textContent = "Play Game";
    form.appendChild(btn);
    screen.appendChild(form);
    document.body.prepend(screen);
  }

  function choosePage() {
    let screen = document.createElement("div");
    screen.classList = "screen choose";
    screen.innerHTML = `
    <h1>What is your "favourite insect?"</h1>
    <ul class="insects-list">
      <li>
        <button class="btn choose-insect-btn">
          <p>fly</p>
          <img
            src="http://pngimg.com/uploads/fly/fly_PNG3946.png"
            alt="fly"
          />
        </button>
      </li>
      <li>
        <button class="btn choose-insect-btn">
          <p>Mosquito</p>
          <img
            src="http://pngimg.com/uploads/mosquito/mosquito_PNG18175.png"
            alt="mosquito"
          />
        </button>
      </li>
      <li>
        <button class="btn choose-insect-btn">
          <p>Spider</p>
          <img
            src="http://pngimg.com/uploads/spider/spider_PNG12.png"
            alt="spider"
          />
        </button>
      </li>
      <li>
        <button class="btn choose-insect-btn">
          <p>Roach</p>
          <img
            src="http://pngimg.com/uploads/roach/roach_PNG12163.png"
            alt="roach"
          />
        </button>
      </li>
    </ul>
    `;
    document.body.appendChild(screen);

    selectStage();
  }

  function gamePage() {
    let gameContainer = document.createElement("div");
    gameContainer.id = "game-container";
    gameContainer.classList = "screen game-container";
    gameContainer.innerHTML = `
    <h3 class="time" id="time">Time: 00:00</h3>
    <h3 class="score" id="score">Score: 0</h3>
    <h5 id="message" class="message">
      <p>Are you annoyed yet?<br />You are playing an impossible game!!!</p>
      <div class="btn-area">
        <button class="btn exit-btn">Exit</button>
        <button class="btn continue-btn">Continue Game</button>
      </div>
    </h5>
    
    `;
    document.body.appendChild(gameContainer);
    startGame();
  }

  function highScorePage() {
    let screen = document.createElement("div");
    screen.classList = "screen highest-scores";
    screen.innerHTML = `
    <div class="container">
          <h1 class="highscore-title">The Highest Scores</h1>
          <ul class="highscore-table">
            <li class="first"><span>Name</span><span>Score</span></li>
          </ul>
          <div class="btn-area">
            <button class="btn restart-btn">Restart Game</button>
          </div>
        </div>
    `;

    document.body.appendChild(screen);
    clearInterval(timeInterval);
    let restartBtn = getElement(".restart-btn");
    restartBtn.addEventListener("click", restartGame);
  }
});
