const apiKey = 'UjGZ3wDnAgxo5dfepqdFeA5ClutLSTQe';

const _throw = message => {
  throw new Error(message);
};

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

const fetchApi = async (path, dataSelector, queryParams) => {
  const base = 'http://dataservice.accuweather.com/' + path;
  const query = buildQueryString(queryParams);
  const url = base + query;

  const response = await fetch(url);

  response.ok || _throw(
    `Error while calling ${url}:\n${response.status} ${response.statusText}.`);

  const data = await response.json();

  return dataSelector(data);
};