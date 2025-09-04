document.addEventListener('DOMContentLoaded', () => {
  updateDashboardSummary();
});

function updateDashboardSummary() {
  const tableRows = document.querySelectorAll('#expensesTable tbody tr');
  let total = 0;
  const categoryBreakdown = {};

  tableRows.forEach(row => {
    const category = row.children[1]?.textContent.trim();
    const amount = parseFloat(row.children[3]?.textContent.trim());

    if (!isNaN(amount)) {
      total += amount;
      categoryBreakdown[category] = (categoryBreakdown[category] || 0) + amount;
    }
  });

  const summaryContainer = document.getElementById('totalDisplay');
  summaryContainer.innerHTML = `
    <h3>Total Expenses: $${total.toFixed(2)}</h3>
    <ul>
      ${Object.entries(categoryBreakdown).map(([cat, amt]) =>
        `<li>${cat}: $${amt.toFixed(2)}</li>`).join('')}
    </ul>
  `;
}
