from accounts import Account
from transaction import Transaction
from budget import Budget


class AccountController:
    def __init__(self, db_manager):
        self.db_manager = db_manager

    def add_user(self, email, password):
        user = Account(email=email, password=password)
        user_id = self.db_manager.add_user(user)
        return user_id

    def get_user(self, email):
        self.db_manager.get_user(email)

    def set_password(self, email, password):
        status = self.db_manager.set_password(email, password)
        return status


class TransactionController:
    def __init__(self, db_manager):
        self.db_manager = db_manager

    def add_transaction(self, type, amount, description, tag):
        transaction = Transaction(type=type, amount=amount, description=description, tag=tag)
        transaction_id = self.db_manager.add_transaction(transaction)
        return transaction_id

    def get_transaction_history(self):
        return self.db_manager.get_all_transactions()

    def delete_transaction(self, transaction_id):
        status = self.db_manager.delete_transaction(transaction_id)
        return status

    def filter_transaction(self, filter_type):
        self.db_manager.filter_transaction(filter_type)


class BudgetController:
    def __init__(self, db_manager):
        self.db_manager = db_manager

    def add_budget(self, type, name, budgetLimit, tag):
        budget = Budget(type=type, name=name, budgetLimit=budgetLimit, tag=tag)
        budget_id = self.db_manager.add_budget(budget)
        return budget_id

    def get_all_budgets(self):
        return self.db_manager.get_all_budgets()

    def edit_budget(self, budget_id, type, name, budgetLimit, tag):
        budget = Budget(budget_id=budget_id, type=type, name=name, budgetLimit=budgetLimit, tag=tag)
        status = self.db_manager.edit_budget(budget)
        return status

    def delete_budget(self, budget_id):
        status = self.db_manager.delete_budget(budget_id)
        return status
