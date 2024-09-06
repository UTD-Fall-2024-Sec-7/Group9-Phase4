//Ameya Sansguiri
//axs210094

//This class creates the linked list of products and contains methods corresponding to the operations done in the menu.
public class ProductList<AnyType extends IDedObject> {
	
	//Declares and initializes the product list and nodes
	ProductList<AnyType> listProd = null;			//Stores the list
	ProductNode<AnyType> head = null;				//Stores the head, or the front, of the linked list
	ProductNode<AnyType> curr = null;				//Stores the current node
	Product currentProduct = null;					//Stores the current product
	
	//The constructor initializes the head node to null.
	public ProductList()
	{
		head = null;
	}
	
	//This method empties the linked list by looping through the list, and reassigning the head to the next node until the head is null, which means that there are no elements left in the list and that the list is empty.
	public void makeEmpty()
	{
		while(head != null)
		{
			head = head.getNextNode();
		}
	}
	
	//This method finds the id that matches the id passed into the parameter by traversing through the linked list. If the same id is found, the product object is returned. 
	//Else, the next node is searched, and if no node's id matches to the parameter, then the method returns null.
	public AnyType findId(int id)
	{
		curr = head;
		while(curr != null)
		{
			if(curr.getType().getID() == id)
			{
				return curr.getType();
			}
			curr = curr.getNextNode();
		}
		return null;
		
	}
	
	//This method inserts the parameter at the front of the linked list. It first checks if the id of the parameter matches an id from a product in the linked list.
	//If so, the method returns null, since the product already exists. If not, the method checks the rest of the linked list to see if a product has a matching id.
	//If not, the head node is set to the current node, and the new head becomes the parameter passed into the method, with the next node being the curr node (or the old head node). True is then returned, signifying that the object was inserted into the linked list successfully.
	public boolean insertAtFront(AnyType x)
	{
		curr = head;
		while(curr != null)
		{
			if(curr.getType().getID() == x.getID())
			{
				return false;
			}
			curr = curr.getNextNode();
		}
		curr = head;
		head = new ProductNode<AnyType> (x, curr);
		return true;
			
	}
	
	//This method deletes the first node in the linked list by assigning the current head node to another variable, then changing the head to be the next node. The old head stored in the variable is then returned.
	public AnyType deleteFromFront()
	{
		curr = head;
		if(head != null)
		{
		head = head.getNextNode();
		
		return curr.getType();
		}
		else {
			return null;
		}
	}
	
	//This method deletes the product with the id passed in the parameter by traversing through the linked list to check if any id matches with the parameter id. 
	//If it does, then the node is removed by reassigning the node to the next node, and the old node is returned. The previous node's next node is then set to old node's next node.
	public AnyType delete(int id)
	{
		curr = head;
		ProductNode<AnyType> deletedNode = null;
		ProductNode<AnyType> prev = null;
		while(curr != null)
		{
			if(curr.getType().getID() == id)
			{
				deletedNode = curr;
				if(curr == head)
				{
					head = head.getNextNode();
				}
				if(prev != null)
				{
				curr = curr.getNextNode();
				prev.setNextNode(curr);
				}
				return deletedNode.getType();
			}
			prev = curr;
			curr = curr.getNextNode();
		}
		return null;
		
	}
	
	//This method traverses through the linked list and prints all the products, including their properties.
	//If the linked list is empty, displays message to user.
	public void printAllRecords()
	{
		curr = head;
		if (curr == null)
			{
			System.out.println("No records to print, list is empty.");
			}
		while(curr != null)
		{
			System.out.println("\n" + curr.getType().getID());
			System.out.println(curr.getType().getProduct());
			System.out.println(curr.getType().getSupplier());
			curr = curr.getNextNode();
		}
	}
}
