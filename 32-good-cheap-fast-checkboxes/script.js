class App {
  constructor() {
    this.handleEventListeners();
  }

  elements = {
    input: {
      toggles: document.querySelectorAll(".toggle"),
      good: document.querySelector("#good"),
      cheap: document.querySelector("#cheap"),
      fast: document.querySelector("#fast"),
    },
  };

  handleEventListeners = () => {
    this.elements.input.toggles.forEach((toggle) => {
      toggle.addEventListener("change", (e) => this.doTheTrick(e.target));
    });
  };

  doTheTrick = (theClickedOne) => {
    const good = this.elements.input.good;
    const cheap = this.elements.input.cheap;
    const fast = this.elements.input.fast;
    if (good.checked && cheap.checked && fast.checked) {
      if (good === theClickedOne) {
        fast.checked = false;
      }
      if (cheap === theClickedOne) {
        good.checked = false;
      }

      if (fast === theClickedOne) {
        cheap.checked = false;
      }
    }
  };
}

const app = new App();
