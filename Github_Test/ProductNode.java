//Ameya Sansguiri
//axs210094

//This class creates the nodes for the product linked list.
public class ProductNode<AnyType extends IDedObject> {
	

	private ProductNode<AnyType> nextNode = null;		//Holds the next node
	private ProductNode <AnyType> currNode = null;	//Holds the current node
	private AnyType currProd = null;			//Holds the current node type
		
	//The constructor creates a ProductNode with the type of data and the next node as parameters
	public ProductNode(AnyType product, ProductNode<AnyType> nextProd )
	{
		//Assigns the information to its respective variables
		currProd = product;
		nextNode = nextProd;
	}
	
	//Returns the next node
	public ProductNode<AnyType> getNextNode()
	{
		return nextNode;
	}
	
	//Sets the next node of the current node to the node passed in the parameter.
	public void setNextNode(ProductNode<AnyType> nextProd)
	{
		nextNode = nextProd;
	}
	
	//Returns the type of the node
	public AnyType getType()
	{
		return currProd;
	}
}
