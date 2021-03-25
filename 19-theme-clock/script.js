const hourElement = document.querySelector('.hour');
const minuteElement = document.querySelector('.minute');
const secondElement = document.querySelector('.second');
const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');
const toggleBtn = document.querySelector('.toggle');


const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


toggleBtn.addEventListener('click',(e)=>{
  const html = document.querySelector('html');
  if(html.classList.contains('dark')){
    html.classList.remove('dark');
    e.target.innerHtml = 'Dark mode';
  }else{
    html.classList.add('dark');
    e.target.innerHtml = 'Light mode';
  }
});
const scale = (num,inMin,inMax,outMin,outMax)=>{
  return (num - inMin)*(outMax - outMin) / (inMax - inMin) + outMin;
  }
const setTime = () =>{
  const time = new Date();
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();
  const hours = time.getHours();
  const hoursForClock = hours % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const amPm = hours>=12?'PM':'AM';

  hourElement.style.transform = `translate(-50%,-100%) rotate(${scale(hoursForClock, 0,11,0,360)}deg)`;
  minuteElement.style.transform = `translate(-50%,-100%) rotate(${scale(minutes, 0,59,0,360)}deg)`;
  secondElement.style.transform = `translate(-50%,-100%) rotate(${scale(seconds, 0,59,0,360)}deg)`;


  timeElement.innerHTML = `${hoursForClock}:${minutes<10?`0${minutes}`:minutes} ${amPm}`;

  dateElement.innerHTML=`${days[day]}, ${months[month]} <span class="circle">${date}</span>`
}


setTime();
setInterval(setTime,1000);