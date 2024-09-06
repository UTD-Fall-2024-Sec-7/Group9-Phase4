//Ameya Sansguiri
//axs210094

import java.util.Scanner; //Import Scanner class to read in user input
import java.util.InputMismatchException;		//Import InputMismatchException for input validation using try-catch statements
public class Main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		ProductList<Product> products = new ProductList<Product>();	//Create linked list of Products using ProductList class
		
		//Declare and initialize variables
		int choice = 0;		//Stores the user's choice from the menu
		int id = 0;			//Stores the id number read in from Scanner object
		String productName = null;			//Stores the product name read in from Scanner object
		String supplierName = null;			//Stores the supplier name read in from Scanner object
		boolean added = false;				//Stores the variable to mark whether the product was successfully added to the list or not
		
		
		Scanner scan = new Scanner(System.in);			//scan is a Scanner object that reads in the user input from the keyboard
		
		//While the user wants to continue running the program, check which choice they chose, does necessary tasks
		while(choice != 7)
		{
			//Prints the menu with each option on a new line
		System.out.println("1. Make Empty\n2. Find ID\n3. Insert At Front\n4. Delete From Front\n5. Delete ID\n6. Print All Records\n7. Done\n\tYour Choice: ");
		choice = scan.nextInt();		//Reads in user's choice, stores it in int variable choice
		
		//If the user chooses 1, to make the list empty, the makeEmpty function is called on the products linked list
		if(choice == 1)
		{
			products.makeEmpty();
		}
		else if(choice == 2)			//If the choice is 2, which is to find the id of the product, executes these steps
		{
			boolean isNotNum = true; // Stores the value of true if the number is not a number
			Product prodId;			//Stores the product whose id matches with the id the user would like to find
			while(isNotNum)		//Performs input validation with a try-catch statement - while the user enters a value that is not a number, catch the exception, and ask the user to enter a valid number.
			{
			System.out.println("Enter ID: ");		//Prompt the user to enter the id they would like to find
			try {
			id = scan.nextInt();		//Reads in the user input of id, stores it in the int variable id
			isNotNum = false;
			}
			catch(InputMismatchException e)
			{
				System.out.println("Incorrect value. Please enter a valid ID");
				scan.next();		//Allows user to enter a valid ID
			}
			}
			prodId = products.findId(id);		//Calls the function findId, passing in the id to find on the products linked list, and stores the result of the matching product in prodId
			if(prodId != null)		//If the product can be found, print the product's info
			{
			System.out.println(prodId.getID() + "\n" + prodId.getProduct() + "\n" + prodId.getSupplier());
			}
			else		//Else, if the product does not exist, inform the user
			{
				System.out.println("The product does not exist.");
			}
			
		}
		else if(choice == 3)		//If the user chooses 3, which is to insert a product at the front of the linked list, executes these steps
		{
			//Prompts the user to enter the product details, like the id, name, and the supplier, and stores the user input into their respective variables
			System.out.print("Enter ID: ");		
			id = scan.nextInt();			
			scan.nextLine();					//Clears the buffer so that a String can be read
			System.out.print("Enter Product Name: ");
			productName = scan.nextLine();
			System.out.print("Enter Supplier Name: ");
			supplierName = scan.nextLine();
			
			Product addProd = new Product(id, productName, supplierName);		//Creates a new product using the information from the user
			added = products.insertAtFront(addProd);		//Inserts the new product in the front of the linked list using the insertAtFront method, which returns a boolean value, stored in the variable added
			System.out.println("...");
			if(added)		//If the product was added, display a confirmation to the user
			{
				System.out.println("Product Added");
			}
			else {		//If the product could not be added, inform the user
				System.out.println("Unable to add product. Please try again or choose another operation.");
			}
		}
		else if(choice == 4)		//If the user chooses 4, which deletes a product from the front of the linked list, call the function with the linked list and store the result, which is the product that was removed into the variable deleted. Then, display the properties of the product.
		{
			Product deleted = products.deleteFromFront();
			if(deleted != null)
			{
			System.out.println(deleted.getID() + "\n" + deleted.getProduct() + "\n" + deleted.getSupplier());
			System.out.println("First item deleted");
			}
			else {		//If the list is empty and no products can be deleted, display a message.
				System.out.println("List is empty, no products could be deleted.");
			}
		}
		else if(choice == 5)		//If the user chooses 5, which deletes a certain product with a certain id, execute these steps
		{
			Product prodId;				//Stores the product that matches the id of the id the user specified
			boolean isNotNum = true;	// Stores the value of true if the number is not a number
			while(isNotNum)		//Performs input validation with a try-catch statement - while the user enters a value that is not a number, catch the exception, and ask the user to enter a valid number.
			{
			System.out.println("Enter ID: ");		//Prompts the user to enter an id
			try {
			id = scan.nextInt();				//Reads in the id that the user inputed, stores into the id variable
			isNotNum = false;
			}
			catch(InputMismatchException e)
			{
				System.out.println("Incorrect value. Please enter a valid ID");
				scan.next();	//Allows user to enter a valid ID	
			}
			}
			prodId = products.findId(id);		//Stores the result of the findId method, which will find the product that matches with the id, into the prodId variable
			if(prodId != null)
			{
			System.out.println(prodId.getID() + "\n" + prodId.getProduct() + "\n" + prodId.getSupplier());		//Displays the product's properties
			products.delete(id);		//Deletes the product from the linked list
			}
			else {		//If linked list is empty and no products can be deleted, display a message
				System.out.println("List is empty, no products could be deleted.");
			}
		}
		else if(choice == 6)		//If the user chooses 6, the program prints all the records of products in the linked list
		{
			products.printAllRecords();
		}
		
		}
		System.out.println("Done");
	}

}
