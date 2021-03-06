describe('PlayerSelection', () => {
  let subject;
  function createSubject() {
    subject = new PlayerSelection();
  }

  function submit() {
    document.getElementById('submit-players').click();
  }

  beforeEach(() => {
    fixture.load('game.html');
    createSubject();
  });

  afterEach(() => {
    fixture.cleanup();
  });

  it('is created with 50 maxPizzaCount', () => {
    expect(subject.maxPizzaCount).toEqual(50);
  });

  describe('#call', () => {
    it('validates_presence_of player1 first_name', () => {
      submit();
      expect(document.getElementById(`js-error-player1-firstName`).innerHTML)
        .toEqual('campo obbligatorio');
    });
    it('validates_presence_of player1 last_name', () => {
      submit();
      expect(document.getElementById(`js-error-player1-lastName`).innerHTML)
        .toEqual('campo obbligatorio');
    });
    it('validates_presence_of player2 first_name', () => {
      submit();
      expect(document.getElementById(`js-error-player2-firstName`).innerHTML)
        .toEqual('campo obbligatorio');
    });
    it('validates_presence_of player2 last_name', () => {
      submit();
      expect(document.getElementById(`js-error-player2-lastName`).innerHTML)
        .toEqual('campo obbligatorio');
    });
    describe('the form is valid', () => {
      beforeEach( () => {
        document.getElementById('js-player1-first-name').value = 'Jacopo';
        document.getElementById('js-player1-last-name').value = 'Beschi';
        document.getElementById('js-player2-first-name').value = 'Mario';
        document.getElementById('js-player2-last-name').value = 'Rossi';
        submit();
      });
      it('creates a new game', () => {
        expect(subject.pizzaGame).not.toBeUndefined();
      });
      it('hides #js-player-selection and shows #js-game-info', () => {
        expect(document.getElementById('js-player-selection').style.display).toEqual('none');
        expect(document.getElementById('js-game-info').style.display).toEqual('block');
      });
    });
  });
});
