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
        target.scrollIntoView({
          behavior: "smooth",
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

    let html = `
      <div class="col-md-12 mb-4">
        <div class="about-card" style="text-align: left;">
    `;
    
    about.paragraphs.forEach(p => {
      html += `<p>${p}</p>`;
    });
    
    html += `
          <br/>
          <h5 style="font-weight: 600; color: var(--text-primary);">Core Competencies:</h5>
          <ul>
    `;
    
    about.core_competencies.forEach(comp => {
      html += `
            <li style="margin-bottom: 0.5rem;">
              <strong>${comp.title}:</strong> ${comp.description}
            </li>
      `;
    });
    
    html += `
          </ul>
          <br/>
          <p>
            I am driven by a passion for solving complex technical challenges, adapting to new technologies, and building systems that are both reliable and scalable.
          </p>
        </div>
      </div>
    `;
    
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

  function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    if (!container) return;

    let html = '';
    
    if (projects.length === 0) {
      html = '<div class="col-12 text-center text-muted my-5"><h5>No projects found matching your criteria.</h5></div>';
    }
    
    projects.forEach(p => {
      let linkAttr = p.link ? `href="${p.link}" target="_blank"` : `href="javascript:void(0)" style="cursor: default;"`;
      html += `
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="project-card h-100">
            <a ${linkAttr} class="text-decoration-none text-reset d-block h-100">
              <div class="project-img-wrapper">
                <img src="${p.image}" class="project-img" alt="${p.title}" />
                ${p.link ? `<div class="project-overlay"><i class="fas fa-external-link-alt"></i></div>` : ''}
              </div>
              <div class="project-content d-flex flex-column text-center">
                <div class="mb-2">
                  <span class="badge bg-primary me-1 mb-1">${p.year}</span>
                  <span class="badge bg-secondary me-1 mb-1">${p.category}</span>
                  <span class="badge bg-info text-dark me-1 mb-1">${p.role}</span>
                </div>
                <h5 class="fw-bold mb-2">${p.title}</h5>
                <div class="mb-3"><span class="badge bg-dark me-1"><i class="fas fa-layer-group me-1"></i>${p.techStack}</span></div>
                <p class="project-text mt-auto">${p.description}</p>
              </div>
            </a>
          </div>
        </div>
      `;
    });
    
    container.innerHTML = html;
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
