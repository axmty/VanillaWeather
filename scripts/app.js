const cityForm = document.querySelector('form.change-location');
const cardBlock = document.querySelector('.card');
const detailsBlock = document.querySelector('.details');

const updateUI = cityInformation => {
  const details = cityInformation.details;
  const weather = cityInformation.weather;

  detailsBlock.innerHTML = `
    <h5 class="my-3">${details.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</div>
      <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
      </div>`;

  cardBlock.classList.remove('d-none');
};

const getCityInformation = async city => {
  const details = await getCity(city);
  const weather = await getWeather(details.Key);

  return { details, weather };
};

cityForm.addEventListener('submit', e => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  getCityInformation(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});