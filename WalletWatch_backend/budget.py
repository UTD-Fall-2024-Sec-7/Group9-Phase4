class Budget:
    def __init__(self, budget_id=None, name=None, type=None, budgetLimit=None, tag=None):
        self.budget_id = budget_id
        self.name = name
        self.type = type  # 'savings' or 'spending'
        self.budgetLimit = budgetLimit
        self.tag = tag  # grocery, shopping, food, entertainment, transport, education, misc