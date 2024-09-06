//Ameya Sansguiri
//axs210094

//This class creates Products and has general methods for accessing the properties of the products.
public class Product implements IDedObject {
	
	//Variables to store product ID, name, and the supplier's name respectively.
	private int productID;
	private String productName;
	private String supplierName;
	
	
	//This constructor creates a Product object with the properties of id, product name, and supplier name, and assigns them to their respective variables.
	public Product(int id, String prodName, String suppName)
	{
		productID = id;
		productName = prodName;
		supplierName = suppName;
	}
	
	//This method prints the ID.
	public void printID()
	{
		System.out.println(productID);
	}
	
	//This method returns the product ID.
	public int getID()
	{
		return productID;
	}
	
	//This method prints the product name.
	public void printProduct()
	{
		System.out.println(productName);
	}
	
	//This method gets the product name.
	public String getProduct()
	{
		return productName;
	}
	
	//This method prints the supplier name.
	public void printSupplier()
	{
		System.out.println(supplierName);
	}
	
	//This method gets the supplier name.
	public String getSupplier()
	{
		return supplierName;
	}

}
