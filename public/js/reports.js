const API_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reportFilterForm');
  const projectSelect = document.getElementById('reportProject');
  const totalDisplay = document.getElementById('reportTotal');
  const ctx = document.getElementById('reportChart').getContext('2d');

  let reportChart;

  // Load projects into filter dropdown
  fetch(`${API_URL}/projects`)
    .then(res => res.json())
    .then(projects => {
      projectSelect.innerHTML += projects.map(p =>
        `<option value="${p.name}">${p.name}</option>`
      ).join('');
    });

  // Load report data
  function loadReport(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    fetch(`${API_URL}/expenses?${query}`)
      .then(res => res.json())
      .then(data => {
        const categoryTotals = {};
        data.forEach(({ category, amount }) => {
          categoryTotals[category] = (categoryTotals[category] || 0) + parseFloat(amount);
        });

        const labels = Object.keys(categoryTotals);
        const dataPoints = Object.values(categoryTotals);
        const total = dataPoints.reduce((sum, val) => sum + val, 0);

        totalDisplay.textContent = `Total: $${total.toFixed(2)}`;

        if (reportChart) reportChart.destroy();
        reportChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: 'Expenses by Category',
              data: dataPoints,
              backgroundColor: 'rgba(54, 162, 235, 0.6)'
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      });
  }

  // Initial load
  loadReport();

  // Filter form submission
  form.addEventListener('submit', e => {
    e.preventDefault();
    const filters = {
      project: projectSelect.value,
      startDate: document.getElementById('reportStartDate').value,
      endDate: document.getElementById('reportEndDate').value
    };
    loadReport(filters);
  });
});
