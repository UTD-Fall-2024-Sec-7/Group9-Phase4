import pytest
import WalletWatch

class TransactionTest:

    def setup_method(self, method):
        self.controller = controller
        print(f"Setting up {method}")

    def teardown_method(self, method):
        print(f"Tearing down {method}")
