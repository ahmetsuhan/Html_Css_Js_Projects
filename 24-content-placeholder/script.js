const header = document.getElementById('header');
const title = document.getElementById('title');
const excerpt = document.getElementById('excerpt');
const profile_img = document.getElementById('profile_img');
const name = document.getElementById('name');
const date = document.getElementById('date');

const animate_bgs = document.querySelectorAll('.animated-bg');
const animate_bg_texts = document.querySelectorAll('.animated-bg-text');


setTimeout(getData, 2500);

function getData(){
    header.innerHTML = `<img src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80" alt=""/>`
    title.innerHTML = 'Lorem Ipsum';
    excerpt.innerHTML='lorem ipsum dolor. sit amet consectetur';
    profile_img.innerHTML = `<img src="https://cdn.armut.com/UserPics/tr:w-325,h-325/83493588-a047-426d-bc43-45ce86cf65b3.jpeg" alt="">`;
    name.innerHTML = 'Ahmet S.O.';
    date.innerHTML = 'Apr 03, 2021';

    animate_bgs.forEach( (bg) => {
        bg.classList.remove('animated-bg');
    });

    animate_bg_texts.forEach((bg) => bg.classList.remove('animated-bg-text')); 
}
