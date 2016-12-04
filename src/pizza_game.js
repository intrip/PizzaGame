class PizzaGame {
  constructor({playerService, eatPizzaService}) {
    this.playerService = playerService;
    this.eatPizzaService = eatPizzaService;
    this.gameOver = false;
  }

  message() {
    if(this.gameOver) {
      return `Mi dispiace ${this.playerService.currentPlayer()}, hai perso!`;
    } else if(this._noEatOptionsLeft()) {
      return `${this.playerService.currentPlayer()}, non hai mosse disponibili. Devi passare il turno.`;
    } else {
      return `${this.playerService.currentPlayer()} fai la tua mossa, pizze disponibili: ${this.eatPizzaService.pizzasCount}`;
    }
  }

  eatOptions() {
    return this.eatPizzaService.eatOptions(this.lastEatSize);
  }

  /**
   * @throws [TypeError] when size is invalid
   */
  call(size = null) {
    this._size = size;

    if(this.gameOver) {
      return;
    }

    this._saveLastEatSize();

    if(this._noEatOptionsLeft()) {
        this._nextPlayer();
        return;
    }

    this.eatPizzaService.eat(this._size);
    this._updateGameOver();
    this._nextPlayer();
  }

  _saveLastEatSize() {
    this.lastEatSize = this._size;
  }

  _noEatOptionsLeft() {
    return this.eatOptions().length === 0;
  }

  _updateGameOver() {
    this.gameOver = !this.eatPizzaService.anyPizzaLeft();
  }

  _nextPlayer() {
    if(!this.gameOver) {
      this.playerService.next();
    }
  }
}

if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
   module.exports = PizzaGame;
}
