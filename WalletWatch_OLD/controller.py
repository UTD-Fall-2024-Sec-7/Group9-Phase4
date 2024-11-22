from transaction import Transaction

class TransactionController:
    def __init__(self, db_manager):
        self.db_manager = db_manager
    
    def add_transaction(self, type, amount, description):
        transaction = Transaction(type=type, amount=amount, description=description)
        transaction_id = self.db_manager.add_transaction(transaction)
        return transaction_id
    
    def get_transaction_history(self):
        return self.db_manager.get_all_transactions()
    
    def refresh_transaction_list(self):
        if hasattr(self, 'view_history_view'):
            self.view_history_view.refresh_transactions()

    def delete_transaction(self, to_be_deleted_transaction_id):
        self.db_manager.delete_transaction(to_be_deleted_transaction_id)
