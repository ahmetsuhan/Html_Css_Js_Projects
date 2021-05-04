const data = {};
data.constants = {
  imageUrl: "https://source.unsplash.com/random/",
  rows: 10,
};
data.elements = {
  body: document.querySelector("body"),
  div: {
    container: document.querySelector(".container"),
  },
};

const app = (function (data) {
  const { constants, elements } = data;

  function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 300;
  }
  function createImgTag() {
    for (let i = 0; i < constants.rows * 3; i++) {
      const div = document.createElement("div");
      div.classList.add("img-container");
      const img = document.createElement("img");
      img.classList.add("random-image");
      img.src = `${constants.imageUrl}${getRandomSize()}`;
      div.appendChild(img);
      elements.div.container.appendChild(div);
    }
  }

  function getRandomSize() {
    return `${getRandomNumber()}x${getRandomNumber()}`;
  }

  function selectElementByClassName(element = "") {
    let elementClassName = "." + element;
    let elements = [];
    if (document.querySelectorAll(elementClassName)[0]) {
      elements = document.querySelectorAll(elementClassName);
      elements.forEach((element) => {
        bindEvent("click", element, function (e) {
          if (!isModalOpen()) {
            const newElementDiv = element.parentElement.cloneNode();
            const newImage = element.cloneNode();
            newElementDiv.appendChild(newImage);

            showModal(newElementDiv);
          }
          if (isModalOpen()) {
            bindEvent("click", getElement("modal"), closeModal);
          }
        });
      });
    }
    return elements;
  }
  function isModalOpen() {
    return data.elements.body.firstElementChild.classList.contains("modal");
  }
  function closeModal() {
    const modal = getElement("modal");
    modal.classList = "modal move-up";
    function removeModal() {
      data.elements.body.removeChild(modal);
    }
    setTimeout(removeModal, 1000);
  }

  function getElement(className) {
    return document.querySelector(`.${className}`);
  }

  function bindEvent(event = "", element, callback = function () {}) {
    element.addEventListener(event, callback);
  }

  function showModal(element) {
    createModal(element);
  }

  function createModal(element) {
    const modalDiv = document.createElement("div");
    modalDiv.classList = "modal move-down";
    element.classList.add("p-relative");

    const modalInfoText = document.createElement("span");
    modalInfoText.textContent = "Click to close✌!";
    modalInfoText.classList.add("modal-info-text");

    element.appendChild(modalInfoText);

    modalDiv.appendChild(element);

    elements.body.prepend(modalDiv);
  }

  function load() {
    createImgTag();
    selectElementByClassName("random-image");
  }

  return {
    init: function () {
      load();
    },
  };
})(data);

app.init();
