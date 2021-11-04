const App = (function () {
  const ACTIONS = {
    API_URL: "https://api.lyrics.ovh",
    DEFAULT_CONFIGS: {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    },
    searchSongs: function (searchTerm) {
      return new Promise((resolve, reject) => {
        fetch(`${this.API_URL}/suggest/${searchTerm}`, this.DEFAULT_CONFIGS)
          .then((res) => res.json())
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
    getMoreSongs: function (url, configs = {}) {
      return new Promise((resolve, reject) => {
        const mergedConfigs = { ...this.DEFAULT_CONFIGS, configs };

        fetch(`https://cors-anywhere.herokuapp.com/${url}`, mergedConfigs)
          .then((res) => resolve(res.json()))
          .catch((err) => reject(err));
      });
    },
    getLyrics: function (artist, songTitle) {
      return new Promise((resolve, reject) => {
        fetch(`${this.API_URL}/v1/${artist}/${songTitle}`, this.DEFAULT_CONFIGS)
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              reject(data.error);
            }
            if (data.lyrics) {
              const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
              resolve(lyrics);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  };

  const UI_CONTROLLER = {
    SELECTORS: {
      form: document.getElementById("form"),
      search: document.getElementById("search"),
      result: document.getElementById("result"),
      more: document.getElementById("more"),
    },
    showData: function (data) {
      this.SELECTORS.result.innerHTML = `
            <ul class="songs">
             ${data.data
               .map((song) => {
                 return `
                <li>
                    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                    <button class="btn" data-artist="${song.artist.name}" data-songTitle="${song.title}">Get Lyrics</button>
                </li>
                
                `;
               })
               .join("")}
            </ul>
         `;

      if (data.prev || data.next) {
        const { more } = this.SELECTORS;

        if (data.prev) {
          const prevButton = this.createButton("Prev");
          prevButton.addEventListener("click", (e) => {
            ACTIONS.getMoreSongs(data.prev, { mode: "no-cors" }).then((res) =>
              this.showData(res)
            );
          });
          more.appendChild(prevButton);
        }
        if (data.next) {
          const nextButton = this.createButton("Next");
          nextButton.addEventListener("click", (e) => {
            ACTIONS.getMoreSongs(data.next, { mode: "no-cors" }).then((res) =>
              this.showData(res)
            );
          });
          more.appendChild(nextButton);
        }
      } else {
        this.SELECTORS.more.innerHTML = ``;
      }
    },
    createButton: function (text = "Submit", options = {}) {
      let btn = document.createElement("button");
      btn.classList.add("btn");
      btn.textContent = text;

      for (let key in options) {
        btn.setAttribute(key, options[key]);
      }

      return btn;
    },
  };

  function attachEvents() {
    UI_CONTROLLER.SELECTORS.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const searchTerm = UI_CONTROLLER.SELECTORS.search.value.trim();
      if (!searchTerm) {
        return;
      } else {
        ACTIONS.searchSongs(searchTerm).then((res) => {
          UI_CONTROLLER.showData(res);
        });
      }
    });

    UI_CONTROLLER.SELECTORS.result.addEventListener("click", function (e) {
      const clickedEl = e.target;
      if (clickedEl.tagName === "BUTTON") {
        const artist = clickedEl.getAttribute("data-artist");
        const songTitle = clickedEl.getAttribute("data-songtitle");

        ACTIONS.getLyrics(artist, songTitle)
          .then((data) => {
            UI_CONTROLLER.SELECTORS.result.innerHTML = `
            <h2><strong>${artist}</strong> - ${songTitle}</h2>
            <span>${data}</span>
          `;
            UI_CONTROLLER.SELECTORS.more.innerHTML = "";
          })
          .catch((err) => {
            UI_CONTROLLER.SELECTORS.result.innerHTML = `
            <h2><strong>${err}</strong></h2>
          `;
            UI_CONTROLLER.SELECTORS.more.innerHTML = "";
          });
      }
    });
  }

  return {
    init: function () {
      attachEvents();
    },
  };
})();

window.addEventListener("DOMContentLoaded", App.init());
