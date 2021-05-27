const musicContainer = document.querySelector("#music-container");
const btnPlay = document.querySelector("#play");
const btnPrev = document.querySelector("#prev");
const btnNext = document.querySelector("#next");

const audio = document.querySelector("#audio");
const progress = document.querySelector("#progress");
const progressContainer = document.querySelector("#progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

const songs = ["hey", "summer", "ukulele"];

let songIndex = 2;
loadSong(songs[songIndex]);
function loadSong(song) {
  title.innerText = song;
  audio.src = `musics/${song}.mp3`;
  cover.src = `img/${song}.jpg`;
}

function pauseSong() {
  musicContainer.classList.remove("play");

  btnPlay.querySelector("i.fas").classList.remove("fa-pause");
  btnPlay.querySelector("i.fas").classList.add("fa-play");

  audio.pause();
}
function playSong() {
  musicContainer.classList.add("play");
  btnPlay.querySelector("i.fas").classList.remove("fa-play");
  btnPlay.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

btnPlay.addEventListener("click", function () {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

btnPrev.addEventListener("click", prevSong);
btnNext.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);
