// needed for testing purpose
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
  var PizzaGame = require('./pizza_game.js');
  var PlayerService = require('./player_service.js');
  var Player = require('./player.js');
  var RandomGenerator = require('./random_generator.js');
  var EatPizzaService = require('./eat_pizza_service.js');
}

class PizzaGameFactory {
  constructor({players, maxPizzaCount}) {
    this.players = players;
    this.maxPizzaCount = maxPizzaCount;
  }

  call() {
    return new PizzaGame({
       playerService: this._buildPlayers(),
       eatPizzaService: this._buildEatPizzaService()
     });
  }

  _buildPlayers() {
    let players = [];
    this.players.forEach(function (player) {
      players.push(new Player(player));
    });

    return new PlayerService(...players);
  }

  _buildEatPizzaService() {
    let randomGenerator = new RandomGenerator({min:10, max: this.maxPizzaCount});
    return new EatPizzaService(randomGenerator);
  }
}

if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
   module.exports = PizzaGameFactory;
}
