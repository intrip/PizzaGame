package studiofarma.pizzagame;

import java.io.IOException;

public class PizzaGame {
	public static void main(String[] args) {
		try {
			GameManager gameManager = new GameManager(20);
			PlayersManager playersManager = new PlayersManager();
			playersManager.createPlayers();
			Player currentPlayer = playersManager.getPlayer2();
			Player otherPlayer = playersManager.getPlayer1();
			do {
				gameManager.showInfo();
				currentPlayer = playersManager.togglePlayer(currentPlayer);
				otherPlayer = playersManager.togglePlayer(otherPlayer);
				gameManager.setPreviousNumberOfPizzas(otherPlayer.getLastNumberOfPizzas());
				if (!gameManager.canPlayerChooseNumberOfPizzas()) {
					System.out.println(String.format("%s skips the turn.", currentPlayer.getName()));
					currentPlayer.skipTurn();
					continue;
				}
				gameManager.letChooseHowManyPizzas(currentPlayer);
				gameManager.makePlayerEatPizzas(currentPlayer);
				if (gameManager.isPoisonedPizzaEaten()) {
					gameManager.declareLoser(currentPlayer);
					gameManager.declareWinner(otherPlayer);
				}
			}
			while (!gameManager.isPoisonedPizzaEaten());
		}
		catch (IOException ioException) {
			System.out.println("Some error occurred during the creation of the players");
		}
		catch (IllegalArgumentException iaException) {
			System.out.println(iaException.getMessage());
		}
	}
}
