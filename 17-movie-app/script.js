/* max page 500*/
const main = document.getElementById("main");
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=be648c4ef3e4af3bbc4724bed8331819&page=';

const IMG_PATH ='https://image.tmdb.org/t/p/w1280';

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=be648c4ef3e4af3bbc4724bed8331819&query=';

const form = document.getElementById("form");
const search = document.getElementById("search");

const arrows = document.querySelectorAll('.page');
const pageConfig ={
  pageCount:1
};

const pageText = document.querySelector('.page-text');


const getClassByRate = (vote) => {
  if(vote >= 8){
    return 'green';
  } 
  if (vote>=5 ){
    return 'orange';
  }
  return 'red';
}


const showMovies = (movies) =>{
  main.innerHTML="";
  movies.forEach((movie)=> {
    const {title, poster_path, vote_average, overview} = movie;

    main.innerHTML+=`
    <div class="movie">
    <img src="${IMG_PATH+poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>overview</h3>
          ${overview}
        </div>
        </div>
    `
    pageText.innerText=`Page:${pageConfig.pageCount}`

  });
}
const getMovies= async (url) => {
  const res = await fetch(url);
  const data = await res.json();
   showMovies(data.results);
}

    form.addEventListener('submit',(e)=> {
      e.preventDefault();
      const searchTerm = search.value;
      if( searchTerm ){
        getMovies(SEARCH_API+searchTerm);
        search.value="";
        pageText.classList.add('disable');
      }else{
        window.location.reload(); 
        pageText.classList.remove('disable');

      }
    })


const pageController = () => {
  if(pageConfig.pageCount <1) pageConfig.pageCount=500;
  if(pageConfig.pageCount>500) pageConfig.pageCount=1;
}


   arrows.forEach((item)=>{
    
    item.addEventListener('click',(e)=> {
      if(e.target.classList.contains('left')){
        pageConfig.pageCount--
        pageController();
        getMovies(API_URL+pageConfig.pageCount);
      }else if(e.target.classList.contains('right')){
        pageConfig.pageCount++;
        pageController();

        getMovies(API_URL+pageConfig.pageCount);
      }else if(e.target.classList.contains('end')){
        pageConfig.pageCount=500;
        getMovies(API_URL+pageConfig.pageCount);
      }else{
        pageConfig.pageCount=1;
        getMovies(API_URL+pageConfig.pageCount);
      }
      pageText.classList.remove('disable')
      pageText.innerText=`Page:${pageConfig.pageCount}`
    })
   });   
   

getMovies(API_URL);








