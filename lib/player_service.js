'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerService = function () {
  function PlayerService() {
    _classCallCheck(this, PlayerService);

    for (var _len = arguments.length, players = Array(_len), _key = 0; _key < _len; _key++) {
      players[_key] = arguments[_key];
    }

    this.players = players;
    this.totalPlayers = this.players.length;
    this.currentPlayerIndex = 0;
  }

  _createClass(PlayerService, [{
    key: 'currentPlayer',
    value: function currentPlayer() {
      return this.players[this.currentPlayerIndex];
    }
  }, {
    key: 'next',
    value: function next() {
      if (this.currentPlayerIndex === this.totalPlayers - 1) {
        this.currentPlayerIndex = 0;
      } else {
        this.currentPlayerIndex += 1;
      }
      return this.currentPlayer();
    }
  }]);

  return PlayerService;
}();

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = PlayerService;
}