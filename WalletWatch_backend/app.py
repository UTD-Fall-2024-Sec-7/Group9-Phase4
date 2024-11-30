from flask import Flask, jsonify, request, url_for, session, flash, render_template
from flask_cors import CORS
from flask_mail import Mail
from itsdangerous import URLSafeTimedSerializer
from werkzeug.security import generate_password_hash, check_password_hash
from databaseManager import DatabaseManager
from controller import AccountController, TransactionController, BudgetController
from accounts import EmailManager
from config import ApplicationConfig
from resetPassword import ResetPasswordForm

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(ApplicationConfig)

CORS(app)
mail = Mail(app)
s = URLSafeTimedSerializer('SecureAuth')

db_manager = DatabaseManager()
a_controller = AccountController(db_manager)
t_controller = TransactionController(db_manager)
b_controller = BudgetController(db_manager)
email_manager = EmailManager(app, mail)


@app.route('/')
def home():
    return {"message": "Welcome to WalletWatch"}


@app.route('/api/@me')
def get_cur_user():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    email = a_controller.get_email(user_id)
    user = a_controller.get_user(email)

    return jsonify({
        "user_id": user_id,
        "email": email,
        "firstName": user[3],
        "lastName": user[4],
        "income": user[5],
    }), 200


@app.route('/api/createAccount', methods=['POST'])
def register_user():
    email = request.json['email']
    password = request.json['password']
    firstName = request.json['firstName']
    lastName = request.json['lastName']
    income = request.json['income']

    hashed_password = generate_password_hash(password)
    user_id = a_controller.add_user(email, hashed_password, firstName, lastName, income)

    if not user_id:
        return jsonify(({'error': 'email already exists'})), 409

    session['user_id'] = user_id
    db_manager.create_user_tables(user_id)
    return jsonify({'message': 'Registration Success', 'id': user_id}), 200


@app.route('/api/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']

    user = a_controller.get_user(email)

    if user is None:
        return jsonify({'error': 'Email not found'}), 401
    if not check_password_hash(user[2], password):
        return jsonify({'error': 'Incorrect password'}), 401

    session['user_id'] = user[0]
    db_manager.create_user_tables(user[0])
    return jsonify({'message': 'Login successful', 'id': user[0]}), 200


@app.route('/api/forgotPassword', methods=['POST'])
def forgot_password():
    email = request.json['email']
    user = a_controller.get_user(email)
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

    form = ResetPasswordForm()

    if form.validate_on_submit():
        new_password = form.password.data
        hashed_password = generate_password_hash(new_password)
        if a_controller.set_password(email, hashed_password):
            return render_template('resetPassword.html', success=True), 200
        else:
            flash('Password reset failed. Please try again.', 'danger')

    return render_template('resetPassword.html', form=form, token=token)

    # if request.method == 'GET':
    #     return jsonify({'message': 'Token is valid'}), 200
    #
    # elif request.method == 'POST':
    #     # password reset logic
    #     new_password = request.json['password']
    #     hashed_password = generate_password_hash(new_password)
    #     if a_controller.set_password(email, hashed_password):
    #         return jsonify({'message': 'Password reset successful'}), 200
    #     else:
    #         return jsonify({'error': 'Password reset failed'}), 400


@app.route('/api/transactions', methods=['GET'])
def view_transactions():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    transactions = t_controller.get_transaction_history(user_id)
    return jsonify(transactions), 200


@app.route('/api/transactions', methods=['POST'])
def add_transaction():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    transaction_type = request.json['type']
    amount = float(request.json['amount'])
    description = request.json['description']
    tag = request.json['tag']

    if not transaction_type or amount <= 0 or not tag:
        return jsonify({'error': 'Please fill in all fields correctly'}), 400
    elif amount > 9999999999999999:
        return jsonify({'error': 'Amount exceeds 16-digit limit'}), 400
    elif len(description) > 100:
        return jsonify({'error': 'Description exceeds 100 characters'}), 400
    else:
        transaction_id = t_controller.add_transaction(transaction_type, amount, description, tag, user_id)
        return jsonify({'message': 'Transaction added successfully!', 'id': transaction_id}), 201


@app.route('/api/transactions/<int:transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    if t_controller.delete_transaction(transaction_id, user_id):
        return jsonify({'message': 'Transaction deleted successfully!'}), 200
    else:
        return jsonify({'error': 'Transaction deletion FAILED'}), 404


@app.route('/api/filterTransactions/<filer_type>', methods=['GET'])
def filter_transaction(filter_type):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    t_controller.filter_transaction(filter_type, user_id)
    return jsonify({'message': 'Transaction filtered successfully!'}), 200


@app.route('/api/budgets', methods=['GET'])
def view_budgets():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    budgets = b_controller.get_all_budgets(user_id)

    budget_list = []
    for budget in budgets:
        budget_dict = {
            "id": budget[0],
            "name": budget[1],
            "type": budget[2],
            "budgetLimit": budget[3],
            "remainingBudget": budget[4],
            "tag": budget[5]
        }
        budget_list.append(budget_dict)

    return jsonify(budget_list), 200


@app.route('/api/budgets', methods=['POST'])
def add_budget():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    name = request.json['name']
    budget_type = request.json['type']
    budget_limit = float(request.json['budgetLimit'])
    tag = request.json['tag']

    if not name or budget_limit <= 0 or not tag:
        return jsonify({'error': 'Please fill in all fields correctly'}), 400

    budget_id = b_controller.add_budget(budget_type, name, budget_limit, tag, user_id)
    if not budget_id:
        return jsonify({'error': f'Budget with the tag {tag} already exists'}), 409

    return jsonify({'message': 'Budget added successfully!', 'id': budget_id}), 201


@app.route('/api/budgets/<int:budget_id>', methods=['PUT'])
def edit_budget(budget_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    # name = request.json['name']
    budget_type = request.json['type']
    budget_limit = float(request.json['budgetLimit'])
    tag = request.json['tag']

    if b_controller.edit_budget(budget_id, budget_type, budget_limit, tag, user_id):
        return jsonify({'message': 'Budget updated successfully!'}), 200
    else:
        return jsonify({'error': 'Budget update FAILED'}), 404


@app.route('/api/budgets/<int:budget_id>', methods=['DELETE'])
def delete_budget(budget_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    if b_controller.delete_budget(budget_id, user_id):
        return jsonify({'message': 'Budget deleted successfully!'}), 200
    else:
        return jsonify({'error': 'Budget deletion FAILED'}), 404


@app.route('/api/logout', methods=['GET'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200


# main driver function
if __name__ == '__main__':
    app.run(debug=True)
