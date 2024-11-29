import sqlite3
from datetime import datetime


class DatabaseManager:
    def __init__(self, dbFileName="wallet_watch.db"):
        self.conn = sqlite3.connect(dbFileName, check_same_thread=False)
        self.create_tables()

    def create_tables(self):
        cursor = self.conn.cursor()
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            income TEXT NOT NULL
        )
        ''')
        self.conn.commit()

    def create_user_tables(self, user_id):
        cursor = self.conn.cursor()
        cursor.execute(f'''
        CREATE TABLE IF NOT EXISTS transactions_{user_id} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            amount REAL NOT NULL,
            description TEXT,
            date TEXT NOT NULL,
            tag TEXT NOT NULL
        )
        ''')
        cursor.execute(f'''
        CREATE TABLE IF NOT EXISTS budgets_{user_id} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            budgetLimit REAL NOT NULL,
            remainingBudget REAL,
            tag TEXT UNIQUE NOT NULL
        )
        ''')
        self.conn.commit()

    def add_user(self, user):
        cursor = self.conn.cursor()
        try:
            cursor.execute('INSERT INTO users (email, password, firstName, lastName, income) '
                           'VALUES (?, ?, ?, ?, ?)',
                           (user.email, user.password, user.firstName, user.lastName, user.income))
            self.conn.commit()
            return cursor.lastrowid

        except sqlite3.IntegrityError:
            return False

    def get_user(self, email):
        cursor = self.conn.cursor()
        cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
        return cursor.fetchone()

    def get_email(self, user_id):
        cursor = self.conn.cursor()
        cursor.execute('SELECT * FROM users WHERE id = ?', (user_id,))
        result = cursor.fetchone()
        return result[1] if result else None

    def set_password(self, email, new_password):
        cursor = self.conn.cursor()
        cursor.execute('UPDATE users SET password = ? WHERE email = ?', (new_password, email))
        self.conn.commit()
        return cursor.rowcount > 0

    def add_transaction(self, transaction, user_id):
        cursor = self.conn.cursor()
        cursor.execute(f'''
        INSERT INTO transactions_{user_id} (type, amount, description, date, tag)
        VALUES (?, ?, ?, ?, ?)
        ''', (transaction.type, transaction.amount, transaction.description, transaction.date, transaction.tag))
        self.conn.commit()
        return cursor.lastrowid

    def get_all_transactions(self, user_id):
        cursor = self.conn.cursor()
        cursor.execute(f'SELECT * FROM transactions_{user_id} ORDER BY date DESC')
        return cursor.fetchall()

    def delete_transaction(self, transaction_id, user_id):
        cursor = self.conn.cursor()
        cursor.execute(f'DELETE FROM transactions_{user_id} WHERE id = ?', (transaction_id,))
        self.conn.commit()
        return cursor.rowcount > 0

    def filter_transaction(self, filter_type, user_id):
        cursor = self.conn.cursor()
        cursor.execute(f'SELECT * FROM transactions_{user_id} ORDER BY ? DESC', (filter_type,))

    def add_budget(self, budget, user_id):
        cursor = self.conn.cursor()
        try:
            cursor.execute(f'''
            INSERT INTO budgets_{user_id} (name, type, budgetLimit, remainingBudget, tag)
            VALUES (?, ?, ?, ?, ?)
            ''', (budget.name, budget.type, budget.budgetLimit, budget.budgetLimit, budget.tag))
            self.conn.commit()
            return cursor.lastrowid

        except sqlite3.IntegrityError:
            return False

    def edit_budget(self, budget, user_id):
        cursor = self.conn.cursor()
        cursor.execute(f'''
        UPDATE budgets_{user_id}
        SET type = ?, name = ?, budgetLimit = ?, tag = ?
        WHERE id = ?
        ''', (budget.type, budget.name, budget.budgetLimit, budget.tag, budget.budget_id))
        self.conn.commit()
        return cursor.rowcount > 0

    def delete_budget(self, budget_id, user_id):
        cursor = self.conn.cursor()
        cursor.execute(f'DELETE FROM budgets_{user_id} WHERE id = ?', (budget_id,))
        self.conn.commit()
        return cursor.rowcount > 0

    def get_all_budgets(self, user_id):
        cursor = self.conn.cursor()
        cursor.execute(f'SELECT * FROM budgets_{user_id}')
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