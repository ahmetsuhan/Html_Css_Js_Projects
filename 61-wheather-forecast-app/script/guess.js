const key = "8N6Ns39QAV80mdkFlwT12jcp3JzmZGks";

const getWeather = async (id) => {
  const baseUrl = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const res = await fetch(baseUrl + query);
  const resData = await res.json();

  return resData[0];
};

const getCity = async (location) => {
  const baseUrl =
    "http://dataservice.accuweather.com/locations/v1/cities/search";

  const query = `?apikey=${key}&q=${location}`;
  const res = await fetch(baseUrl + query);

  const resData = await res.json();
  return resData[0];
};
