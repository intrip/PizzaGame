"use strict";

const PizzaGame = require('../lib/pizza_game.js');
const PlayerService = require('../lib/player_service.js');
const Player = require('../lib/player.js');
const RandomGenerator = require('../lib/random_generator.js');
const EatPizzaService = require('../lib/eat_pizza_service.js');
const PizzaGameFactory = require('../lib/pizza_game_factory.js');

describe("PizzaGame", function () {
  let subject, sliceCount;

  function createSubject() {
    let players = [{firstName: 'jacopo', lastName: 'beschi'},{firstName: 'foo', lastName: 'bar'}];
    subject = new PizzaGameFactory({players: players, maxPizzaCount: 100}).call();
  }

  beforeEach(function () {
    sliceCount = 2;
    createSubject();
  });

  it('has gameOver === false at start', function () {
    expect(subject.gameOver).toBe(false);
  });

  describe('#call', function () {
    it('delegates to eatPizzaService to eat and sets if gameOver', function () {
      let service = subject.eatPizzaService;
      spyOn(service, 'eat').and.callThrough();
      spyOn(service, 'anyPizzaLeft').and.returnValue(false);
      subject.call(sliceCount);

      expect(service.eat).toHaveBeenCalledWith(sliceCount);
      expect(subject.gameOver).toBe(true);
    });

    it('moves to next player', function () {
      let service = subject.playerService;
      spyOn(service, 'next').and.callThrough();

      subject.call(sliceCount);

      expect(service.next).toHaveBeenCalled();
    });

    it("doesn't move to next player if gameOver", function () {
      let service = subject.playerService;
      spyOn(service, 'next').and.callThrough();
      subject.eatPizzaService.pizzasCount = 2;

      subject.call(sliceCount);

      expect(service.next).not.toHaveBeenCalled();
    });

    it('sets lastEatSize', function () {
      subject.call(1);

      expect(subject.lastEatSize).toEqual(1);
    });

    it('moves to next player if is not gameOver and eatOptions is empty', function () {
      spyOn(subject.eatPizzaService,'eat');
      spyOn(subject.eatPizzaService,'eatOptions').and.returnValue([]);
      spyOn(subject.playerService,'next');

      subject.call(sliceCount);

      expect(subject.eatPizzaService.eat).not.toHaveBeenCalled();
      expect(subject.eatPizzaService.eatOptions).toHaveBeenCalled();
      expect(subject.playerService.next).toHaveBeenCalled();
    });

    it('does nothing if gameOver', function () {
      subject.gameOver = true;

      spyOn(subject.eatPizzaService,'eat').and.callThrough();
      spyOn(subject.playerService,'next').and.callThrough();

      subject.call(sliceCount);

      expect(subject.eatPizzaService.eat).not.toHaveBeenCalled();
      expect(subject.playerService.next).not.toHaveBeenCalled();
    });
  });

  describe('#eatOptions', function () {
    it('returns results from eatPizzaService passing the last lastEatSize option', function () {
      let expectedOptions = [1,2,3];
      subject.lastEatSize = 2;
      spyOn(subject.eatPizzaService, 'eatOptions')
        .and.callThrough();

      expect(subject.eatOptions()).toEqual([1,3]);
      expect(subject.eatPizzaService.eatOptions).toHaveBeenCalledWith(subject.lastEatSize);
    });
  });

  describe('#message', function () {
    it('returns the current player next step message', function () {
      subject.eatPizzaService.pizzasCount = 1;
        expect(subject.message()).toEqual("jacopo beschi fai la tua mossa, pizze disponibili: 1");
    });
    it('returns gameover message if gameover', function () {
      subject.gameOver = true;
      expect(subject.message()).toEqual("Mi dispiace jacopo beschi, hai perso!");
    });

    it('returns no movie available if there are no eatOptions and is not gameOver', function () {
      spyOn(subject.eatPizzaService, 'eatOptions').and.returnValue([]);
      expect(subject.message()).toEqual("jacopo beschi, non hai mosse disponibili. Devi passare il turno.");
    });
  });
});
