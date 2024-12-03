from datetime import datetime


class Transaction:
    def __init__(self, transaction_id=None, type=None, amount=None, description=None, date=None, tag=None):
        self.transaction_id = transaction_id
        self.type = type  # 'savings' or 'spending'
        self.amount = amount
        self.description = description
        self.date = date if date else datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.tag = tag  # grocery, shopping, food, entertainment, transport, education, misc
