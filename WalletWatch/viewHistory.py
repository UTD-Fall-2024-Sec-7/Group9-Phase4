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
        
        self.tree.grid(row=0, column=0, sticky='nsew')
        scrollbar.grid(row=0, column=1, sticky='ns')
        
        ttk.Button(self.frame, text="Refresh Transactions", 
                  command=self.refresh_transactions).grid(row=1, column=0, pady=10)
    
    def refresh_transactions(self):
        for item in self.tree.get_children():
            self.tree.delete(item)
        
        transactions = self.controller.get_transaction_history()
        for transaction in transactions:
            self.tree.insert('', 'end', values=transaction)