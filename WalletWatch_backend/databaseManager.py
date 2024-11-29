import sqlite3
from datetime import datetime


class DatabaseManager:
    def __init__(self, dbFileName="wallet_watch.db"):
        self.conn = sqlite3.connect(dbFileName, check_same_thread=False)
        self.create_tables()

    def create_tables(self):
        cursor = self.conn.cursor()
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            amount REAL NOT NULL,
            description TEXT,
            date TEXT NOT NULL,
            tag TEXT NOT NULL
        )
        ''')
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS budgets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            budgetLimit REAL NOT NULL,
            remainingBudget REAL,
            tag TEXT NOT NULL
        )
        ''')
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
        ''')
        self.conn.commit()

    def add_user(self, user):
        cursor = self.conn.cursor()
        try:
            cursor.execute('INSERT INTO users (email, password) VALUES (?, ?)', (user.email, user.password))
            self.conn.commit()
            return cursor.lastrowid
        except sqlite3.IntegrityError:
            return False

    def get_user(self, email):
        cursor = self.conn.cursor()
        cursor.execute('SELECT * FROM users WHERE email = ?', email)
        return cursor.fetchone()

    def set_password(self, email, new_password):
        cursor = self.conn.cursor()
        cursor.execute('UPDATE users SET password = ? WHERE email = ?', (new_password, email))
        self.conn.commit()
        return cursor.rowcount > 0

    def add_transaction(self, transaction):
        cursor = self.conn.cursor()
        cursor.execute('''
        INSERT INTO transactions (type, amount, description, date, tag)
        VALUES (?, ?, ?, ?, ?)
        ''', (transaction.type, transaction.amount, transaction.description, transaction.date, transaction.tag))
        self.conn.commit()
        return cursor.lastrowid

    def get_all_transactions(self):
        cursor = self.conn.cursor()
        cursor.execute('SELECT * FROM transactions ORDER BY date DESC')
        return cursor.fetchall()

    def delete_transaction(self, transaction_id):
        cursor = self.conn.cursor()
        cursor.execute('DELETE FROM transactions WHERE id = ?', transaction_id)
        self.conn.commit()
        return cursor.rowcount > 0

    def filter_transaction(self, filter_type):
        cursor = self.conn.cursor()
        cursor.execute('SELECT * FROM transactions ORDER BY ? DESC', filter_type)

    def add_budget(self, budget):
        cursor = self.conn.cursor()
        cursor.execute('''
        INSERT INTO budgets (name, type, budgetLimit, remainingBudget, tag)
        VALUES (?, ?, ?, ?, ?)
        ''', (budget.name, budget.type, budget.budgetLimit, budget.budgetLimit, budget.tag))
        self.conn.commit()
        return cursor.lastrowid

    def edit_budget(self, budget):
        cursor = self.conn.cursor()
        cursor.execute('''
        UPDATE budgets
        SET type = ?, name = ?, budgetLimit = ?, tag = ?
        WHERE id = ?
        ''', (budget.type, budget.name, budget.budgetLimit, budget.tag, budget.budget_id))
        self.conn.commit()
        return cursor.rowcount > 0

    def delete_budget(self, budget_id):
        cursor = self.conn.cursor()
        cursor.execute('DELETE FROM budgets WHERE id = ?', budget_id)
        self.conn.commit()
        return cursor.rowcount > 0

    def get_all_budgets(self):
        cursor = self.conn.cursor()
        cursor.execute('SELECT * FROM budgets')
        return cursor.fetchall()

    # def update_budget_remaining(self, type, name, amount):
    #     cursor = self.conn.cursor()
    #     cursor.execute('''
    #     UPDATE budgets
    #     SET remainingBudget = remainingBudget - ?
    #     WHERE type = ? AND name = ?
    #     ''', (amount, type, name))
    #     self.conn.commit()
    #     return cursor.rowcount > 0