class PizzaGame {
  constructor({ playerService, eatPizzaService }) {
    this.playerService = playerService;
    this.eatPizzaService = eatPizzaService;
    this.gameOver = false;
    this._bootstrap();
  }

  _bootstrap() {
    this._updateUI();
    this._attachListeners();
  }
  _attachListeners() {
    document.getElementById('submit').addEventListener('click', () => {
      this.call(this._currentSelectVal());
    });
  }

  _currentSelectVal() {
    let selectedOption = this._select().options[this._select().selectedIndex];
    return selectedOption.value !== 'null' ? parseInt(selectedOption.value): null;
  }

  _updateUI() {
    this._updateUIMessage();
    this._updateUIEatOptions();
  }

  _updateUIMessage() {
    document.getElementById('js-message').innerHTML = this.message();
  }

  _updateUIEatOptions() {
    let selectOptions = [];
    this._select().options.length = 0;

    this.eatOptions().forEach( (option) => {
      this._select().options[this._select().options.length] = new Option(option,option);
    });

    // handle no eatOptions left case
    if(this.eatOptions().length === 0) {
      this._select().options[0] = new Option('nessuna pizza',null);
    }
  }

  _select() {
    return document.getElementById('js-pizza-slices-count');
  }

  message() {
    if (this.gameOver) {
      return `Mi dispiace ${this.playerService.currentPlayer()}, hai perso!`;
    } else if (!this._anyEatOptionsLeft()) {
      return `${this.playerService.currentPlayer()}, non hai mosse disponibili. Devi passare il turno.` + this._availablePizzasMessage();
    }
    return `${this.playerService.currentPlayer()} fai la tua mossa.` + this._availablePizzasMessage();
  }

  _availablePizzasMessage() {
    return ` (pizze disponibili: ${this.eatPizzaService.pizzasCount})`;
  }

  eatOptions() {
    return this.eatPizzaService.eatOptions(this.lastEatSize);
  }

  /**
   * @throws [TypeError] when size is invalid
   */
  call(size = null) {
    this._size = size;

    if (this.gameOver === true) {
      return;
    }

    if (this._anyEatOptionsLeft()) {
      this.eatPizzaService.eat(this._size);
      this._updateGameOver();
    }

    this._nextPlayer();
    this._saveLastEatSize();
    this._updateUI();
  }

  _saveLastEatSize() {
    this.lastEatSize = this._size;
  }

  _anyEatOptionsLeft() {
    return this.eatOptions().length > 0;
  }

  _updateGameOver() {
    this.gameOver = !this.eatPizzaService.anyPizzaLeft();
  }

  _nextPlayer() {
    if (!this.gameOver) {
      this.playerService.next();
    }
  }
}
