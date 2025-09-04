document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('addProjectForm');
  const tableBody = document.querySelector('#projectsTable tbody');

  function loadProjects() {
    fetch(`${API_URL}/projects`)
      .then(res => res.json())
      .then(data => {
        tableBody.innerHTML = data.map(p => `
          <tr>
            <td>${p.name}</td>
            <td><button data-id="${p.id}" class="deleteProjectBtn">Delete</button></td>
          </tr>
        `).join('');
      });
  }

  loadProjects();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('projectName').value.trim();
    if (!name) return;

    fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(() => {
        form.reset();
        loadProjects();
      });
  });

  tableBody.addEventListener('click', e => {
    if (e.target.classList.contains('deleteProjectBtn')) {
      const id = e.target.dataset.id;
      fetch(`${API_URL}/projects/${id}`, { method: 'DELETE' })
        .then(() => loadProjects());
    }
  });
});
