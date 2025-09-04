document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-button');
  const sections = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      sections.forEach(section => {
        section.style.display = section.id === target ? 'block' : 'none';
      });
    });
  });

  // Default tab
  const defaultTab = document.querySelector('.tab-button[data-target="dashboardSection"]');
  if (defaultTab) defaultTab.click();
});
