const UNFILTERED_EAT_OPTIONS = [1, 2, 3];
/**
 * Handles the creation of pizzas and the eating of them
 */
class EatPizzaService {
  constructor(randomGenerator) {
    this.randomGenerator = randomGenerator;
    this._generatePizzas();
  }

  _generatePizzas() {
    this.pizzasCount = this.randomGenerator.call();
  }

  /**
   * Eats a pizza of a given slice
   * @param [int] pizzaSlices
   * @param [bool] excluded if any size needs to be excluded from the options
   * @return [bool] if any pizza is left
   */
  eat(pizzaSlices, excluded = null) {
    if (!this._isValidSize(pizzaSlices)) {
      this._invalidSizeError();
    }
    if (excluded === pizzaSlices) {
      this._invalidSizeError();
    }

    this.pizzasCount -= pizzaSlices;

    return this.anyPizzaLeft();
  }

  _isValidSize(pizzaSlices) {
    let valid = false;
    this.eatOptions().forEach((option) => {
      if (option === pizzaSlices) {
        valid = true;
      }
    });
    return valid;
  }

  _invalidSizeError(excluded = null) {
    throw new TypeError(`Numero pizze invalido, opzioni valide: ${this.eatOptions(excluded)}`);
  }

  eatOptions(excluded = null) {
    return UNFILTERED_EAT_OPTIONS.slice(0, this.pizzasCount)
      .filter((el) => { return el !== excluded; });
  }

  /**
   * Verify if any pizza is left
   * @returns [bool] if any pizza is left
   */
  anyPizzaLeft() {
    return this.pizzasCount > 0;
  }
}

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = EatPizzaService;
}
