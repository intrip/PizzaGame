package studiofarma.pizzagame;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class PlayersManager {
	private Player player1;
	private Player player2;
	private BufferedReader bufferedReader;
	
	public PlayersManager() {
		bufferedReader = new BufferedReader(new InputStreamReader(System.in));
	}
	
	public void createPlayers() throws IOException {
		player1 = createPlayer(1);
		player2 = createPlayer(2);
	}
	
	private Player createPlayer(int playerNumber) throws IOException {
		String playerName = getPlayerName(playerNumber);
		return new Player(playerNumber, playerName);
	}
	
	private String getPlayerName(int playerNumber) throws IOException {
		String name = "";
		do {
			System.out.println(String.format("Enter player %d name", playerNumber));
			name = bufferedReader.readLine().trim();
		}
		while (name.length() <= 0);
		return name;
	}

	public Player getPlayer1() {
		return player1;
	}

	public Player getPlayer2() {
		return player2;
	}

	public Player togglePlayer(Player player) {
		if (player.getNumber() == player1.getNumber()) {
			return player2;
		}
		return player1;
	}
}
