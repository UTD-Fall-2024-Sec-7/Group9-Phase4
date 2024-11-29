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
        status = self.db_manager.get_user(email)
        return status

    def get_email(self, user_id):
        status = self.db_manager.get_email(user_id)
        return status

    def set_password(self, email, password):
        status = self.db_manager.set_password(email, password)
        return status


class TransactionController:
    def __init__(self, db_manager):
        self.db_manager = db_manager

    def add_transaction(self, type, amount, description, tag, user_id):
        transaction = Transaction(type=type, amount=amount, description=description, tag=tag)
        transaction_id = self.db_manager.add_transaction(transaction, user_id)
        return transaction_id

    def get_transaction_history(self, user_id):
        return self.db_manager.get_all_transactions(user_id)

    def delete_transaction(self, transaction_id, user_id):
        status = self.db_manager.delete_transaction(transaction_id, user_id)
        return status

    def filter_transaction(self, filter_type, user_id):
        self.db_manager.filter_transaction(filter_type, user_id)


class BudgetController:
    def __init__(self, db_manager):
        self.db_manager = db_manager

    def add_budget(self, type, name, budgetLimit, tag, user_id):
        budget = Budget(type=type, name=name, budgetLimit=budgetLimit, tag=tag)
        budget_id = self.db_manager.add_budget(budget, user_id)
        return budget_id

    def get_all_budgets(self, user_id):
        return self.db_manager.get_all_budgets(user_id)

    def edit_budget(self, budget_id, type, name, budgetLimit, tag, user_id):
        budget = Budget(budget_id=budget_id, type=type, name=name, budgetLimit=budgetLimit, tag=tag)
        status = self.db_manager.edit_budget(budget, user_id)
        return status

    def delete_budget(self, budget_id, user_id):
        status = self.db_manager.delete_budget(budget_id, user_id)
        return status
