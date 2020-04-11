const cityForm = document.querySelector('form.change-location');

const getCityInformation = async city => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return { cityDetails, weather };
};

cityForm.addEventListener('submit', e => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  getCityInformation(city)
    .then(data => console.log(data))
    .catch(err => console.log(err));
});