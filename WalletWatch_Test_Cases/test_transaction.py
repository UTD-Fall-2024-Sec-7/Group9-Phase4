import sys
#Setting Path to one directory up
sys.path.append('..')


#importing
import pytest
from WalletWatch import databaseManager as db
from WalletWatch import controller as con
#from WalletWatch.controller import *

class Test_Transaction:

    #Pre loaded transactions are
    #id = 5, Type = Spending, Amount = 15.0, Description = "Testing Transaction 1"
    #id = 6, Type = Savings,  Amount = 22.3, Description = "Testing Transaction 2"
    #attrDict = {"transaction_id": 0, "description": 3, "amount": 2}
    
    def setup_method(self, method):
        self.dbManager = db.DatabaseManager("WalletWatch_Test.db")
        self.controller = con.TransactionController(self.dbManager)
        print(f"Setting up {method}")

    def teardown_method(self, method):
        print(f"Tearing down {method}")


    def test_one(self):
        assert True

    
    #tests to see if pre-loaded transactions are accessible to user
    #this is hard coded this needs to be parameterized so differnt data can be 
    #input easily and to accomodate for future changess
    def test_view_preloaded_transaction(self):

        #this should be public but it         
        attrDict = {"transaction_id": 0, "description": 3, "amount": 2}

        transaction_one = self.controller.get_transaction(5).pop()
        transaction_two = self.controller.get_transaction(6).pop()

        #Transaction one 
        assert transaction_one[attrDict["transaction_id"]] == 5
        assert transaction_one[attrDict['description']] == "Testing Transaction 1"
        assert transaction_one[attrDict['amount']] == 15.0

        #Transaction two
        assert transaction_two[attrDict['transaction_id']] == 6
        assert transaction_two[attrDict['description']] == "Testing Transaction 2"
        assert transaction_two[attrDict['amount']] == 22.3

    
    def test_view_impossible_transaction(self):
        attrDict = {"transaction_id": 0, "description": 3, "amount": 2}

        with pytest.raises(IndexError) as expInfo:
            #This should be empty
            transaction_neg_one = self.controller.get_transaction(-1).pop()
            transaction_neg_big = self.controller.get_transaction(-193400034).pop()
            
            assert expInfo is IndexError
            
        #assert expInfo is IndexError


    #pytest dependency plugin
    #@pytest.mark.dependency()
    def test_addtransaction_valid(self):
        transaction_new_id = self.controller.add_transaction("Spending", 15.54, "In_Test_Transaction")


    def test_add_negative_transaction_amount(self):
        transaction_neg_amount_id = self.controller.add_transaction("Spending", -4.66, "Invalid negative amount")
        assert transaction_neg_amount_id is None


