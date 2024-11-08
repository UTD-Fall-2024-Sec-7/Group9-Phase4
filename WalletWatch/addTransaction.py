import tkinter as tk
from tkinter import ttk, messagebox

class AddTransactionView:
    def __init__(self, parent, controller):
        self.controller = controller
        self.frame = ttk.LabelFrame(parent, text="Add Transaction", padding="1")
        
        ttk.Label(self.frame, text="Type:").grid(row=0, column=0, padx=5, pady=5)
        self.type_var = tk.StringVar()
        type_combo = ttk.Combobox(self.frame, textvariable=self.type_var, 
                                 values=['Savings', 'Spending'])
        type_combo.grid(row=0, column=1, padx=5, pady=5)
        
        ttk.Label(self.frame, text="Amount:").grid(row=0, column=2, padx=5, pady=5)
        self.amount_var = tk.StringVar()
        amount_entry = ttk.Entry(self.frame, textvariable=self.amount_var)
        amount_entry.grid(row=0, column=3, padx=5, pady=5)
        
        ttk.Label(self.frame, text="Description:").grid(row=1, column=0, padx=5, pady=5)
        self.desc_var = tk.StringVar()
        desc_entry = ttk.Entry(self.frame, textvariable=self.desc_var, width=40)
        desc_entry.grid(row=1, column=1, columnspan=3, padx=5, pady=5)
        
        ttk.Button(self.frame, text="Add Transaction", 
                  command=self.handle_add_transaction).grid(row=2, column=1, columnspan=2, pady=10)
    
    def handle_add_transaction(self):
        try:
            type = self.type_var.get()
            amount = float(self.amount_var.get())
            description = self.desc_var.get()
            
            amount_upper_limit = 1000000000

            if not type or (amount <= 0 or amount > amount_upper_limit):
                #messagebox.showerror("Error", "Please fill in all fields correctly")
                raise ValueError
            
            self.controller.add_transaction(type, amount, description)
            messagebox.showinfo("Success", "Transaction added successfully!")
            
            self.type_var.set('')
            self.amount_var.set('')
            self.desc_var.set('')
            
            if hasattr(self.controller, 'refresh_transaction_list'):
                self.controller.refresh_transaction_list()
            
        except ValueError:
            messagebox.showerror("Error", "Please enter a valid amount")
