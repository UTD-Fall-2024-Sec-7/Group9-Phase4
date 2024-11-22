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
            date TEXT NOT NULL
        )
        ''')
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
        ''')
        self.conn.commit()

    def add_user(self, username, password):
        cursor = self.conn.cursor()
        try:
            cursor.execute('INSERT INTO users (username, password) VALUES (?. ?)', (username, password))
            self.conn.commit()
            return True
        except sqlite3.IntegrityError:
            return False

    def get_user(self, username):
        cursor = self.conn.cursor()
        cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
        return cursor.fetchone()

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

    def delete_transaction(self, transaction_id):
        cursor = self.conn.cursor()
        cursor.execute("DELETE FROM transactions WHERE id = ?", (transaction_id,))
        self.conn.commit()