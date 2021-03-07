const baseURL = 'https://icanhazdadjoke.com';
const jokeElement = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');


 generateJoke =async () =>{
   const config = {
    headers:{
      'Accept':'application/json'
    }
  }
  let res = await fetch(baseURL,config).then( response => response.json())
  .then( data => {
    jokeElement.innerHTML = data.joke;
  });
}
generateJoke();
jokeBtn.addEventListener('click',generateJoke);



