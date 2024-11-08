import sqlite3
from .transaction import Transaction
from datetime import datetime

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

    def get_transaction(self, transaction_id):
        cursor = self.conn.cursor()

        #query input into sql server to get specified transaction with id transaction_id
        query = f"SELECT * FROM transactions WHERE id = {transaction_id}"

        #execute sql query
        cursor.execute(query)

        #This returns a list of length 1 likley
        return cursor.fetchall()

    
    def delete_transaction(self, transaction_id):
        cursor = self.conn.cursor()

        command = f"DELETE FROM transactions WHERE id = {transaction_id}"

        cursor.execute(command)
        self.conn.commit()


