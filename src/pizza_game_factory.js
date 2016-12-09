class PizzaGameFactory {
  constructor({ players, maxPizzaCount }) {
    this.players = players;
    this.maxPizzaCount = maxPizzaCount;
  }

  call() {
    return new PizzaGame({
      playerService: this._buildPlayers(),
      eatPizzaService: this._buildEatPizzaService(),
    });
  }

  _buildPlayers() {
    const players = [];
    this.players.forEach((player) => {
      players.push(new Player(player));
    });

    return new PlayerService(...players);
  }

  _buildEatPizzaService() {
    const randomGenerator = new RandomGenerator({ min: 10, max: this.maxPizzaCount });
    return new EatPizzaService(randomGenerator);
  }
}
