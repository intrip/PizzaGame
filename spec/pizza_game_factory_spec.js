describe('PizzaGameFactory', () => {
  beforeEach( () => {
    fixture.load('game.html');
  });

  afterEach(() => {
    fixture.cleanup();
  });

  it('creates a new pizzaGame', () => {
    let players= [{firstName: 'jacopo', lastName: 'beschi'},
                  {firstName: 'foo', lastName: 'bar'}];
    let maxPizzaCount = 100;

    let expectedEatPizzaService = new EatPizzaService(new RandomGenerator({min: 10, max: maxPizzaCount}));
    let expectedPlayerService = new PlayerService(new Player(players[0]), new Player(players[1]));

    let game = new PizzaGameFactory({players: players, maxPizzaCount: maxPizzaCount}).call();
    // needed in order to avoid mocking Math.random() and have the same pizzasCount
    expectedEatPizzaService.pizzasCount = game.eatPizzaService.pizzasCount;

    expect(game.eatPizzaService).toEqual(expectedEatPizzaService)
    expect(game.playerService).toEqual(expectedPlayerService);
  });
});
