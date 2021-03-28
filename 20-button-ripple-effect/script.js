const buttons = document.querySelectorAll('.ripple');

buttons.forEach((btn) => {
  btn.addEventListener('click',function(e) {
    const x = e.clientX;
    const y = e.clientY;

    const btnTop = e.target.offsetTop;
    const btnLeft = e.target.offsetLeft;

    const xInside = x - btnLeft;
    const yInside = y - btnTop;

    const circleElement = document.createElement('span');
    circleElement.classList.add('circle');
    circleElement.style.top= `${yInside}px`;
    circleElement.style.left= `${xInside}px`;

    btn.appendChild(circleElement);

    setTimeout(()=>{
      circleElement.remove();
    },500);
  })
});