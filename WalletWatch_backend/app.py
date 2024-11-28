from flask import Flask, jsonify, request, url_for
from flask_cors import CORS
from flask_mail import Mail
from itsdangerous import URLSafeTimedSerializer
from werkzeug.security import generate_password_hash, check_password_hash
from databaseManager import DatabaseManager
from controller import TransactionController
from transaction import Transaction
from emails import EmailManager

# Initialize Flask app
app = Flask(__name__)
CORS(app)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'thetrios2mc@gmail.com'
app.config['MAIL_PASSWORD'] = 'rjpv zfks xnkv nrvv'
mail = Mail(app)
s = URLSafeTimedSerializer('12345')

db_manager = DatabaseManager()
controller = TransactionController(db_manager)
email_manager = EmailManager(app, mail)


@app.route('/')
def home():
    return {"message": "Welcome to WalletWatch"}


@app.route('/api/createAccount', methods=['POST'])
def register_user():
    email = request.json['email']
    password = request.json['password']
    hashed_password = generate_password_hash(password)
    if db_manager.add_user(email, hashed_password):
        return jsonify({'message': 'Registration Success'}), 200
    else:
        return jsonify(({'error': 'email already exists'})), 400


@app.route('/api/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    user = db_manager.get_user(email)
    if user and check_password_hash(user[2], password):
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401


@app.route('/api/forgotPassword', methods=['POST'])
def forgot_password():
    email = request.json['email']
    print(email)
    user = db_manager.get_user(email)
    if user:
        # generate reset token
        token = s.dumps(email, salt='password-reset-salt')
        # send email with reset token
        reset_link = url_for('password_reset', token=token, _external=True)
        email_manager.send_pass_reset_email(email, reset_link)
        return jsonify({'message': 'Password reset email sent'}), 200
    else:
        return jsonify({'error': 'Email not found'}), 404


@app.route('/api/passwordReset/<token>', methods=['GET', 'POST'])
def password_reset(token):
    try:
        email = s.loads(token, salt='password-reset-salt', max_age=3600)  # token expires after 1 hour
    except:
        return jsonify({'error': 'Invalid or expired token'}), 400

    if request.method == 'GET':
        return jsonify({'message': 'Token is valid'}), 200

    elif request.method == 'POST':
        # password reset logic
        new_password = request.json['password']
        hashed_password = generate_password_hash(new_password)
        if db_manager.change_user_password(email, hashed_password):
            return jsonify({'message': 'Password reset successful'}), 200
        else:
            return jsonify({'error': 'Password reset failed'}), 400


@app.route('/api/transactions', methods=['GET'])
def index():
    transactions = controller.get_transaction_history()
    return jsonify(transactions), 200


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
