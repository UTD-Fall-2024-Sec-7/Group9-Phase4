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
        
        # Initialize database and controller
        self.db_manager = DatabaseManager()
        self.controller = TransactionController(self.db_manager)
        
        # Create main container
        self.main_frame = ttk.Frame(self.root, padding="10")
        self.main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Initialize views
        self.setup_views()
    
    def setup_views(self):
        # Add Transaction View (UC6)
        self.add_transaction_view = AddTransactionView(self.main_frame, self.controller)
        self.add_transaction_view.frame.grid(row=0, column=0, pady=10, sticky='ew')
        
        # View Transaction History (UC20)
        self.view_history_view = ViewTransactionHistoryView(self.main_frame, self.controller)
        self.view_history_view.frame.grid(row=1, column=0, pady=10, sticky='nsew')
        
        # Store reference to view_history_view in controller for updates
        self.controller.view_history_view = self.view_history_view
        
        # Initial load of transactions
        self.view_history_view.refresh_transactions()

def main():
    root = tk.Tk()
    app = WalletWatchApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()