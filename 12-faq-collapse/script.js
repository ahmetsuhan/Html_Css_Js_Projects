const toogleButtons = document.querySelectorAll('button');

toogleButtons.forEach( (button) =>{
  button.addEventListener('click',()=>{
    button.parentNode.classList.toggle('active');
  });
} );