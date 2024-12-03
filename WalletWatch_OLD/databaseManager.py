import sqlite3
from datetime import datetime

class Transaction:
    def __init__(self, transaction_id=None, type=None, amount=None, description=None, date=None):
        self.transaction_id = transaction_id
        self.type = type  # 'savings' or 'spending'
        self.amount = amount
        self.description = description
        self.date = date if date else datetime.now().strftime("%Y-%m-%d %H:%M:%S")

class DatabaseManager:

    def __init__(self, dbFileName="wallet_watch.db"):
        self.conn =sqlite3.connect(dbFileName)
        self.create_tables()

    
    
    def create_tables(self):
        cursor = self.conn.cursor()
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            amount REAL NOT NULL,
            description TEXT,
            date TEXT NOT NULL
        )
        ''')
        self.conn.commit()
    
    def add_transaction(self, transaction):
        cursor = self.conn.cursor()
        cursor.execute('''
        INSERT INTO transactions (type, amount, description, date)
        VALUES (?, ?, ?, ?)
        ''', (transaction.type, transaction.amount, transaction.description, transaction.date))
        self.conn.commit()
        return cursor.lastrowid
    
    def get_all_transactions(self):
        cursor = self.conn.cursor()
        cursor.execute('SELECT * FROM transactions ORDER BY date DESC')
        return cursor.fetchall()

    
    def delete_transaction(self, transaction):
        cursor = self.conn.cursor()

        command = f"DELETE FROM transactions WHERE id = {transaction}"

        cursor.execute(command)
        self.conn.commit()


