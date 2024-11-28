from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from databaseManager import DatabaseManager
from controller import TransactionController
from transaction import Transaction

db_manager = DatabaseManager()
controller = TransactionController(db_manager)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

app.secret_key = '12345'


@app.route('/api/transactions', methods=['GET'])
def index():
    transactions = controller.get_transaction_history()
    return jsonify(transactions)


@app.route('/api/transactions', methods=['POST'])
def add_transaction():
    data = request.json
    transaction_type = data.get['type']
    amount = float(data.get['amount'])
    description = data.get['description']

    if not transaction_type or amount <= 0 or not description:
        return jsonify({'error': 'Please fill in all fields correctly'}), 400
    elif amount > 9999999999999999:
        return jsonify({'error': 'Amount exceeds 16-digit limit'}), 400
    elif len(description) > 100:
        return jsonify({'error': 'Description exceeds 100 characters'}), 400
    else:
        transaction_id = controller.add_transaction(transaction_type, amount, description)
        return jsonify({'message': 'Transaction added successfully!', 'id': transaction_id}), 201


@app.route('/api/transactions/<int:transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    controller.delete_transaction(transaction_id)
    return jsonify({'message': 'Transaction deleted successfully!'}), 200


# main driver function
if __name__ == '__main__':
    app.run(debug=True)
