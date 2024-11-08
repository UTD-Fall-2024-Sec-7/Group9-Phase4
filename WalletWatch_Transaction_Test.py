import pytest
from tkinter import Tk
from unittest.mock import MagicMock, patch
from addTransaction import AddTransactionView


@pytest.fixture
def controller():
    return MagicMock()


@pytest.fixture
def add_transaction_view(controller):
    root = Tk()
    view = AddTransactionView(root, controller)
    yield view
    root.destroy()


# test case 1
def test_add_valid_transaction(add_transaction_view, controller):
    add_transaction_view.type_var.set('spending')
    add_transaction_view.amount_var.set('120')
    add_transaction_view.desc_var.set('Groceries from ALDI')

    with patch('tkinter.messagebox.showinfo') as success:
        add_transaction_view.handle_add_transaction()

    controller.add_transaction.assert_called_once_with('spending', 120.0, 'Groceries from ALDI')
    success.assert_called_once_with("Success", "Transaction added successfully!")


# test case 2
def test_add_transaction_invalid_amount(add_transaction_view):
    add_transaction_view.type_var.set('spending')
    add_transaction_view.amount_var.set('10 axbb!')
    add_transaction_view.desc_var.set('Groceries from ALDI')

    with patch('tkinter.messagebox.showerror') as error:
        add_transaction_view.handle_add_transaction()

    error.assert_called_once_with("Error", "Please enter a valid amount")


# test case 3 W.O.P
def test_add_transaction_long_description(add_transaction_view, controller):
    add_transaction_view.type_var.set('spending')
    add_transaction_view.amount_var.set('120')
    add_transaction_view.desc_var.set('Groceries ' + 'many ' * 50 + 'apples')

    with patch('tkinter.messagebox.showinfo') as success:
        add_transaction_view.handle_add_transaction()

    controller.add_transaction.assert_called_once()
    success.assert_called_once_with("Success", "Transaction added successfully!")


# test case 5.1
def test_add_transaction_negative_amount(add_transaction_view):
    add_transaction_view.type_var.set('spending')
    add_transaction_view.amount_var.set('-100')
    add_transaction_view.desc_var.set('Groceries from ALDI')

    with patch('tkinter.messagebox.showerror') as error:
        add_transaction_view.handle_add_transaction()

    error.assert_called_once_with("Error", "Please fill in all fields correctly")


# test case 5.2
def test_add_transaction_zero_amount(add_transaction_view):
    add_transaction_view.type_var.set('spending')
    add_transaction_view.amount_var.set('0')
    add_transaction_view.desc_var.set('Groceries from ALDI')

    with patch('tkinter.messagebox.showerror') as error:
        add_transaction_view.handle_add_transaction()

    error.assert_called_once_with("Error", "Please fill in all fields correctly")


# test case 5.3
def test_add_transaction_large_amount(add_transaction_view, controller):
    add_transaction_view.type_var.set('spending')
    add_transaction_view.amount_var.set('99999999999999999999999999999999999999')
    add_transaction_view.desc_var.set('Groceries from ALDI')

    with patch('tkinter.messagebox.showinfo') as success:
        add_transaction_view.handle_add_transaction()

    controller.add_transaction.assert_called_once()
    success.assert_called_once_with("Success", "Transaction added successfully!")


# test case 5.4
def test_add_transaction_empty_amount(add_transaction_view):
    add_transaction_view.type_var.set('spending')
    add_transaction_view.amount_var.set('')
    add_transaction_view.desc_var.set('Groceries from ALDI')

    with patch('tkinter.messagebox.showerror') as error:
        add_transaction_view.handle_add_transaction()

    controller.add_transaction.assert_called_once()
    error.assert_called_once_with("Error", "Please fill in all fields correctly")


# test case 7
def test_add_transaction_empty_description(add_transaction_view):
    add_transaction_view.type_var.set('spending')
    add_transaction_view.amount_var.set('120')
    add_transaction_view.desc_var.set('')

    with patch('tkinter.messagebox.showerror') as success:
        add_transaction_view.handle_add_transaction()

    controller.add_transaction.assert_called_once()
    success.assert_called_once_with("Success", "Transaction added successfully!")
