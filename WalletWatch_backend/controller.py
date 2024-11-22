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

    def delete_transaction(self, transaction_id):
        self.db_manager.delete_transaction(transaction_id)