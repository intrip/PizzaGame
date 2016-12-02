"use strict";

const Player = require('../lib/player.js');

describe('Player', function () {
  let subject;

  beforeEach(function () {
    subject = new Player({firstName: 'jacopo', lastName: 'beschi'})
  })

  describe('#toString', function () {
    it('returns the user info as string', function() {
      expect(subject.toString()).toEqual('jacopo beschi');
    });
  })
})
