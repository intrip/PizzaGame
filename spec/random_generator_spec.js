"use strict";

let RandomGenerator = require('../lib/random_generator.js');

describe("RandomGenerator", function() {
   let min = 1, max = 5;
   let subject;

   describe('#call', function () {
      beforeEach(function () {
         subject = new RandomGenerator({min: min, max: max});
      });
      
      it('returns an integer between min and max', function () {
         expect(subject.call()).toBeGreaterThan(min - 1);
         expect(subject.call()).toBeLessThan(max + 1);
         expect(subject.call()).toMatch(/\d+/)
      });

      describe('invalid parameter given', function functionName() {
         beforeEach(function () {
            subject = new RandomGenerator({min: "invalid min", max: max});
         });

         it('raise_error', function () {
            let hasRaised = false;
            try {
               subject.cal()
            } catch (e) {
               hasRaised = true;
            }

            expect(hasRaised).toBe(true)
         });
      });
   });
});
