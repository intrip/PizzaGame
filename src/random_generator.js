class RandomGenerator {
   constructor({min = 10, max = 30}) {
      this.min = min;
      this.max = max;
   }

   call() {
      if(!this.valid()) {
         throw new TypeError("Invalid parameters");
      }

      return Math.floor(this.min + (Math.random() * (this.max - this.min) ));
   }

   valid() {
      return this._isInt(this.min) && this._isInt(this.max);
   }

   _isInt(val) {
      return Number(val) === val && val % 1 === 0;
   }
}

if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
   module.exports = RandomGenerator;
}
