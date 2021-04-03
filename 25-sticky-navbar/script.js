const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav ul li a');
window.addEventListener('scroll',fixNav);
function fixNav(){
   if(window.scrollY > nav.offsetHeight){
    nav.classList.add('active');
   }else{
       nav.classList.remove('active');
   }
}

navLinks.forEach((navLink)=>{
    navLink.addEventListener('click',(e) =>{
        e.preventDefault();
       navLinks.forEach(l=>{
           l.classList.remove('current')
       })
       e.target.classList.add('current');
    });
});
