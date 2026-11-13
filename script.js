// ===== Dark Mode Toggle - Initialize theme early =====
// Get theme from localStorage or default to dark (before DOM loads)
(function() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();

// ===== Wait for DOM to be fully loaded =====
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== Smooth Scroll =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const menu = document.getElementById("navbarNav");
        if (menu && menu.classList.contains("show") && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(menu).hide();
        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "start",
        });
      }
    });
  });

  // ===== Dark Mode Toggle =====
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const themeIcon = document.getElementById('themeIcon');
  const themeToggle = document.getElementById('themeToggle');
  
  // Update icon based on current theme
  if (themeIcon) {
    if (currentTheme === 'dark') {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  }

  // Theme toggle functionality
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Update icon
      if (themeIcon) {
        if (newTheme === 'dark') {
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
        } else {
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
        }
      }
    });
  }

  // ===== Update Active Nav Link on Scroll =====
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        if (navLink) {
          navLink.classList.add('active');
        }
      }
    });
  });

});

  // ===== Render Data =====
  if (typeof portfolioData !== 'undefined') {
    renderAbout(portfolioData.about);
    renderTechStack(portfolioData.tech_stack);
    renderExperience(portfolioData.experience);
    renderProjects(portfolioData.projects);
    initProjectFilters(portfolioData.projects);
    if (portfolioData.infrastructure) {
      renderInfrastructurePreview(portfolioData.infrastructure);
    }
  } else {
    console.error('Data not found! Make sure data.js is loaded.');
  }

  function initProjectFilters(projects) {
    const categorySelect = document.getElementById('projectCategory');
    const searchInput = document.getElementById('projectSearch');
    
    if (!categorySelect || !searchInput) return;

    // Populate categories
    const categories = new Set(projects.map(p => p.category));
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      categorySelect.appendChild(option);
    });

    // Filter function
    function filterProjects() {
      const searchTerm = searchInput.value.toLowerCase();
      const selectedCategory = categorySelect.value;

      const filtered = projects.filter(p => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesSearch = p.title.toLowerCase().includes(searchTerm) || 
                              p.techStack.toLowerCase().includes(searchTerm) || 
                              p.description.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
      });

      renderProjects(filtered);
    }

    // Event listeners
    searchInput.addEventListener('input', filterProjects);
    categorySelect.addEventListener('change', filterProjects);
  }

  function renderAbout(about) {
    const container = document.getElementById('about-container');
    if (!container) return;

    const html = `
      <div class="col-lg-6 about-story">${about.paragraphs.map(p => `<p>${p}</p>`).join('')}</div>
      <div class="col-lg-6 competencies">${about.core_competencies.map((comp, i) => `
        <article class="competency"><span class="competency-number">0${i + 1}</span><div><h3>${comp.title}</h3><p>${comp.description}</p></div></article>
      `).join('')}</div>`;

    container.innerHTML = html;
  }

  function renderTechStack(techStack) {
    const container = document.getElementById('tech-stack-container');
    if (!container) return;

    let html = `
      <div class="col-md-10">
        <div class="d-flex flex-wrap justify-content-center gap-2">
    `;
    
    techStack.forEach(tech => {
      html += `<span class="badge bg-${tech.style} fs-6 py-2 px-3 mb-2"><i class="${tech.icon} me-1"></i>${tech.name}</span>`;
    });
    
    html += `
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  }

  function renderExperience(experiences) {
    const container = document.getElementById('experience-container');
    if (!container) return;

    let html = `
      <div class="col-md-10">
        <div class="timeline" style="border-left: 2px solid var(--accent-color); padding-left: 2rem; margin-left: 1rem;">
    `;
    
    experiences.forEach((exp, index) => {
      const isLast = index === experiences.length - 1;
      html += `
          <div class="timeline-item mb-${isLast ? '4' : '5'}" style="position: relative;">
            <span class="timeline-icon" style="position: absolute; left: -2.35rem; top: 0.3rem; background: var(--accent-color); color: white; width: 12px; height: 12px; border-radius: 50%;"></span>
            <h4 class="fw-bold mb-1">${exp.title}</h4>
            <h5 class="text-muted mb-2">${exp.company} &middot; ${exp.type}</h5>
            <p class="small text-muted mb-3"><i class="fas fa-calendar-alt me-2"></i>${exp.date} &nbsp;|&nbsp; <i class="fas fa-map-marker-alt me-2"></i>${exp.location}</p>
            <p>${exp.description}</p>
            <p class="small text-muted mt-2"><strong>Skills:</strong> ${exp.skills}</p>
          </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  }

  function escapeAttribute(value) {
    return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    if (!container) return;

    const html = projects.length ? [...projects].sort((a, b) => Number(b.year) - Number(a.year)).map(p => `
      <div class="col-md-6 mb-4 d-flex">
        <article class="project-card work-card h-100 w-100">
          ${(() => { const images = (Array.isArray(p.images) ? p.images : []).filter(Boolean); const selected = images.length ? images : (p.image ? [p.image] : (p.thumbnail ? [p.thumbnail] : [])); return selected.length ? `<div class="work-media">${selected.map((src, i) => `<div class="work-slide"><img src="${escapeAttribute(src)}" alt="${escapeAttribute((p.imageAlt || p.title) + (selected.length > 1 ? ` — image ${i + 1}` : ''))}" loading="lazy" decoding="async" width="960" height="540"><button class="work-preview" type="button" aria-label="Preview image ${i + 1} for ${escapeAttribute(p.title)}"><i class="fas fa-expand" aria-hidden="true"></i><span>Preview</span></button></div>`).join('')}</div>` : ''; })()}
          <div class="work-header">
            <div class="work-category">
              <span class="work-icon" aria-hidden="true"><i class="fas ${p.category === 'IoT System' ? 'fa-microchip' : p.category === 'Web Services' ? 'fa-network-wired' : p.category === 'Desktop Application' ? 'fa-desktop' : 'fa-code'}"></i></span>
              <span>${p.category}</span>
            </div>
            <span class="work-year">${p.year}</span>
          </div>
          <div class="project-content">
            <h3>${p.title}</h3>
            <p class="project-role">${p.role}</p>
            <p class="project-text">${p.description}</p>
            <div class="project-tags" aria-label="Technologies">${p.techStack.split(',').map(t => `<span>${t.trim()}</span>`).join('')}</div>
          </div>
          <div class="work-footer">
            ${p.link ? `<span class="work-status"><span aria-hidden="true"></span>Public project</span><a class="project-visit" href="${p.link}" target="_blank" rel="noopener noreferrer">View project <span aria-hidden="true">↗</span><span class="visually-hidden">: ${p.title}</span></a>` : '<span class="project-private"><i class="fas fa-code-branch" aria-hidden="true"></i> Project showcase</span><span class="work-unavailable">No public link</span>'}
          </div>
        </article>
      </div>`).join('') : '<div class="col-12 text-center text-muted my-5" role="status"><h5>No projects found matching your criteria.</h5><p>Try another keyword or category.</p></div>';

    container.innerHTML = html;
    const previewModal = getImagePreviewModal();
    container.querySelectorAll('.work-media').forEach(media => {
      const slides = [...media.querySelectorAll('.work-slide')];
      slides.forEach((slide, index) => {
        slide.querySelector('.work-preview').addEventListener('click', () => previewModal.open(slides.map(item => item.querySelector('img')).filter(img => img && img.isConnected && !img.parentElement.hidden && img.getAttribute('src')), index));
      });
    });
    container.querySelectorAll('.work-media').forEach(media => {
      const slides = [...media.querySelectorAll('img')];
      if (slides.length < 2) return;
      let timer;
      const stop = () => { clearInterval(timer); timer = undefined; };
      const start = () => {
        if (document.body.classList.contains('preview-open')) return;
        stop();
        timer = setInterval(() => {
          const nextLeft = media.scrollLeft + media.clientWidth;
          media.scrollTo({ left: nextLeft >= media.scrollWidth - 1 ? 0 : nextLeft, behavior: 'smooth' });
        }, 3000);
      };
      media.addEventListener('pointerenter', start);
      media.addEventListener('pointerleave', stop);
      media.addEventListener('click', event => { if (event.target.closest('.work-preview')) stop(); });
      media.addEventListener('focusin', start);
      media.addEventListener('focusout', stop);
    });
    container.querySelectorAll('.work-media img').forEach(img => {
      const hideUnavailableImage = () => { img.parentElement.hidden = true; };
      img.addEventListener('error', hideUnavailableImage, { once: true });
      if (img.complete && img.naturalWidth === 0) hideUnavailableImage();
    });
  }

  function getImagePreviewModal() {
    let modal = document.getElementById('image-preview-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'image-preview-modal';
      modal.className = 'image-preview-modal';
      modal.hidden = true;
      modal.innerHTML = '<div class="image-preview-backdrop" data-close></div><div class="image-preview-dialog" role="dialog" aria-modal="true" aria-label="Image preview"><button class="image-preview-close" type="button" aria-label="Close preview" data-close>&times;</button><button class="image-preview-prev" type="button" aria-label="Previous image">&#8249;</button><img class="image-preview-image" alt=""><button class="image-preview-next" type="button" aria-label="Next image">&#8250;</button><div class="image-preview-count" aria-live="polite"></div></div>';
      document.body.appendChild(modal);
    }
    const image = modal.querySelector('.image-preview-image');
    const count = modal.querySelector('.image-preview-count');
    let items = [], current = 0, previousFocus;
    const show = index => {
      if (!items.length) return false;
      current = (index + items.length) % items.length;
      image.src = items[current].src;
      image.alt = items[current].alt;
      count.textContent = `${current + 1} / ${items.length}`;
      modal.querySelector('.image-preview-prev').hidden = items.length < 2;
      modal.querySelector('.image-preview-next').hidden = items.length < 2;
      return true;
    };
    const close = () => { modal.hidden = true; document.body.classList.remove('preview-open'); if (previousFocus) previousFocus.focus(); };
    modal.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', close));
    modal.querySelector('.image-preview-prev').addEventListener('click', () => show(current - 1));
    modal.querySelector('.image-preview-next').addEventListener('click', () => show(current + 1));
    document.addEventListener('keydown', event => {
      if (modal.hidden) return;
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') show(current - 1);
      if (event.key === 'ArrowRight') show(current + 1);
    });
    return { open(images, index) { items = images.filter(img => img && img.isConnected && img.getAttribute('src')); if (!items.length) return; previousFocus = document.activeElement; if (!show(Math.min(index, items.length - 1))) return; modal.hidden = false; document.body.classList.add('preview-open'); modal.querySelector('.image-preview-close').focus(); } };
  }


  function renderInfrastructurePreview(infraList) {
    const container = document.getElementById('infrastructure-container');
    if (!container) return;

    let html = '';
    const previewList = infraList.slice(0, 3); // Preview top 3
    
    previewList.forEach(item => {
      // Tech tags HTML
      let tagsHtml = item.technologies.slice(0, 5).map(tech => `<span class="badge bg-dark me-1 mb-1"><i class="fas fa-layer-group me-1"></i>${tech}</span>`).join('');
      if (item.technologies.length > 5) {
        tagsHtml += `<span class="badge bg-secondary me-1 mb-1">+${item.technologies.length - 5} more</span>`;
      }

      html += `
        <div class="col-lg-10 mb-4">
          <div class="project-card d-flex flex-column" style="padding: 2rem; background: var(--bg-card); border-left: 4px solid var(--accent-color);">
            <div class="mb-2">
              <span class="badge bg-secondary mb-2">${item.category.toUpperCase()}</span>
            </div>
            <h4 class="fw-bold mb-3" style="color: var(--text-primary);">${item.title}</h4>
            <p style="color: var(--text-secondary); line-height: 1.6;">${item.summary}</p>
            <div class="mb-4 mt-2">
              ${tagsHtml}
            </div>
            <div class="mt-auto">
              <a href="infrastructure/${item.slug}/index.html" class="fw-bold" style="color: var(--accent-color); text-decoration: none;">View Case Study &rarr;</a>
            </div>
          </div>
        </div>
      `;
    });
    
    container.innerHTML = html;
  }
