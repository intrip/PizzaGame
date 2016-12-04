'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// needed for testing purpose
if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  var PizzaGame = require('./pizza_game.js');
  var PlayerService = require('./player_service.js');
  var Player = require('./player.js');
  var RandomGenerator = require('./random_generator.js');
  var EatPizzaService = require('./eat_pizza_service.js');
}

var PizzaGameFactory = function () {
  function PizzaGameFactory(_ref) {
    var players = _ref.players,
        maxPizzaCount = _ref.maxPizzaCount;

    _classCallCheck(this, PizzaGameFactory);

    this.players = players;
    this.maxPizzaCount = maxPizzaCount;
  }

  _createClass(PizzaGameFactory, [{
    key: 'call',
    value: function call() {
      return new PizzaGame({
        playerService: this._buildPlayers(),
        eatPizzaService: this._buildEatPizzaService()
      });
    }
  }, {
    key: '_buildPlayers',
    value: function _buildPlayers() {
      var players = [];
      this.players.forEach(function (player) {
        players.push(new Player(player));
      });

      return new (Function.prototype.bind.apply(PlayerService, [null].concat(players)))();
    }
  }, {
    key: '_buildEatPizzaService',
    value: function _buildEatPizzaService() {
      var randomGenerator = new RandomGenerator({ min: 10, max: this.maxPizzaCount });
      return new EatPizzaService(randomGenerator);
    }
  }]);

  return PizzaGameFactory;
}();

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = PizzaGameFactory;
}