'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PizzaGame = function () {
  function PizzaGame(_ref) {
    var playerService = _ref.playerService,
        eatPizzaService = _ref.eatPizzaService;

    _classCallCheck(this, PizzaGame);

    this.playerService = playerService;
    this.eatPizzaService = eatPizzaService;
    this.gameOver = false;
  }

  _createClass(PizzaGame, [{
    key: 'message',
    value: function message() {
      if (this.gameOver) {
        return 'Mi dispiace ' + this.playerService.currentPlayer() + ', hai perso!';
      } else if (this._noEatOptionsLeft()) {
        return this.playerService.currentPlayer() + ', non hai mosse disponibili. Devi passare il turno.';
      } else {
        return this.playerService.currentPlayer() + ' fai la tua mossa, pizze disponibili: ' + this.eatPizzaService.pizzasCount;
      }
    }
  }, {
    key: '_noEatOptionsLeft',
    value: function _noEatOptionsLeft() {
      return this.eatOptions().length === 0;
    }
  }, {
    key: 'eatOptions',
    value: function eatOptions() {
      return this.eatPizzaService.eatOptions(this.lastEatSize);
    }

    /**
     * @throws [TypeError] when size is invalid
     */

  }, {
    key: 'call',
    value: function call() {
      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this._size = size;

      if (this.gameOver) {
        return;
      }

      this._saveLastEatSize();

      if (this._noEatOptionsLeft()) {
        this._nextPlayer();
        return;
      }

      this.eatPizzaService.eat(this._size);
      this._updateGameOver();
      this._nextPlayer();
    }
  }, {
    key: '_saveLastEatSize',
    value: function _saveLastEatSize() {
      this.lastEatSize = this._size;
    }
  }, {
    key: '_updateGameOver',
    value: function _updateGameOver() {
      this.gameOver = !this.eatPizzaService.anyPizzaLeft();
    }
  }, {
    key: '_nextPlayer',
    value: function _nextPlayer() {
      if (!this.gameOver) {
        this.playerService.next();
      }
    }
  }]);

  return PizzaGame;
}();

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = PizzaGame;
}