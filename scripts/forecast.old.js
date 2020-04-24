// Old-way version of forecast.js, using XMLHttpRequest, Promises instead of async/await and no class.

let Forecast = (function () {
  let self;

  function Forecast() {
    self = this;

    this.apiKey = 'UjGZ3wDnAgxo5dfepqdFeA5ClutLSTQe';
    this.apiBaseUri = 'http://dataservice.accuweather.com/';
  };

  const buildQueryString = queryParams => {
    queryParams = (queryParams !== undefined) ? queryParams : [];
    queryParams.push({ key: 'apikey', value: self.apiKey });

    return '?' + queryParams
      .map(param => `${param.key}=${param.value}`)
      .join('&');
  };

  const fetchApi = function (path, dataSelector, queryParams) {
    return new Promise((resolve, reject) => {
      const base = self.apiBaseUri + path;
      const query = buildQueryString(queryParams);
      const url = base + query;

      const request = new XMLHttpRequest();

      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
          return;
        } else if (request.status === 200) {
          const data = JSON.parse(request.responseText);
          resolve(dataSelector(data));
        } else {
          reject(`Error while calling ${url}:\n${request.status} ${request.statusText}.`);
        }
      });

      request.open('GET', base + query);
      request.send();
    })
  };

  Forecast.prototype.getCity = function (city) {
    return fetchApi(
      'locations/v1/cities/search',
      data => data[0],
      [{ key: 'q', value: city }]);
  };

  Forecast.prototype.getWeather = function (cityKey) {
    return fetchApi(
      `currentconditions/v1/${cityKey}`,
      data => data[0]);
  };

  return Forecast;
})();

