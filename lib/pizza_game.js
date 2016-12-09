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
    this._bootstrap();
  }

  _createClass(PizzaGame, [{
    key: '_bootstrap',
    value: function _bootstrap() {
      this._updateUI();
      this._attachListeners();
    }
  }, {
    key: '_attachListeners',
    value: function _attachListeners() {
      var _this = this;

      document.getElementById('submit').addEventListener('click', function () {
        _this.call(PizzaGame.currentSelectVal());
      });
    }

    /**
     * @return [Int|Null] the current select value
     */

  }, {
    key: '_updateUI',
    value: function _updateUI() {
      this._updateUIMessage();
      this._updateUIEatOptions();
    }
  }, {
    key: '_updateUIMessage',
    value: function _updateUIMessage() {
      document.getElementById('js-message').innerHTML = this.message();
    }
  }, {
    key: '_updateUIEatOptions',
    value: function _updateUIEatOptions() {
      var selectOptions = [];
      PizzaGame.select().options.length = 0;

      // handle no eatOptions left case
      if (this.eatOptions().length === 0) {
        PizzaGame.select().options[0] = new Option('nessuna pizza', null);
      } else {
        this.eatOptions().forEach(function (option) {
          PizzaGame.select().options[PizzaGame.select().options.length] = new Option(option, option);
        });
      }
    }

    /**
     * Used to obtain the game info message
     * @return [String] message
     */

  }, {
    key: 'message',
    value: function message() {
      if (this.gameOver) {
        return 'Mi dispiace ' + this.playerService.currentPlayer() + ', hai perso!';
      } else if (!this._anyEatOptionsLeft()) {
        return this.playerService.currentPlayer() + ', non hai mosse disponibili. Devi passare il turno. ' + this._availablePizzasMessage();
      }
      return this.playerService.currentPlayer() + ' fai la tua mossa. ' + this._availablePizzasMessage();
    }
  }, {
    key: '_availablePizzasMessage',
    value: function _availablePizzasMessage() {
      return '(pizze disponibili: ' + this.eatPizzaService.pizzasCount + ')';
    }
  }, {
    key: 'eatOptions',
    value: function eatOptions() {
      return this.eatPizzaService.eatOptions(this.lastEatSize);
    }

    /**
     * The main game method, when called applies the game logic
     * and updates the ui
     * @param size [Int|null] the size of the pizza slices to eat
     * @throws [TypeError] when size is invalid
     */

  }, {
    key: 'call',
    value: function call() {
      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this._size = size;

      if (this.gameOver === true) {
        return;
      }

      if (this._anyEatOptionsLeft()) {
        this.eatPizzaService.eat(this._size);
        this._updateGameOver();
      }

      this._nextPlayer();
      this._saveLastEatSize();
      this._updateUI();
    }
  }, {
    key: '_saveLastEatSize',
    value: function _saveLastEatSize() {
      this.lastEatSize = this._size;
    }
  }, {
    key: '_anyEatOptionsLeft',
    value: function _anyEatOptionsLeft() {
      return this.eatOptions().length > 0;
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
  }], [{
    key: 'currentSelectVal',
    value: function currentSelectVal() {
      var selectedOption = PizzaGame.select().options[PizzaGame.select().selectedIndex];
      return selectedOption.value !== 'null' ? parseInt(selectedOption.value, 10) : null;
    }

    /**
     * @return [HtmlElement] the select slice size
     */

  }, {
    key: 'select',
    value: function select() {
      return document.getElementById('js-pizza-slices-count');
    }
  }]);

  return PizzaGame;
}();