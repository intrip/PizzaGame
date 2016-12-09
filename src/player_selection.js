class PlayerSelection {
  constructor() {
    this.maxPizzaCount = 15;
    this._bootstrap();
  }

  _bootstrap() {
    document.getElementById('submit-players').addEventListener('click', () => {
      this._call();
    });
  }

  _call() {
    this._createPlayers();
    if (!this._validate()) {
      return;
    }

    this._showGame();
    this._createGame();
  }

  _createGame() {
    this.pizzaGame = new PizzaGameFactory({
      players: [this._playerInfo(1), this._playerInfo(2)],
      maxPizzaCount: this.maxPizzaCount,
    }).call();
  }

  _createPlayers() {
    this.player1 = new Player(this._playerInfo(1));
    this.player2 = new Player(this._playerInfo(2));
  }

  _validate() {
    let valid = true;
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

  _clearErrors() {
    document.getElementById('js-error-player1-firstName').innerHTML = '';
    document.getElementById('js-error-player1-lastName').innerHTML = '';
    document.getElementById('js-error-player2-firstName').innerHTML = '';
    document.getElementById('js-error-player2-lastName').innerHTML = '';
  }

  _setError(playerName) {
    const player = this[playerName];

    Object.keys(player.errors).forEach((key) => {
      document.getElementById(`js-error-${playerName}-${key}`).innerHTML = player.errors[key];
    });
  }

  _playerInfo(playerNumber) {
    const firstName = document.getElementById(`js-player${playerNumber}-first-name`).value;
    const lastName = document.getElementById(`js-player${playerNumber}-last-name`).value;
    return { firstName, lastName };
  }

  _showGame() {
    document.getElementById('js-player-selection').style.display = 'none';
    document.getElementById('js-game-info').style.display = 'block';
  }
}
