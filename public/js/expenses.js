const API_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('addExpenseForm');
  const tableBody = document.querySelector('#expensesTable tbody');
  const projectSelect = document.getElementById('expenseProject');

  // Load projects into dropdown
  fetch(`${API_URL}/projects`)
    .then(res => res.json())
    .then(projects => {
      projectSelect.innerHTML = projects.map(p =>
        `<option value="${p.name}">${p.name}</option>`
      ).join('');
    });

  // Load expenses into table
  function loadExpenses() {
    fetch(`${API_URL}/expenses`)
      .then(res => res.json())
      .then(data => {
        tableBody.innerHTML = data.map(exp => `
          <tr>
            <td>${exp.project}</td>
            <td>${exp.category}</td>
            <td>${exp.description || ''}</td>
            <td>$${parseFloat(exp.amount).toFixed(2)}</td>
            <td>${exp.date}</td>
            <td><button data-id="${exp.id}" class="deleteExpenseBtn">Delete</button></td>
          </tr>
        `).join('');
      });
  }

  loadExpenses();

  // Add expense
  form.addEventListener('submit', e => {
    e.preventDefault();
    const expense = {
      project: projectSelect.value,
      category: document.getElementById('expenseCategory').value,
      description: document.getElementById('expenseDescription').value,
      amount: document.getElementById('expenseAmount').value,
      date: document.getElementById('expenseDate').value
    };

    fetch(`${API_URL}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense)
    })
      .then(res => res.json())
      .then(() => {
        form.reset();
        loadExpenses();
      });
  });

  // Delete expense
  tableBody.addEventListener('click', e => {
    if (e.target.classList.contains('deleteExpenseBtn')) {
      const id = e.target.dataset.id;
      fetch(`${API_URL}/expenses/${id}`, { method: 'DELETE' })
        .then(() => loadExpenses());
    }
  });
});
