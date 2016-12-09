describe("RandomGenerator", () => {
   let min = 1, max = 5;
   let subject;

   describe('#call', () => {
      beforeEach(() => {
         subject = new RandomGenerator({min: min, max: max});
      });

      it('returns an integer between min and max', () => {
         expect(subject.call()).toBeGreaterThan(min - 1);
         expect(subject.call()).toBeLessThan(max + 1);
         expect(subject.call()).toMatch(/\d+/)
      });

      describe('invalid parameter given', () => {
         beforeEach(() => {
            subject = new RandomGenerator({min: "invalid min", max: max});
         });

         it('raise_error', () => {
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
