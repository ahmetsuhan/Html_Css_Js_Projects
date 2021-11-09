const app = {
  init: function () {
    setInterval(this.updateCount, 1000);
  },
  updateCount: function () {
    const currentYear = new Date().getFullYear();
    const newYearTime = new Date(`January 01 ${currentYear + 1}`);
    const currentTime = new Date();
    const diff = newYearTime - currentTime;

    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;

    document.getElementById("remaining-days").innerText = d;
    document.getElementById("remaining-hours").innerText = h < 10 ? "0" + h : h;
    document.getElementById("remaining-minutes").innerText =
      m < 10 ? "0" + m : m;
    document.getElementById("remaining-seconds").innerText =
      s < 10 ? "0" + s : s;
    document.getElementById("year-text").innerText = currentYear + 1;
  },
};

window.addEventListener("DOMContentLoaded", app.init());
