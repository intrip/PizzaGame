const UNFILTERED_EAT_OPTIONS = [1,2,3];
class EatPizzaService {
   constructor(randomGenerator) {
     this.randomGenerator = randomGenerator;
     this._generatePizzas();
   }

   eat(pizzaSlices, excluded = null) {
      if(!this._isValidSize(pizzaSlices)) {
         this._invalidSizeError();
      }
      if(excluded == pizzaSlices) {
        this._invalidSizeError();
      }

      this.pizzasCount -= pizzaSlices;

      return this.anyPizzaLeft();
   }

   _invalidSizeError(excluded = null) {
     throw new TypeError(`Numero pizze invalido, opzioni valide: ${this.eatOptions(excluded)}`);
   }

   eatOptions(excluded = null ) {
      return UNFILTERED_EAT_OPTIONS.slice(0,this.pizzasCount)
        .filter((el) => {
          return el != excluded;
        });;
   }

   anyPizzaLeft() {
      return this.pizzasCount > 0;
   }

   _isValidSize(pizzaSlices) {
      let valid = false;
      this.eatOptions().forEach(function (option) {
         if(option == pizzaSlices) {
            valid = true;
         }
      })
      return valid;
   }

   _generatePizzas() {
      this.pizzasCount = this.randomGenerator.call();
   }
}

if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
   module.exports = EatPizzaService;
}
