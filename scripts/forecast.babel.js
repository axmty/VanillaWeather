"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Forecast = /*#__PURE__*/function () {
  function Forecast() {
    _classCallCheck(this, Forecast);

    this.apiKey = 'UjGZ3wDnAgxo5dfepqdFeA5ClutLSTQe';
    this.apiBaseUri = 'http://dataservice.accuweather.com/';
  }

  _createClass(Forecast, [{
    key: "getCity",
    value: function getCity(city) {
      return this.fetchApi('locations/v1/cities/search', function (data) {
        return data[0];
      }, [{
        key: 'q',
        value: city
      }]);
    }
  }, {
    key: "getWeather",
    value: function getWeather(cityKey) {
      return this.fetchApi("currentconditions/v1/".concat(cityKey), function (data) {
        return data[0];
      });
    }
  }, {
    key: "fetchApi",
    value: function () {
      var _fetchApi = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path, dataSelector, queryParams) {
        var base, query, url, response, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                base = this.apiBaseUri + path;
                query = this.buildQueryString(queryParams);
                url = base + query;
                _context.next = 5;
                return fetch(url);

              case 5:
                response = _context.sent;
                response.ok || _throw("Error while calling ".concat(url, ":\n").concat(response.status, " ").concat(response.statusText, "."));
                _context.next = 9;
                return response.json();

              case 9:
                data = _context.sent;
                return _context.abrupt("return", dataSelector(data));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchApi(_x, _x2, _x3) {
        return _fetchApi.apply(this, arguments);
      }

      return fetchApi;
    }()
  }, {
    key: "buildQueryString",
    value: function buildQueryString(queryParams) {
      var _queryParams;

      queryParams = (_queryParams = queryParams) !== null && _queryParams !== void 0 ? _queryParams : [];
      queryParams.push({
        key: 'apikey',
        value: this.apiKey
      });
      return '?' + queryParams.map(function (param) {
        return "".concat(param.key, "=").concat(param.value);
      }).join('&');
    }
  }, {
    key: "throw",
    value: function _throw(message) {
      throw new Error(message);
    }
  }]);

  return Forecast;
}();
