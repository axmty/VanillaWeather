class Forecast {
  constructor() {
    this.apiKey = 'UjGZ3wDnAgxo5dfepqdFeA5ClutLSTQe';
    this.apiBaseUri = 'http://dataservice.accuweather.com/';
  }

  getCity(city) {
    return this.fetchApi(
      'locations/v1/cities/search',
      data => data[0],
      [{ key: 'q', value: city }]);
  }

  getWeather(cityKey) {
    return this.fetchApi(
      `currentconditions/v1/${cityKey}`,
      data => data[0]);
  }

  async fetchApi(path, dataSelector, queryParams) {
    const base = this.apiBaseUri + path;
    const query = this.buildQueryString(queryParams);
    const url = base + query;

    const response = await fetch(url);

    response.ok || _throw(
      `Error while calling ${url}:\n${response.status} ${response.statusText}.`);

    const data = await response.json();

    return dataSelector(data);
  }

  buildQueryString(queryParams) {
    queryParams = queryParams ?? [];
    queryParams.push({ key: 'apikey', value: this.apiKey });

    return '?' + queryParams
      .map(param => `${param.key}=${param.value}`)
      .join('&');
  };

  throw(message) {
    throw new Error(message);
  }
}
