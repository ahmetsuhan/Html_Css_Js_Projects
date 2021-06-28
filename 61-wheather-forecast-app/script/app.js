const form = document.querySelector("form");
const detail = document.querySelector(".detail");
const card = document.querySelector(".card");

const timeImg = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  const { cityDetail, wheather } = data;

  detail.innerHTML = `
    <div class="text-muted text-uppercase text-center detail">
        <h5 class="my-3">${cityDetail.LocalizedName}</h5>
        <div class="my-3">${wheather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${wheather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    </div>
  `;

  const iconSrc = `img/icons/${wheather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = wheather.IsDayTime ? "img/day.svg" : "img/night.svg";

  timeImg.setAttribute("src", timeSrc);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = form.city.value.trim();

  updateCity(city).then((res) => {
    updateUI(res);
  });

  form.reset();

  localStorage.setItem("city", city);
});

const updateCity = async (city) => {
  const cityDetail = await getCity(city);
  const wheather = await getWeather(cityDetail.Key);

  return {
    cityDetail,
    wheather,
  };
};

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city")).then((res) => {
    updateUI(res);
  });
}
