from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///budget.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Models
class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(200))
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    type = db.Column(db.String(50))  # 'spending' or 'saving'
    tag = db.Column(db.String(50))

class Budget(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    period = db.Column(db.String(50))  # 'daily', 'weekly', 'monthly'
    type = db.Column(db.String(50))    # 'spending' or 'saving'
    start_date = db.Column(db.DateTime, nullable=False)

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

@app.route('/add_transaction', methods=['POST'])
def add_transaction():
    try:
        data = request.json
        new_transaction = Transaction(
            amount=float(data['amount']),
            description=data['description'],
            type=data['type'],
            tag=data['tag']
        )
        db.session.add(new_transaction)
        db.session.commit()
        return jsonify({"message": "Transaction added successfully"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@app.route('/get_transactions')
def get_transactions():
    try:
        transactions = Transaction.query.order_by(Transaction.date.desc()).all()
        return jsonify([{
            'id': t.id,
            'amount': t.amount,
            'description': t.description,
            'date': t.date.strftime('%Y-%m-%d'),
            'type': t.type,
            'tag': t.tag
        } for t in transactions])
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/add_budget', methods=['POST'])
def add_budget():
    try:
        data = request.json
        new_budget = Budget(
            amount=float(data['amount']),
            period=data['period'],
            type=data['type'],
            start_date=datetime.strptime(data['start_date'], '%Y-%m-%d')
        )
        db.session.add(new_budget)
        db.session.commit()
        return jsonify({"message": "Budget added successfully"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@app.route('/filter_transactions')
def filter_transactions():
    try:
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        budget_type = request.args.get('type')
        min_amount = request.args.get('min_amount')
        max_amount = request.args.get('max_amount')
        tag = request.args.get('tag')

        query = Transaction.query

        if start_date:
            query = query.filter(Transaction.date >= datetime.strptime(start_date, '%Y-%m-%d'))
        if end_date:
            query = query.filter(Transaction.date <= datetime.strptime(end_date, '%Y-%m-%d'))
        if budget_type:
            query = query.filter(Transaction.type == budget_type)
        if min_amount:
            query = query.filter(Transaction.amount >= float(min_amount))
        if max_amount:
            query = query.filter(Transaction.amount <= float(max_amount))
        if tag:
            query = query.filter(Transaction.tag == tag)

        transactions = query.order_by(Transaction.date.desc()).all()
        return jsonify([{
            'id': t.id,
            'amount': t.amount,
            'description': t.description,
            'date': t.date.strftime('%Y-%m-%d'),
            'type': t.type,
            'tag': t.tag
        } for t in transactions])
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=8000)