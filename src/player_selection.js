/**
 * Handles the Players setup and PizzaGame creation
 */
class PlayerSelection {
  constructor() {
    this.maxPizzaCount = 50;
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

    PlayerSelection.showGame();
    this._createGame();
  }

  _createPlayers() {
    this.player1 = new Player(PlayerSelection.playerInfo(1));
    this.player2 = new Player(PlayerSelection.playerInfo(2));
  }

  _createGame() {
    this.pizzaGame = new PizzaGameFactory({
      players: [PlayerSelection.playerInfo(1), PlayerSelection.playerInfo(2)],
      maxPizzaCount: this.maxPizzaCount,
    }).call();
  }

  _validate() {
    let valid = true;
    PlayerSelection.clearErrors();

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

  _setError(playerName) {
    const player = this[playerName];

    Object.keys(player.errors).forEach((key) => {
      document.getElementById(`js-error-${playerName}-${key}`).innerHTML = player.errors[key];
    });
  }

  /**
   * Clears the ui errors
   */
  static clearErrors() {
    document.getElementById('js-error-player1-firstName').innerHTML = '';
    document.getElementById('js-error-player1-lastName').innerHTML = '';
    document.getElementById('js-error-player2-firstName').innerHTML = '';
    document.getElementById('js-error-player2-lastName').innerHTML = '';
  }

  static playerInfo(playerNumber) {
    const firstName = document.getElementById(`js-player${playerNumber}-first-name`).value;
    const lastName = document.getElementById(`js-player${playerNumber}-last-name`).value;
    return { firstName, lastName };
  }

  /**
   * Hides the player selectio ui and shows the gameplay ui
   */
  static showGame() {
    document.getElementById('js-player-selection').style.display = 'none';
    document.getElementById('js-game-info').style.display = 'block';
  }
}
