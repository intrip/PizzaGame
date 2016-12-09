class PlayerService {
  constructor(...players) {
    this.players = players;
    this.totalPlayers = this.players.length;
    this.currentPlayerIndex = 0;
  }

  currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  next() {
    if (this.currentPlayerIndex === (this.totalPlayers - 1)) {
      this.currentPlayerIndex = 0;
    } else {
      this.currentPlayerIndex += 1;
    }
    return this.currentPlayer();
  }
}
