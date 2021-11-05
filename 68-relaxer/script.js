const App = (function () {
  const container = document.getElementById("container");
  const text = document.getElementById("text");

  const totalTime = 7500;
  const breathTime = (totalTime / 5) * 2;
  const holdTime = totalTime / 5;

  function breathAnimation() {
    text.innerText = "Breathe In!";
    container.className = "container grow";
    setTimeout(() => {
      text.innerText = "Hold";
      setTimeout(() => {
        text.innerText = "Breathe Out!";
        container.className = "container shrink";
      }, holdTime);
    }, breathTime);
  }

  function runBreathAnimation() {
    setInterval(breathAnimation, totalTime);
  }

  return {
    start: function () {
      runBreathAnimation();
    },
  };
})();
window.addEventListener("DOMContentLoaded", App.start());
