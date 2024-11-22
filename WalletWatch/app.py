from flask import Flask, render_template, request, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
from databaseManager import DatabaseManager
from controller import TransactionController
from transaction import Transaction

db_manager = DatabaseManager()
controller = TransactionController(db_manager)

# Initialize Flask app
app = Flask(__name__)

app.secret_key = '12345'


@app.route('/')
def index():
    transactions = controller.get_transaction_history()
    return render_template('index.html', transactions=transactions)


@app.route('/add_transaction', methods = ['GET', 'POST'])
def add_transaction():
    if request.method == 'POST':
        transaction_type = request.form['type']
        amount = float(request.form['amount'])
        description = request.form['description']

        if not transaction_type or amount <= 0 or not description:
            flash('Please fill in all fields correctly', 'error')
        elif amount > 9999999999999999:
            flash('Amount exceeds 16-digit limit', 'error')
        elif len(description) > 100:
            flash('Description exceeds 100 characters', 'error')
        else:
            controller.add_transaction(transaction_type, amount, description)
            flash('Transaction added successfully!', 'success')
            return redirect(url_for('index'))

    return render_template('transactions.html')

@app.route('/delete_transaction/<int:transaction_id>', methods=['POST'])
def delete_transaction(transaction_id):
    controller.delete_transaction(transaction_id)
    flash('Transaction deleted successfully!', 'success')
    return redirect(url_for('index'))


# main driver function
if __name__ == '__main__':
    app.run()