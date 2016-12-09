'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerSelection = function () {
  function PlayerSelection() {
    _classCallCheck(this, PlayerSelection);

    this.maxPizzaCount = 15;
    this._bootstrap();
  }

  _createClass(PlayerSelection, [{
    key: '_bootstrap',
    value: function _bootstrap() {
      var _this = this;

      document.getElementById('submit-players').addEventListener('click', function () {
        _this._call();
      });
    }
  }, {
    key: '_call',
    value: function _call() {
      this._createPlayers();
      if (!this._validate()) {
        return;
      }

      this._showGame();
      this._createGame();
    }
  }, {
    key: '_createGame',
    value: function _createGame() {
      this.pizzaGame = new PizzaGameFactory({
        players: [this._playerInfo(1), this._playerInfo(2)],
        maxPizzaCount: this.maxPizzaCount
      }).call();
    }
  }, {
    key: '_createPlayers',
    value: function _createPlayers() {
      this.player1 = new Player(this._playerInfo(1));
      this.player2 = new Player(this._playerInfo(2));
    }
  }, {
    key: '_validate',
    value: function _validate() {
      var valid = true;
      this._clearErrors();

      if (!this.player1.isValid()) {
        this._setError('player1');
        valid = false;
      }
      if (!this.player2.isValid()) {
        this._setError('player2');
        valid = false;
      }

      return valid;
    }
  }, {
    key: '_clearErrors',
    value: function _clearErrors() {
      document.getElementById('js-error-player1-firstName').innerHTML = '';
      document.getElementById('js-error-player1-lastName').innerHTML = '';
      document.getElementById('js-error-player2-firstName').innerHTML = '';
      document.getElementById('js-error-player2-lastName').innerHTML = '';
    }
  }, {
    key: '_setError',
    value: function _setError(playerName) {
      var player = this[playerName];

      Object.keys(player.errors).forEach(function (key) {
        document.getElementById('js-error-' + playerName + '-' + key).innerHTML = player.errors[key];
      });
    }
  }, {
    key: '_playerInfo',
    value: function _playerInfo(playerNumber) {
      var firstName = document.getElementById('js-player' + playerNumber + '-first-name').value;
      var lastName = document.getElementById('js-player' + playerNumber + '-last-name').value;
      return { firstName: firstName, lastName: lastName };
    }
  }, {
    key: '_showGame',
    value: function _showGame() {
      document.getElementById('js-player-selection').style.display = 'none';
      document.getElementById('js-game-info').style.display = 'block';
    }
  }]);

  return PlayerSelection;
}();