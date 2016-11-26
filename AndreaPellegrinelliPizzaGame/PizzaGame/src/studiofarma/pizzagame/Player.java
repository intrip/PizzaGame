package studiofarma.pizzagame;

public class Player {
	private int number;
	private String name;
	private int lastNumberOfPizzas;
	
	public Player(int number, String name) {
		this.number = number;
		this.name = name;
		lastNumberOfPizzas = 0;
	}
	
	public int getNumber() {
		return number;
	}
	
	public String getName() {
		return name;
	}
	
	public int getLastNumberOfPizzas() {
		return lastNumberOfPizzas;
	}

	public void setLastNumberOfPizzas(int lastNumberOfPizzas) {
		this.lastNumberOfPizzas = lastNumberOfPizzas;
	}
	
	public void skipTurn() {
		lastNumberOfPizzas = 0;
	}
}
