// Old-way version of app.js, using Promises instead of async/await.

const cityForm = document.querySelector('form.change-location');
const cardBlock = document.querySelector('.card');
const timeImg = document.querySelector('.time');
const iconImg = document.querySelector('.icon img');
const cityNameLabel = document.querySelector('#city-name');
const weatherTextLabel = document.querySelector('#weather-text');
const weatherTempLabel = document.querySelector('#weather-temp');

const cityStorageKey = 'city';

const saveCity = city => localStorage.setItem(cityStorageKey, city);
const loadCity = () => localStorage.getItem(cityStorageKey);

const updateInformation = city => getCityInformation(city)
  .then(data => updateUI(data))
  .catch(err => console.log(err));

const updateUI = ({ details, weather }) => {
  cityNameLabel.textContent = details.EnglishName;
  weatherTextLabel.textContent = weather.WeatherText;
  weatherTempLabel.textContent = `${weather.Temperature.Metric.Value}°`;

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  iconImg.setAttribute('src', iconSrc);

  const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  timeImg.setAttribute('src', timeSrc);

  cardBlock.classList.remove('d-none');
};

const getCityInformation = city => new Promise((resolve, reject) => {
  const forecast = new Forecast();
  let details, weather;

  forecast.getCity(city)
    .then(data => {
      details = data;
      return forecast.getWeather(data.Key);
    }).then(data => {
      weather = data;
      resolve({ details, weather });
    }).catch(err => console.log(err));
});

cityForm.addEventListener('submit', e => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateInformation(city);

  saveCity(city);
});

const lastCity = loadCity();
if (lastCity !== null) {
  updateInformation(lastCity);
}