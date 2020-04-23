"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cityForm = document.querySelector('form.change-location');
var cardBlock = document.querySelector('.card');
var timeImg = document.querySelector('.time');
var iconImg = document.querySelector('.icon img');
var cityNameLabel = document.querySelector('#city-name');
var weatherTextLabel = document.querySelector('#weather-text');
var weatherTempLabel = document.querySelector('#weather-temp');
var cityStorageKey = 'city';

var saveCity = function saveCity(city) {
  return localStorage.setItem(cityStorageKey, city);
};

var loadCity = function loadCity() {
  return localStorage.getItem(cityStorageKey);
};

var updateInformation = function updateInformation(city) {
  return getCityInformation(city).then(function (data) {
    return updateUI(data);
  })["catch"](function (err) {
    return console.error(err);
  });
};

var updateUI = function updateUI(_ref) {
  var details = _ref.details,
      weather = _ref.weather;
  cityNameLabel.textContent = details.EnglishName;
  weatherTextLabel.textContent = weather.WeatherText;
  weatherTempLabel.textContent = "".concat(weather.Temperature.Metric.Value, "\xB0");
  var iconSrc = "img/icons/".concat(weather.WeatherIcon, ".svg");
  iconImg.setAttribute('src', iconSrc);
  var timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  timeImg.setAttribute('src', timeSrc);
  cardBlock.classList.remove('d-none');
};

var getCityInformation = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(city) {
    var forecast, details, weather;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            forecast = new Forecast();
            _context.next = 3;
            return forecast.getCity(city);

          case 3:
            details = _context.sent;
            _context.next = 6;
            return forecast.getWeather(details.Key);

          case 6:
            weather = _context.sent;
            return _context.abrupt("return", {
              details: details,
              weather: weather
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getCityInformation(_x) {
    return _ref2.apply(this, arguments);
  };
}();

cityForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var city = cityForm.city.value.trim();
  cityForm.reset();
  updateInformation(city);
  saveCity(city);
});
var lastCity = loadCity();

if (lastCity !== null) {
  updateInformation(lastCity);
}
