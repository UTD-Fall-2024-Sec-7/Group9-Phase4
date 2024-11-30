// static/script.js
document.addEventListener('DOMContentLoaded', function() {
    loadTransactions();
    
    document.getElementById('transactionForm').addEventListener('submit', addTransaction);
    document.getElementById('budgetForm').addEventListener('submit', addBudget);
});

async function addTransaction(event) {
    event.preventDefault();
    const submitButton = event.target.querySelector('button');
    submitButton.disabled = true;
    
    const data = {
        amount: parseFloat(document.getElementById('amount').value),
        description: document.getElementById('description').value,
        type: document.getElementById('type').value,
        tag: document.getElementById('tag').value
    };

    try {
        const response = await fetch('/add_transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            document.getElementById('transactionForm').reset();
            loadTransactions();
        } else {
            const error = await response.json();
            alert(error.error || 'Failed to add transaction');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to add transaction');
    } finally {
        submitButton.disabled = false;
    }
}

async function addBudget(event) {
    event.preventDefault();
    const submitButton = event.target.querySelector('button');
    submitButton.disabled = true;
    
    const data = {
        amount: parseFloat(document.getElementById('budgetAmount').value),
        period: document.getElementById('period').value,
        type: document.getElementById('budgetType').value,
        start_date: document.getElementById('startDate').value
    };

    try {
        const response = await fetch('/add_budget', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            document.getElementById('budgetForm').reset();
            alert('Budget added successfully!');
        } else {
            const error = await response.json();
            alert(error.error || 'Failed to add budget');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to add budget');
    } finally {
        submitButton.disabled = false;
    }
}

async function loadTransactions() {
    const container = document.getElementById('transactionHistory');
    container.innerHTML = '<div class="loader"></div>';
    
    try {
        const response = await fetch('/get_transactions');
        const transactions = await response.json();
        displayTransactions(transactions);
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p>Failed to load transactions</p>';
    }
}

async function filterTransactions() {
    const container = document.getElementById('transactionHistory');
    container.innerHTML = '<div class="loader"></div>';
    
    const params = new URLSearchParams({
        start_date: document.getElementById('startDateFilter').value || '',
        end_date: document.getElementById('endDateFilter').value || '',
        type: document.getElementById('typeFilter').value || '',
        min_amount: document.getElementById('minAmount').value || '',
        max_amount: document.getElementById('maxAmount').value || '',
        tag: document.getElementById('tagFilter').value || ''
    });

    try {
        const response = await fetch(`/filter_transactions?${params}`);
        const transactions = await response.json();
        displayTransactions(transactions);
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p>Failed to filter transactions</p>';
    }
}

function displayTransactions(transactions) {
    const container = document.getElementById('transactionHistory');
    container.innerHTML = '';
    
    if (transactions.length === 0) {
        container.innerHTML = '<p>No transactions found.</p>';
        return;
    }
    
    transactions.forEach(t => {
        const div = document.createElement('div');
        div.className = 'transaction-item';
        
        const amountClass = t.type === 'spending' ? 'amount spending' : 'amount saving';
        const amountPrefix = t.type === 'spending' ? '-' : '+';
        
        div.innerHTML = `
            <span>Date: ${t.date}</span>
            <span class="${amountClass}">${amountPrefix}$${Math.abs(t.amount).toFixed(2)}</span>
            <span>${t.description}</span>
            <span class="tag">${t.tag}</span>
            <span>${t.type}</span>
        `;
        container.appendChild(div);
    });
}