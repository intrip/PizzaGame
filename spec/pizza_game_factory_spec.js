"use strict";

const PizzaGameFactory = require('../lib/pizza_game_factory.js');
const PizzaGame = require('../lib/pizza_game.js');
const PlayerService = require('../lib/player_service.js');
const Player = require('../lib/player.js');
const RandomGenerator = require('../lib/random_generator.js');
const EatPizzaService = require('../lib/eat_pizza_service.js');

describe('PizzaGameFactory', function () {
  it('creates a new pizzaGame', function () {
    let players= [{firstName: 'jacopo', lastName: 'beschi'},
                  {firstName: 'foo', lastName: 'bar'}];
    let maxPizzaCount = 100;

    let expectedEatPizzaService = new EatPizzaService(new RandomGenerator({min: 10, max: maxPizzaCount}));
    let expectedPlayerService = new PlayerService(new Player(players[0]), new Player(players[1]));

    let game = new PizzaGameFactory({players: players, maxPizzaCount: maxPizzaCount}).call();
    // needed in order to avoid mocking Math.random() and have the same pizzasCount
    expectedEatPizzaService.pizzasCount = game.eatPizzaService.pizzasCount;

    expect(game.eatPizzaService).toEqual(expectedEatPizzaService)
    expect(game.playerService).toEqual(expectedPlayerService);
  });
});
