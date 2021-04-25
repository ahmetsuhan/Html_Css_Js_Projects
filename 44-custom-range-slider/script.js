window.addEventListener("DOMContentLoaded", function () {
  const rangeInput = document.getElementById("range");
  rangeInput.addEventListener("input", (e) => {
    const value = +e.target.value;
    const label = e.target.nextElementSibling;

    const rangeWidth = getComputedStyle(e.target).getPropertyValue("width"); //e.target.clientWidth
    const labelWidth = getComputedStyle(label).getPropertyValue("width");

    // get rid of last two characters p and x, both labelWidth and rangeWidth
    const numRangeWidth = +rangeWidth.substring(0, rangeWidth.length - 2);
    const numLabelWidth = +labelWidth.substring(0, labelWidth.length - 2);

    const max = +e.target.max;
    const min = +e.target.min;

    const left =
      value * (numRangeWidth / max) -
      numLabelWidth / 2 +
      scale(value, min, max, 10, -10);
    label.style.left = `${left}px`;

    label.firstElementChild.innerHTML = value;
  });

  function scale(num, inMin, inMax, outMin, outMax) {
    return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
});
