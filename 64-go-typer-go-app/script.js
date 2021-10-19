const App = (function () {
  let counterInterval;

  function generateRandomString(min, max) {
    const randomNumber = Math.floor(Math.random() * (max - min) + 1) + min;
    return Math.random()
      .toString(36)
      .replace(/[^a-zA-Z]+/gi, "")
      .substr(2, randomNumber);
  }

  const defaultInitialState = {
    score: 0,
    remainingTime: 30,
    difficulty: "easy",
  };
  const uiSelectors = {
    starters: {
      starter: ".starter",
      button: ".starter .starter__button",
    },
    settings: {
      settings: "#settings",
      button: ".settings__button",
      form: ".settings__form",
      difficulty: "#difficulty",
    },
    app: {
      app: "#app",
      remainingTime: ".app__remaining-time",
      score: ".app__score__text",
      gameText: ".app__game-text",
      input: ".app__game-input input",
      endGame: "#end-game-cotainer",
    },

    actions: {
      updateScoreText: function () {
        document.querySelector(uiSelectors.app.score).textContent = state.score;
      },
      updateCouter: function () {
        document.querySelector(
          uiSelectors.app.remainingTime
        ).textContent = `${state.remainingTime}s`;
      },
      startGame: function () {
        document
          .querySelector(uiSelectors.starters.starter)
          .classList.remove("active");
      },
      gameOver: function () {
        document
          .querySelector(uiSelectors.starters.starter)
          .classList.add("active");
      },
      updateGameText: function () {
        document.querySelector(uiSelectors.app.gameText).innerHTML =
          state.activeWord;
        uiSelectors.actions.clearGameInput();
      },
      clearGameInput: function () {
        document.querySelector(uiSelectors.app.input).value = "";
      },
    },
  };

  let state = {
    score: defaultInitialState.score,
    remainingTime: defaultInitialState.remainingTime,
    difficulty: defaultInitialState.difficulty,
    words: [],
    activeWord: "",
    updateDifficulty: function (value) {
      this.difficulty = value;
      // restart game
    },
    getScore: function () {
      return this.score;
    },
    increaseScore: function () {
      const mode = this.getGameMode();
      if (mode === "easy") {
        this.score += 1;
      } else if (mode === "medium") {
        this.score += 3;
      } else {
        this.score += 5;
      }

      this.setActiveWord();
    },
    count: function () {
      this.remainingTime -= 1;
    },

    addExtraTime: function (time) {
      this.remainingTime += time;
    },
    getGameMode: function () {
      return this.mode;
    },
    gameOver: function () {
      counterInterval && clearInterval(counterInterval);
      this.resetState();
    },
    checkCounter: function () {
      return !!this.remainingTime <= 0;
    },
    resetState: function () {
      state = {
        ...state,
        remainingTime: defaultInitialState.remainingTime,
        score: defaultInitialState.score,
        difficulty: defaultInitialState.difficulty,
      };
    },
    addCurrentWordToPool: function (currentWord) {
      this.words = [...this.words, currentWord];
    },
    setActiveWord: function () {
      const mode = this.getGameMode();
      let min = 3;
      if (mode === "medium") {
        min = 4;
      }

      if (mode === "hard") {
        min = 5;
      }
      this.activeWord = generateRandomString(min, min + 2);
    },
    getActiveWord: function () {
      return this.activeWord;
    },
    isWordsMatches: function (word) {
      return word === this.activeWord;
    },
    incrementCounter: function () {
      const mode = state.getGameMode();
      let addedTime = 3;
      if (mode === "easy") {
        addedTime += 2;
      }

      if (mode === "medium") {
        addedTime += 1;
      }

      this.addExtraTime(addedTime);
    },
    resetCounter: function () {
      this.remainingTime = defaultInitialState.remainingTime;
    },
    resetScore: function () {
      this.score = defaultInitialState.score;
    },
  };

  function gameOver() {
    state.gameOver();
    uiSelectors.actions.gameOver();
    console.log("Game Over");
  }

  function increaseScore() {
    state.increaseScore();
    uiSelectors.actions.updateScoreText();
  }

  function startCounter() {
    state.resetCounter();
    clearInterval(counterInterval);
    counterInterval = setInterval(updateCouter, 1000);
  }
  function updateCouter() {
    state.count();
    uiSelectors.actions.updateCouter();
    checkCounter();
  }

  function checkCounter() {
    const isTimeOver = state.checkCounter();

    if (isTimeOver) {
      gameOver();
    }
  }

  function attachEvents() {
    document
      .querySelector(uiSelectors.settings.difficulty)
      .addEventListener("input", changeGameMode);

    document
      .querySelector(uiSelectors.settings.button)
      .addEventListener("click", toggleSettings);

    document
      .querySelector(uiSelectors.app.input)
      .addEventListener("keyup", handleChange);

    document
      .querySelector(uiSelectors.starters.button)
      .addEventListener("click", startGame);
  }

  function toggleSettings() {
    const settingsEl = document.querySelector(uiSelectors.settings.settings);
    if (settingsEl.classList.contains("settings--active")) {
      settingsEl.classList.remove("settings--active");
      settingsEl.classList.add("settings--disabled");
    } else {
      settingsEl.classList.add("settings--active");
      settingsEl.classList.remove("settings--disabled");
    }
  }

  function changeGameMode(e) {
    const value = e.target.value;

    if (!value) {
      return;
    }
    state.updateDifficulty(value);
    startGame();
  }

  function increaseCounter() {
    state.incrementCounter();
    uiSelectors.actions.updateCouter();
  }

  function handleChange(e) {
    const value = e.target.value;
    const isTrueWord = state.isWordsMatches(value);

    if (isTrueWord) {
      increaseScore();
      increaseCounter();
      updateGameText();
    }
  }

  function updateGameText() {
    state.setActiveWord();
    uiSelectors.actions.updateGameText();
  }

  function startGame() {
    uiSelectors.actions.startGame();
    updateGameText();
    startCounter();
    state.resetScore();
    uiSelectors.actions.updateScoreText();
  }

  function load() {
    updateCouter();
  }

  return {
    init: function () {
      load();
      attachEvents();
    },
  };
})();

window.addEventListener("DOMContentLoaded", function () {
  App.init();
});
