'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RandomGenerator = function () {
   function RandomGenerator(_ref) {
      var _ref$min = _ref.min,
          min = _ref$min === undefined ? 10 : _ref$min,
          _ref$max = _ref.max,
          max = _ref$max === undefined ? 30 : _ref$max;

      _classCallCheck(this, RandomGenerator);

      this.min = min;
      this.max = max;
   }

   _createClass(RandomGenerator, [{
      key: 'call',
      value: function call() {
         if (!this._valid()) {
            throw new TypeError("Invalid parameters");
         }

         return Math.floor(this.min + Math.random() * (this.max - this.min));
      }
   }, {
      key: '_valid',
      value: function _valid() {
         return this._isInt(this.min) && this._isInt(this.max);
      }
   }, {
      key: '_isInt',
      value: function _isInt(val) {
         return Number(val) === val && val % 1 === 0;
      }
   }]);

   return RandomGenerator;
}();

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
   module.exports = RandomGenerator;
}