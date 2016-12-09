class RandomGenerator {
  constructor({ min = 10, max = 30 }) {
    this.min = min;
    this.max = max;
  }

  call() {
    if (!this._valid()) {
      throw new TypeError('Invalid parameters');
    }

    return Math.floor(this.min + (Math.random() * (this.max - this.min)));
  }

  _valid() {
    return RandomGenerator._isInt(this.min) && RandomGenerator._isInt(this.max);
  }

  static _isInt(val) {
    return Number(val) === val && val % 1 === 0;
  }
}
