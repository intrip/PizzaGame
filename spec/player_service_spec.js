describe("PlayerService", () => {
  let subject;
  let player1, player2;

  function createSubject() {
    player1 = new Player({firstName: 'jacopo', lastName: 'beschi'});
    player2 = new Player({firstName: 'foo', lastName: 'bar'});
    subject = new PlayerService(player1, player2);
    return subject;
  }

  beforeEach(() => {
    createSubject();
  });

  describe('#next', () => {
    it('moves to next player and returns it', () => {
      expect(subject.next()).toEqual(player2);
      expect(subject.next()).toEqual(player1);
    });
  });

  describe('#currentPlayer', () => {
    it('returns the current player', () => {
      expect(subject.currentPlayer()).toEqual(player1);
    });
  });
});
