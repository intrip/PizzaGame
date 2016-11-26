package studiofarma.pizzagame;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Random;

public class GameManager {
	private BufferedReader bufferedReader;
	private int numberOfPizzas;
	private int previousNumberOfPizzas;
	private final int MIN_NUM_OF_PIZZAS = 11;
	
	public GameManager(int maxNumberOfPizzas) {
		bufferedReader = new BufferedReader(new InputStreamReader(System.in));
		initNumberOfPizzas(maxNumberOfPizzas);
		previousNumberOfPizzas = 0;
	}
	
	private void initNumberOfPizzas(int max) {
		if (max <= MIN_NUM_OF_PIZZAS) {
			throw new IllegalArgumentException(String.format("Error! Max number of pizzas must be at least %d", MIN_NUM_OF_PIZZAS));
		}
		int bound = max - MIN_NUM_OF_PIZZAS;
		Random random = new Random();
		numberOfPizzas = random.nextInt(bound) + MIN_NUM_OF_PIZZAS;
	}
	
	public boolean isPoisonedPizzaEaten() {
		return numberOfPizzas <= 0;
	}

	public void setPreviousNumberOfPizzas(int previousNumberOfPizzas) {
		this.previousNumberOfPizzas = previousNumberOfPizzas;
	}

	public boolean canPlayerChooseNumberOfPizzas() {
		return !(numberOfPizzas == 1 && previousNumberOfPizzas == 1);
	}

	public void letChooseHowManyPizzas(Player player) {
		System.out.println();
		System.out.println(String.format("%s it's your turn!", player.getName()));
		boolean isValidChoice = false;
		do {
			int numberOfPizzasSelected = 0;
			System.out.println("Select the number of pizzas to eat (1,2,3)");
			try {
				numberOfPizzasSelected = Integer.parseInt(bufferedReader.readLine());
			}
			catch (NumberFormatException e) {
				System.out.println("That's not a valid number!");
				isValidChoice = false;
				continue;
			}
			catch (IOException e) {
				System.out.println("Some problem occurred, please retry.");
				isValidChoice = false;
				continue;
			}
			if (numberOfPizzasSelected < 1 || numberOfPizzasSelected > 3) {
				System.out.println("You may only choose 1, 2 or 3 pizzas.");
				isValidChoice = false;
				continue;
			}
			if (numberOfPizzasSelected > numberOfPizzas) {
				System.out.println(String.format("The max number of pizzas that you can choose is %d.", numberOfPizzas));
				isValidChoice = false;
				continue;
			}
			if (numberOfPizzasSelected == previousNumberOfPizzas) {
				System.out.println("You cannot choose the same number of pizzas that your opponent has chosen before.");
				isValidChoice = false;
				continue;
			}
			isValidChoice = true;
			player.setLastNumberOfPizzas(numberOfPizzasSelected);
		}
		while (!isValidChoice);
	}

	public void makePlayerEatPizzas(Player player) {
		numberOfPizzas -= player.getLastNumberOfPizzas();
	}

	public void showInfo() {
		System.out.println();
		System.out.println(String.format("There are %d pizza(s) left", numberOfPizzas));
	}
	
	public void declareLoser(Player player) {
		System.out.println();
		System.out.println(String.format("The poisoned pizza was eaten by %s", player.getName()));
	}
	
	public void declareWinner(Player player) {
		System.out.println();
		System.out.println(String.format("The winner is %s!!!", player.getName()));
	}
}
