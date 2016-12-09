describe("EatPizzaService", function () {
   let subject;

   function createSubject() {
      subject = new EatPizzaService(new RandomGenerator({min: 10, max: 100}));
   }

   it('generates a number of pizza between 10 and 100 on init', function functionName() {
      createSubject();

      expect(subject.pizzasCount).toBeGreaterThan(9);
      expect(subject.pizzasCount).toBeLessThan(101);
   })

   describe('#eatOptions', function () {
      it('returns an array of all the possible eat options', function () {
         createSubject();
         expect(subject.eatOptions()).toEqual([1,2,3]);
      });

      it('returns the remaining eat options if less then 3 pizzasCount remains', function () {
         createSubject();
         subject.pizzasCount = 2;
         expect(subject.eatOptions()).toEqual([1,2]);
      });

      it('returns an empty array when no more pizzas are left', function () {
         createSubject();
         subject.pizzasCount = 0;
         expect(subject.eatOptions()).toEqual([]);
      });

      it('excludes the exclude element if passed', function () {
        createSubject();
        expect(subject.eatOptions(1)).toEqual([2,3]);
      })
   })

   describe('#eat', function () {
      it('raise_error if pizzaSlices is not in the eatOptions', function () {
         let hasRaised = false;
         createSubject();
         try {
            subject.eat(5);
         } catch (e) {
            hasRaised = true;
         }

         expect(hasRaised).toBe(true);
      });

      it('raise_error if pizzaSlices is excluded', function () {
        let hasRaised = false;
        createSubject();
        try {
           subject.eat(2,2);
        } catch (e) {
           hasRaised = true;
        }

        expect(hasRaised).toBe(true);
      });

      it('eats a given number of pizzas', function functionName() {
         createSubject();
         let currentPizzas = subject.pizzasCount;

         subject.eat(3);

         expect(subject.pizzasCount).toEqual(currentPizzas - 3);
      });

      it('retruns true if there is still a pizzaCount', function () {
         createSubject();

         expect(subject.eat(3)).toBe(true);
      });

      it('returns false if there are no more pizzas left', function () {
         createSubject();

         subject.pizzasCount = 3;

         expect(subject.eat(3)).toBe(false);
      });
   })
});
