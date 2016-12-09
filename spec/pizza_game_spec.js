describe("PizzaGame", () => {
  let subject, sliceCount;

  function createSubject() {
    let players = [{firstName: 'jacopo', lastName: 'beschi'},{firstName: 'foo', lastName: 'bar'}];
    subject = new PizzaGameFactory({players: players, maxPizzaCount: 100}).call();
  }

  function select() {
    return document.getElementById('js-pizza-slices-count');
  }

  beforeEach( () => {
    fixture.load('game.html');
    sliceCount = 2;
    createSubject();
  });

  afterEach(() => {
    fixture.cleanup();
  });

  it('is created with gameOver === false', () => {
    expect(subject.gameOver).toBe(false);
  });

  describe('#_bootstrap', () => {
    it('calls #_updateUI', () => {
      spyOn(subject,'_updateUI');

      subject._bootstrap();

      expect(subject._updateUI).toHaveBeenCalled();
    });
  })

  describe('#_updateUI', () => {
    it('updates the message', () => {
      expect(document.getElementById('js-message').innerHTML).toEqual(subject.message());
    });

    it('updates the pizza-slices-count select options', () => {
      expect(select().options.length).toEqual(subject.eatOptions().length);
    });

    describe('no eatOptions are left', () => {
      beforeEach(() => {
        spyOn(subject.eatPizzaService,'eatOptions').and.returnValue([]);
        subject._updateUI();
      });
      it('sets "nessuna pizza" option', () => {
        expect(select().options.length).toEqual(1);
        expect(select().options[0]).toEqual(new Option('nessuna pizza',null));
      });
    });
  });

  describe('#call', () => {
    it('delegates to eatPizzaService to eat and sets if gameOver', function () {
      let service = subject.eatPizzaService;
      spyOn(service, 'eat').and.callThrough();
      spyOn(service, 'anyPizzaLeft').and.returnValue(false);
      subject.call(sliceCount);

      expect(service.eat).toHaveBeenCalledWith(sliceCount);
      expect(subject.gameOver).toBe(true);
    });

    it('moves to next player', () => {
      let service = subject.playerService;
      spyOn(service, 'next').and.callThrough();

      subject.call(sliceCount);

      expect(service.next).toHaveBeenCalled();
    });

    it('sets lastEatSize', () => {
      subject.call(1);

      expect(subject.lastEatSize).toEqual(1);
    });

    describe('is not gameOver and eatOptions are empty', () => {
      beforeEach(() => {
        subject.eatPizzaService.pizzasCount = 1;
        subject.lastEatSize = 1;
      });
      it('moves to next player without eating a pizza', () => {
        spyOn(subject.eatPizzaService,'eat');
        spyOn(subject.playerService,'next');
        spyOn(subject, '_updateUI');

        subject.call(sliceCount);

        expect(subject.eatPizzaService.eat).not.toHaveBeenCalled();
        expect(subject.playerService.next).toHaveBeenCalled();
        expect(subject._updateUI).toHaveBeenCalled();
      });
    });

    it('does nothing if gameOver', () => {
      subject.gameOver = true;

      spyOn(subject.eatPizzaService,'eat').and.callThrough();
      spyOn(subject.playerService,'next').and.callThrough();

      subject.call(sliceCount);

      expect(subject.eatPizzaService.eat).not.toHaveBeenCalled();
      expect(subject.playerService.next).not.toHaveBeenCalled();
    });

    it('shows player lost message after gameOver', () => {
      subject.eatPizzaService.pizzasCount = 1;
      subject.lastEatSize = null;
      expected = `Mi dispiace ${subject.playerService.currentPlayer()}, hai perso!`;
      subject.call(1);
      expect(subject.message()).toEqual(expected);
    });

    it('calls #_updateUI', () => {
      spyOn(subject,'_updateUI');

      subject.call(sliceCount);

      expect(subject._updateUI).toHaveBeenCalled();
    });

    it('is called on submit with the current slice-count', () => {
      spyOn(subject,'call');

      document.getElementById('submit').click();

      expect(subject.call).toHaveBeenCalledWith(1);
    });

    describe('no eatOptions are left', () => {
      beforeEach(() => {
        subject.eatPizzaService.pizzasCount = 1;
        subject.lastEatSize = 1;
        subject._updateUI();
        spyOn(subject,'call');
      });
      it('is called on submit with null', () => {
        document.getElementById('submit').click();

        expect(subject.call).toHaveBeenCalledWith(null);
      });
    });
  });

  describe('#eatOptions', () => {
    it('returns results from eatPizzaService passing the last lastEatSize option', () => {
      let expectedOptions = [1,2,3];
      subject.lastEatSize = 2;
      spyOn(subject.eatPizzaService, 'eatOptions')
        .and.callThrough();

      expect(subject.eatOptions()).toEqual([1,3]);
      expect(subject.eatPizzaService.eatOptions).toHaveBeenCalledWith(subject.lastEatSize);
    });
  });

  describe('#message', () => {
    it('returns the current player next step message', () => {
      subject.eatPizzaService.pizzasCount = 1;
        expect(subject.message()).toEqual("jacopo beschi fai la tua mossa. (pizze disponibili: 1)");
    });
    it('returns gameover message', () => {
      subject.gameOver = true;
      expect(subject.message()).toEqual("Mi dispiace jacopo beschi, hai perso!");
    });

    describe('there are no eatOptions and is not gameOver', () => {
      beforeEach(() => {
        spyOn(subject.eatPizzaService, 'eatOptions').and.returnValue([]);
      });
      it('returns no options available', function () {
        expect(subject.message()).toEqual(`jacopo beschi, non hai mosse disponibili. Devi passare il turno. (pizze disponibili: ${subject.eatPizzaService.pizzasCount})`);
      });
    });
  });
});
