const apiKey = 'UjGZ3wDnAgxo5dfepqdFeA5ClutLSTQe';

const buildQueryString = queryParams => {
  queryParams = queryParams ?? [];
  queryParams.push({ key: 'apikey', value: apiKey });

  return '?' + queryParams
    .map(param => `${param.key}=${param.value}`)
    .join('&');
};

const getCity = async city => await fetchApi(
  'locations/v1/cities/search',
  data => data[0],
  [{ key: 'q', value: city }]);

const getWeather = async cityKey => await fetchApi(
  `currentconditions/v1/${cityKey}`,
  data => data[0]);

const fetchApi = async (path, dataSelector, queryParams) => {
  const base = 'http://dataservice.accuweather.com/' + path;
  const query = buildQueryString(queryParams);

  const response = await fetch(base + query);
  const data = await response.json();

  return dataSelector(data);
};