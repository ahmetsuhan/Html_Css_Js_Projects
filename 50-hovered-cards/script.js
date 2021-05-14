class Card {
  constructor(cardName, title, text) {
    this.cardName = cardName;
    this.title = title || "card title";
    this.text = text || "card text";

    this.card = this.createCard(cardName, title, text);
  }

  createCard(cardName, title, text) {
    const self = this;
    let cardDiv = document.createElement("div");
    cardDiv.classList = cardName;
    let front = self.createFront();
    let back = self.createBack(title, text);
    cardDiv.appendChild(front);
    cardDiv.appendChild(back);

    return cardDiv;
  }

  createImgTag(src = "", alt = "") {
    let img = document.createElement("img");

    img.setAttribute("src", src);
    img.alt = alt;
    return img;
  }

  createBack(title = "", text = "") {
    let back = document.createElement("div");
    back.classList = "back";
    let backContent = document.createElement("div");
    backContent.classList.add("back-content");
    let pName = document.createElement("div");
    pName.classList = "pname";
    pName.innerText = title;

    let description = document.createElement("div");
    description.classList = "description";
    description.innerText = text;

    let icons = document.createElement("div");
    icons.classList = "icons";
    icons.innerHTML = `<i class="fa fa-facebook"></i>
    <i class="fa fa-twitter"></i>
    <i class="fa fa-instagram"></i>`;

    back.appendChild(backContent);
    backContent.appendChild(pName);
    backContent.appendChild(description);
    backContent.appendChild(icons);

    return back;
  }

  createFront() {
    const self = this;
    let frontDiv = document.createElement("div");
    frontDiv.classList.add("front");
    let img = self.createImgTag(
      "https://source.unsplash.com/random/",
      null,
      ""
    );
    frontDiv.appendChild(img);

    // frontDiv.style.cssText =
    //   "position:absolute;top:0;left:0;width:100%;height:100%;transition:all 0.5s ease;";
    return frontDiv;
  }
}

class App {
  builder(builderObject) {
    builderObject.setCard1();
    builderObject.setCard2();
    builderObject.setCard3();
    builderObject.setCard4();
    builderObject.setCard5();
    builderObject.setCard6();
    builderObject.setCard7();
    builderObject.setCard8();

    builderObject.addCard1();
    builderObject.addCard2();
    builderObject.addCard3();
    builderObject.addCard3ToSeeContainerParts();
    builderObject.addCard4();
    builderObject.addCard5();
    builderObject.addCard6();
    builderObject.addCard7();
    builderObject.addCard8();

    builderObject.setContainerElement();
    builderObject.addCardToContainer();
    return builderObject.get();
  }
}

class Cards {
  constructor() {
    this.card1 = undefined;
    this.card2 = undefined;
    this.card3 = undefined;
    this.card4 = undefined;
    this.card5 = undefined;
    this.card6 = undefined;
    this.card7 = undefined;
    this.card8 = undefined;

    this.cards = [];
    this.container = document.querySelector(".container");
    this.seeContainerCount = 3;
  }

  setCard1() {
    this.card1 = new Card("card-1", "card1 title", "card1 text");
  }
  getCard1() {
    return this.card1.card;
  }

  addCard1() {
    this.cards.push(this.getCard1());
  }

  setCard2() {
    this.card2 = new Card("card-2", "card2 title", "card2 text");
  }
  getCard2() {
    return this.card2.card;
  }
  addCard2() {
    this.cards.push(this.getCard2());
  }

  setCard3() {
    this.card3 = new Card("card-3", "card3 title", "card3 text");
  }
  getCard3() {
    return this.card3.card;
  }
  addCard3() {
    this.cards.push(this.getCard3());
  }

  addCard3ToSeeContainerParts() {
    let card = this.getCard3();
    let seeContainer = document.createElement("div");
    seeContainer.classList.add("see-container");
    let see = document.createElement("div");
    see.classList.add("see");

    for (let i = 0; i < this.seeContainerCount; i++) {
      const seeCopy = see.cloneNode();
      seeContainer.prepend(seeCopy);
    }

    card.children.item(1).prepend(seeContainer);
  }

  setCard4() {
    this.card4 = new Card("card-4", "card4 title", "card4 text");
  }
  getCard4() {
    return this.card4.card;
  }
  addCard4() {
    this.cards.push(this.getCard4());
  }

  setCard5() {
    this.card5 = new Card("card-5", "card5 title", "card5 text");
  }

  getCard5() {
    return this.card5.card;
  }

  addCard5() {
    this.cards.push(this.getCard5());
  }

  setCard6() {
    this.card6 = new Card("card-6", "card6 title", "card6 text");
  }

  getCard6() {
    return this.card6.card;
  }

  addCard6() {
    this.cards.push(this.getCard6());
  }

  setCard7() {
    this.card7 = new Card("card-7", "card7 title", "card7 text");
  }

  getCard7() {
    return this.card7.card;
  }

  addCard7() {
    this.cards.push(this.getCard7());
  }

  setCard8() {
    this.card8 = new Card("card-8", "card8 title", "card8 text");
  }

  getCard8() {
    return this.card8.card;
  }

  addCard8() {
    this.cards.push(this.getCard8());
  }

  setContainerElement() {
    this.container = document.querySelector(".container");
  }
  addCardToContainer() {
    const cards = this.get();
    cards.forEach((card) => this.container.appendChild(card));
  }

  get() {
    return this.cards;
  }
}

function root() {
  const cards = new Cards();

  const app = new App();

  const application = app.builder(cards);

  console.log(application);
}
root();
