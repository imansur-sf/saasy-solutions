(function () {
  const CATEGORY_LABELS = {
    meshmesh: 'MeshMesh',
    slackbot: 'Slack Skill',
    generators: 'Generator',
    holodeck: 'Holodeck'
  };

  function renderTools(filter) {
    const grid = document.getElementById('tool-grid');
    if (!grid) return;
    const tools = (window.SAASY_TOOLS || []).filter(
      t => filter === 'all' || t.category === filter
    );

    if (tools.length === 0) {
      grid.innerHTML = '<p class="tool-desc">No tools in this category yet.</p>';
      return;
    }

    grid.innerHTML = tools.map(t => `
      <article class="tool-card">
        <div class="tool-card-header">
          <span class="tool-icon" aria-hidden="true">${t.icon || '★'}</span>
          <span class="tool-badge ${t.category}">${CATEGORY_LABELS[t.category] || t.category}</span>
        </div>
        <h3 class="tool-name">${escapeHtml(t.name)}</h3>
        <p class="tool-desc">${escapeHtml(t.desc)}</p>
        <a class="pixel-btn pixel-btn-sm tool-link"
           href="${escapeAttr(t.url)}"
           ${t.url && t.url !== '#' ? 'target="_blank" rel="noopener"' : ''}>
          Launch &raquo;
        </a>
      </article>
    `).join('');
  }

  function escapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }
  function escapeAttr(s) { return escapeHtml(s); }

  function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        tabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTools(btn.dataset.filter);
      });
    });
  }

  function initNavHighlight() {
    const links = document.querySelectorAll('.nav-link');
    const sections = ['home', 'tools', 'about']
      .map(id => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.toggle(
            'active',
            l.dataset.section === entry.target.id
          ));
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(s => observer.observe(s));
  }

  function initYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  function initTenure() {
    const el = document.getElementById('sf-tenure-days');
    if (!el) return;
    const start = new Date('2017-03-06T00:00:00');
    const days = Math.floor((Date.now() - start.getTime()) / 86400000);
    el.textContent = days.toLocaleString();
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderTools('all');
    initTabs();
    initNavHighlight();
    initYear();
    initTenure();
  });
})();
