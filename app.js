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
    const sections = ['home', 'tools', 'my-projects', 'about']
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

  // ------- My Projects -------
  const PROJECT_TOOLS = {
    upg: { label: 'Unified Profile Generator', url: 'http://sassysolutions-unified-pro-gen-09e8f3d71dc2.pear-virginia.herokuapp.com/' },
    lpg: { label: 'Loyalty Portal Generator', url: 'https://sassysolutions-loyaltygen-7922fe2e6c27.azalea-virginia.herokuapp.com/' },
    icp: { label: 'Interactive Customer Presentations', url: 'https://sassysolutions-interactiveprez-ec40690dc476.rose-virginia.herokuapp.com/' }
  };

  function syncMyProjectsUI() {
    const signedOut = document.getElementById('my-projects-signed-out');
    const signedIn = document.getElementById('my-projects-signed-in');
    const emailEl = document.getElementById('my-projects-email');
    if (!signedOut || !signedIn) return;

    const isSignedIn = !!(window.SaasyAuth && window.SaasyAuth.isSignedIn());
    signedOut.classList.toggle('hidden', isSignedIn);
    signedIn.classList.toggle('hidden', !isSignedIn);

    if (isSignedIn) {
      if (emailEl) emailEl.textContent = window.SaasyAuth.getEmail();
      loadMyProjects();
    }
  }

  async function loadMyProjects() {
    const grid = document.getElementById('my-projects-grid');
    if (!grid || !window.SaasyAuth) return;
    grid.innerHTML = '<p class="my-projects-empty">Loading&hellip;</p>';

    const toolKeys = Object.keys(PROJECT_TOOLS);
    const results = await Promise.all(toolKeys.map(tool =>
      window.SaasyAuth.listProjects({ tool }).catch(() => [])
    ));

    const projects = toolKeys.flatMap((tool, i) =>
      (results[i] || []).map(p => ({ ...p, tool }))
    );

    if (projects.length === 0) {
      grid.innerHTML = '<p class="my-projects-empty">No saved projects yet. Open a Generator and save your work to see it here.</p>';
      return;
    }

    projects.sort((a, b) => new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at));

    grid.innerHTML = projects.map(p => {
      const toolInfo = PROJECT_TOOLS[p.tool] || { label: p.tool, url: '#' };
      const updated = p.updated_at ? new Date(p.updated_at).toLocaleDateString() : '';
      return `
        <article class="project-card" data-project-id="${escapeAttr(p.id)}" data-tool="${escapeAttr(p.tool)}">
          <div class="project-card-header">
            <span class="tool-badge generators">${escapeHtml(toolInfo.label)}</span>
          </div>
          <h3 class="project-name">${escapeHtml(p.name || 'Untitled')}</h3>
          <p class="project-meta">${updated ? 'Updated ' + escapeHtml(updated) : ''}</p>
          <div class="project-actions">
            <a class="pixel-btn pixel-btn-sm" href="${escapeAttr(toolInfo.url)}?projectId=${escapeAttr(p.id)}" target="_blank" rel="noopener">Reopen &raquo;</a>
            <button class="pixel-btn pixel-btn-sm pixel-btn-ghost btn-delete-project">Delete</button>
          </div>
        </article>
      `;
    }).join('');

    grid.querySelectorAll('.btn-delete-project').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.project-card');
        const id = card.dataset.projectId;
        deleteMyProject(id, card);
      });
    });
  }

  async function deleteMyProject(id, card) {
    if (!window.SaasyAuth) return;
    if (!confirm('Delete this saved project? This cannot be undone.')) return;
    try {
      await window.SaasyAuth.deleteProject(id);
      card.remove();
    } catch (err) {
      alert('Could not delete project: ' + err.message);
    }
  }

  function initMyProjects() {
    const signinBtn = document.getElementById('btn-my-projects-signin');
    const signoutBtn = document.getElementById('btn-my-projects-signout');
    if (signinBtn) {
      signinBtn.addEventListener('click', async () => {
        if (!window.SaasyAuth) return;
        try {
          await window.SaasyAuth.signIn();
          syncMyProjectsUI();
        } catch (err) {
          // user cancelled or sign-in failed; nothing to do
        }
      });
    }
    if (signoutBtn) {
      signoutBtn.addEventListener('click', () => {
        if (!window.SaasyAuth) return;
        window.SaasyAuth.signOut();
        syncMyProjectsUI();
      });
    }
    syncMyProjectsUI();
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderTools('all');
    initTabs();
    initNavHighlight();
    initYear();
    initTenure();
    initMyProjects();
  });
})();
