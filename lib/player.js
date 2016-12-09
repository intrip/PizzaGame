'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(_ref) {
    var firstName = _ref.firstName,
        lastName = _ref.lastName;

    _classCallCheck(this, Player);

    this.firstName = firstName;
    this.lastName = lastName;
  }

  _createClass(Player, [{
    key: 'toString',
    value: function toString() {
      return this.firstName + ' ' + this.lastName;
    }
  }, {
    key: 'isValid',
    value: function isValid() {
      this.errors = {};

      this._validateNotEmpty('firstName');
      this._validateNotEmpty('lastName');

      return Object.keys(this.errors).length === 0;
    }
  }, {
    key: '_validateNotEmpty',
    value: function _validateNotEmpty(field) {
      var val = this[field];
      if (typeof val === 'string' && val.length > 0) {
        return;
      }
      this.errors[field] = 'campo obbligatorio';
    }
  }]);

  return Player;
}();