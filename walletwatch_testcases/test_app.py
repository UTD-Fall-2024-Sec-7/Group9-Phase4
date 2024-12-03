import unittest
from app import app


class TestBudgetAPI(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        # Login to get a valid session
        self.app.post('/api/login',
                      json={'email': 'test@example.com', 'password': 'password123'})
        self.app.delete('/api/budgets/0')

    def test_valid_budget(self):
        response = self.app.post('/api/budgets',
                                 json={
                                     'name': 'Weekly Grocery Spending',
                                     'budgetLimit': 120,
                                     'type': 'spending',
                                     'tag': 'Shopping'
                                 })
        self.assertEqual(response.status_code, 201)
        self.assertIn('Budget added successfully', response.json['message'])

    def test_negative_budget_limit(self):
        response = self.app.post('/api/budgets',
                                 json={
                                     'name': 'Weekly Grocery Spending',
                                     'budgetLimit': -100,
                                     'type': 'spending',
                                     'tag': 'Shopping'
                                 })
        self.assertEqual(response.status_code, 400)
        self.assertIn('Budget should have a value greater than zero', response.json['error'])

    def test_name_too_long(self):
        response = self.app.post('/api/budgets',
                                 json={
                                     'name': 'Groceries ' * 20,  # Exceeds 50 characters
                                     'budgetLimit': 120,
                                     'type': 'spending',
                                     'tag': 'Shopping'
                                 })
        self.assertEqual(response.status_code, 400)
        self.assertIn('Name cannot exceed 50 characters', response.json['error'])

    def test_duplicate_tag(self):
        # First budget
        self.app.post('/api/budgets',
                      json={
                          'name': 'Weekly Grocery Spending',
                          'budgetLimit': 120,
                          'type': 'spending',
                          'tag': 'Shopping'
                      })
        # Duplicate tag
        response = self.app.post('/api/budgets',
                                 json={
                                     'name': 'Another Budget',
                                     'budgetLimit': 120,
                                     'type': 'spending',
                                     'tag': 'Shopping'
                                 })
        self.assertEqual(response.status_code, 409)
        self.assertIn('Budget with the tag Shopping already exists', response.json['error'])

    def test_zero_budget_limit(self):
        response = self.app.post('/api/budgets',
                                 json={
                                     'name': 'Weekly Grocery Spending',
                                     'budgetLimit': 0,
                                     'type': 'spending',
                                     'tag': 'Shopping'
                                 })
        self.assertEqual(response.status_code, 400)
        self.assertIn('Budget should have a value greater than zero', response.json['error'])

    def test_exceeding_budget_limit(self):
        response = self.app.post('/api/budgets',
                                 json={
                                     'name': 'Weekly Grocery Spending',
                                     'budgetLimit': 1000000000,
                                     'type': 'spending',
                                     'tag': 'Shopping'
                                 })
        self.assertEqual(response.status_code, 400)
        self.assertIn('Budget cannot exceed $999,999,999', response.json['error'])

    def test_missing_required_fields(self):
        response = self.app.post('/api/budgets',
                                 json={
                                     'name': '',
                                     'budgetLimit': 120,
                                     'type': 'spending',
                                     'tag': ''
                                 })
        self.assertEqual(response.status_code, 400)
        self.assertIn('Please fill in all fields correctly', response.json['error'])
