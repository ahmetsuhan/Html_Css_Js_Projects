class App {
  constructor() {
    this.handleEventListeners();
  }

  elements = {
    div: {
      lenght: document.getElementById("lenght"),
      upperCase: document.getElementById("uppercase"),
      lowercase: document.getElementById("lowercase"),
      number: document.getElementById("numbers"),
      symbol: document.getElementById("symbols"),
    },
    button: {
      generate: document.getElementById("generate"),
      clipboard: document.getElementById("clipboard"),
    },
    span: {
      result: document.getElementById("result"),
      copiedText: document.getElementById("copied-text"),
    },
  };

  handleEventListeners = () => {
    this.elements.button.generate.addEventListener("click", () => {
      const lenght = +this.elements.div.lenght.value;
      const hasLower = this.elements.div.lowercase.checked;
      const hasUpper = this.elements.div.upperCase.checked;
      const hasNumber = this.elements.div.number.checked;
      const hasSymbol = this.elements.div.symbol.checked;

      this.elements.span.result.innerText = this.generatePassword(
        lenght,
        hasUpper,
        hasLower,
        hasNumber,
        hasSymbol
      );
    });

    this.elements.button.clipboard.addEventListener("click", (e) => {
      const textarea = document.createElement("textarea");
      const password = this.elements.span.result.innerText;

      if (!password) {
        return;
      }

      textarea.value = password;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      //alert("Password copied to clipboard!");

      this.showCopiedPopup();
    });
  };

  showCopiedPopup = () => {
    let popupSpan = document.createElement("span");
    popupSpan.classList.add("copied-text", "active");
    popupSpan.innerText = "Copied";
    this.elements.button.clipboard.appendChild(popupSpan);
    setTimeout(() => {
      popupSpan.remove();
    }, 250);
  };

  getRandomLowercase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  };

  getRandomUppercase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  };

  getRandomNumbers = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  };

  getRandomSymbol = () => {
    const symbols = "!@#$%^&*()[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  randomFunc = {
    lower: this.getRandomLowercase,
    upper: this.getRandomUppercase,
    number: this.getRandomNumbers,
    symbol: this.getRandomSymbol,
  };

  calculateObjectLenght = (object) => {
    return Object.keys(object).length;
  };

  generateRandomFuncName = (object) => {
    const lenght = this.calculateObjectLenght(object);
    return Object.keys(object)[Math.floor(Math.random() * lenght)];
  };

  generatePassword = (lenght, upper, lower, number, symbol) => {
    let generatedPassword = "";
    const typesCount = upper + lower + number + symbol;

    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );

    if (typesCount === 0) {
      return "";
    }
    if (lenght < 5) {
      return "Password must have at least 5 characters";
    }

    for (let i = 0; i < lenght; i += typesCount) {
      typesArr.forEach((type) => {
        generatedPassword += this.randomFunc[
          this.generateRandomFuncName(this.randomFunc)
        ]();
      });
    }

    const finalPassword = generatedPassword.slice(0, lenght);
    return finalPassword;
  };
}

const app = new App();
