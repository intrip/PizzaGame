'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UNFILTERED_EAT_OPTIONS = [1, 2, 3];

var EatPizzaService = function () {
  function EatPizzaService(randomGenerator) {
    _classCallCheck(this, EatPizzaService);

    this.randomGenerator = randomGenerator;
    this._generatePizzas();
  }

  _createClass(EatPizzaService, [{
    key: '_generatePizzas',
    value: function _generatePizzas() {
      this.pizzasCount = this.randomGenerator.call();
    }
  }, {
    key: 'eat',
    value: function eat(pizzaSlices) {
      var excluded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!this._isValidSize(pizzaSlices)) {
        this._invalidSizeError();
      }
      if (excluded === pizzaSlices) {
        this._invalidSizeError();
      }

      this.pizzasCount -= pizzaSlices;

      return this.anyPizzaLeft();
    }
  }, {
    key: '_isValidSize',
    value: function _isValidSize(pizzaSlices) {
      var valid = false;
      this.eatOptions().forEach(function (option) {
        if (option === pizzaSlices) {
          valid = true;
        }
      });
      return valid;
    }
  }, {
    key: '_invalidSizeError',
    value: function _invalidSizeError() {
      var excluded = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      throw new TypeError('Numero pizze invalido, opzioni valide: ' + this.eatOptions(excluded));
    }
  }, {
    key: 'eatOptions',
    value: function eatOptions() {
      var excluded = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      return UNFILTERED_EAT_OPTIONS.slice(0, this.pizzasCount).filter(function (el) {
        return el !== excluded;
      });
    }
  }, {
    key: 'anyPizzaLeft',
    value: function anyPizzaLeft() {
      return this.pizzasCount > 0;
    }
  }]);

  return EatPizzaService;
}();

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = EatPizzaService;
}