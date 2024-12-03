# use_case_20_view_history.py
import tkinter as tk
from tkinter import ttk

class ViewTransactionHistoryView:
    def __init__(self, parent, controller):
        self.controller = controller
        self.frame = ttk.Frame(parent, padding="10")
        
        self.tree = ttk.Treeview(self.frame, 
                                columns=('ID', 'Type', 'Amount', 'Description', 'Date'),
                                show='headings',
                                height=10)
        
        self.tree.heading('ID', text='ID')
        self.tree.heading('Type', text='Type')
        self.tree.heading('Amount', text='Amount')
        self.tree.heading('Description', text='Description')
        self.tree.heading('Date', text='Date')
        
        scrollbar = ttk.Scrollbar(self.frame, orient="vertical", command=self.tree.yview)
        self.tree.configure(yscrollcommand=scrollbar.set)
       
       
       

        

        self.refreshButton = ttk.Button(self.frame, text="Refresh Transactions", 
                                        command=self.refresh_transactions)

        self.deleteTransactionButton= ttk.Button(self.frame, text="Delete Transaction",
                                        command=self.delete_transaction)


        


        #adding into frame
        self.tree.grid(row=0, column=0, sticky='nsew')
        scrollbar.grid(row=0, column=1, sticky='ns')
        self.refreshButton.grid(row=1, column=0, padx = 10, pady=10)
        self.deleteTransactionButton.grid(row=1, column=1,padx = 10, pady = 10)


        
    
    def refresh_transactions(self):
        print("refreshing transactions")

        for item in self.tree.get_children():
            self.tree.delete(item)
        
        transactions = self.controller.get_transaction_history()
        for transaction in transactions:

            self.tree.insert('', 'end', values=transaction)


    def delete_transaction(self):
        #deleting transaction
        current_Item = self.tree.focus()
        #id is stored in index 0
        current_Item_id = self.tree.item(current_Item)['values'][0]
        print(f"Deleting Transaction with ID: {current_Item_id}")
        
        #gives command to controller which then communicates to database to delete a transaction
        self.controller.delete_transaction(current_Item_id)
        
        #local copy of transaction is deleted
        self.tree.delete(current_Item)

        #refresh to update the gui
        self.refresh_transactions()

    def print_currItem(self):
        currItem = self.tree.focus()
        print(self.tree.item(currItem))


