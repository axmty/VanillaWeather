// Old-way version of forecast.js, using XMLHttpRequest and Promises instead of async/await.

const apiKey = 'UjGZ3wDnAgxo5dfepqdFeA5ClutLSTQe z';

const buildQueryString = queryParams => {
  queryParams = queryParams ?? [];
  queryParams.push({ key: 'apikey', value: apiKey });

  return '?' + queryParams
    .map(param => `${param.key}=${param.value}`)
    .join('&');
};

const getCity = city => fetchApi(
  'locations/v1/cities/search',
  data => data[0],
  [{ key: 'q', value: city }]);

const getWeather = cityKey => fetchApi(
  `currentconditions/v1/${cityKey}`,
  data => data[0]);

const fetchApi = (path, dataSelector, queryParams) => {
  return new Promise((resolve, reject) => {
    const base = 'http://dataservice.accuweather.com/' + path;
    const query = buildQueryString(queryParams);

    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
      if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText);
        resolve(dataSelector(data));
      }
    })

    request.open('GET', base + query);
    request.send();
  });
};