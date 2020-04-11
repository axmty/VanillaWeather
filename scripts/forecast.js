const apiKey = 'UjGZ3wDnAgxo5dfepqdFeA5ClutLSTQe';

const getCity = async city => {
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${apiKey}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

getCity('manchester')
  .then(data => console.log(data))
  .catch(err => console.log(err));