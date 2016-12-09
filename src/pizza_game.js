/**
 * The main game logic and UI interaction
 */
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
      this.call(PizzaGame.currentSelectVal());
    });
  }

  /**
   * @return [Int|Null] the current select value
   */
  static currentSelectVal() {
    const selectedOption = PizzaGame.select().options[PizzaGame.select().selectedIndex];
    return selectedOption.value !== 'null' ? parseInt(selectedOption.value, 10) : null;
  }

  /**
   * @return [HtmlElement] the select slice size
   */
  static select() {
    return document.getElementById('js-pizza-slices-count');
  }

  _updateUI() {
    this._updateUIMessage();
    this._updateUIEatOptions();
    this._updateUIGameOver();
  }

  _updateUIMessage() {
    document.getElementById('js-message').innerHTML = this.message();
  }

  _updateUIEatOptions() {
    const selectOptions = [];
    PizzaGame.select().options.length = 0;

    // handle no eatOptions left case
    if (this.eatOptions().length === 0) {
      PizzaGame.select().options[0] = new Option('nessuna pizza', null);
    } else {
      this.eatOptions().forEach((option) => {
        PizzaGame.select().options[PizzaGame.select().options.length] = new Option(option, option);
      });
    }
  }

  _updateUIGameOver() {
    if (this.gameOver === true) {
      const jsMessage = document.getElementById('js-message');
      document.getElementById('js-game-form').style.display = 'none';
      jsMessage.classList.remove('bg-success');
      jsMessage.classList.add('bg-danger');
      document.getElementById('js-new-game').style.display = 'block';
    }
  }

  /**
   * Used to obtain the game info message
   * @return [String] message
   */
  message() {
    if (this.gameOver) {
      return `Mi dispiace <b>${this.playerService.currentPlayer()}</b>, hai perso!`;
    } else if (!this._anyEatOptionsLeft()) {
      return `<b>${this.playerService.currentPlayer()}</b>, non hai mosse disponibili. Devi passare il turno. ${this._availablePizzasMessage()}`;
    }
    return `<b>${this.playerService.currentPlayer()}</b> fai la tua mossa. ${this._availablePizzasMessage()}`;
  }

  _availablePizzasMessage() {
    return `(pizze disponibili: ${this.eatPizzaService.pizzasCount})`;
  }

  eatOptions() {
    return this.eatPizzaService.eatOptions(this.lastEatSize);
  }

  /**
   * The main game method, when called applies the game logic
   * and updates the ui
   * @param size [Int|null] the size of the pizza slices to eat
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
