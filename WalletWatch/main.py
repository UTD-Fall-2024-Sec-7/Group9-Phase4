from transaction import Transaction
from databaseManager import DatabaseManager
from controller import TransactionController
from addTransaction import AddTransactionView
from viewHistory import ViewTransactionHistoryView
import tkinter as tk
from tkinter import ttk, messagebox

class WalletWatchApp:
    def __init__(self, root):
        self.root = root
        self.root.title("WalletWatch System")
        
        self.db_manager = DatabaseManager()
        self.controller = TransactionController(self.db_manager)
        
        self.main_frame = ttk.Frame(self.root, padding="10")
        self.main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        self.setup_views()
    
    def setup_views(self):
        self.add_transaction_view = AddTransactionView(self.main_frame, self.controller)
        self.add_transaction_view.frame.grid(row=0, column=0, pady=10, sticky='ew')
        
        self.view_history_view = ViewTransactionHistoryView(self.main_frame, self.controller)
        self.view_history_view.frame.grid(row=1, column=0, pady=10, sticky='nsew')
        
        self.controller.view_history_view = self.view_history_view
        
        self.view_history_view.refresh_transactions()

def main():
    root = tk.Tk()
    app = WalletWatchApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()