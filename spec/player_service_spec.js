"use strict";

const PlayerService = require('../lib/player_service.js');
const Player = require('../lib/player.js');

describe("PlayerService", function () {
  let subject;
  let player1, player2;

  function createSubject() {
    player1 = new Player({firstName: 'jacopo', lastName: 'beschi'});
    player2 = new Player({firstName: 'foo', lastName: 'bar'});
    subject = new PlayerService(player1, player2);
    return subject;
  }

  beforeEach(function () {
    createSubject();
  });

  describe('#next', function () {
    it('moves to next player and returns it', function () {
      expect(subject.next()).toEqual(player2);
      expect(subject.next()).toEqual(player1);
    });
  })

  describe('#currentPlayer', function () {
    it('returns the current player', function () {
        expect(subject.currentPlayer()).toEqual(player1);
    });
  })
});
