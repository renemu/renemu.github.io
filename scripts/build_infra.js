const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const dataJs = fs.readFileSync(path.join(__dirname, '../data.js'), 'utf8');

const jsCode = dataJs.replace('const portfolioData =', 'module.exports =');
fs.writeFileSync(path.join(__dirname, 'temp_data.js'), jsCode);
const portfolioData = require('./temp_data.js');
fs.unlinkSync(path.join(__dirname, 'temp_data.js'));

const infraList = portfolioData.infrastructure;

const headMatch = indexHtml.match(/<head>([\s\S]*?)<\/head>/);
const headTemplate = headMatch ? headMatch[1] : '';
const navMatch = indexHtml.match(/<!-- Navbar -->([\s\S]*?)<!--End Navbar-->/);
const navTemplate = navMatch ? navMatch[1] : '';
const footerMatch = indexHtml.match(/<!-- Footer -->([\s\S]*?)<!-- End Footer -->/);
const footerTemplate = footerMatch ? footerMatch[1] : '';
const scriptsMatch = indexHtml.match(/<!-- Option 1: Bootstrap Bundle with Popper -->([\s\S]*?)<\/body>/);
const scriptsTemplate = scriptsMatch ? scriptsMatch[1].replace('</body>', '') : '';

function fixPaths(html, depth) {
  let prefix = '';
  for(let i=0; i<depth; i++) prefix += '../';
  return html
    .replace(/href="favicon\.ico"/g, `href="${prefix}favicon.ico"`)
    .replace(/href="style\.css"/g, `href="${prefix}style.css"`)
    .replace(/src="data\.js"/g, `src="${prefix}data.js"`)
    .replace(/src="script\.js"/g, `src="${prefix}script.js"`)
    .replace(/href="#(home|about|tech-stack|experience|project|infrastructure|contact)"/g, `href="${prefix}index.html#$1"`);
}

function buildPage(title, description, bodyContent, depth) {
  const customHead = fixPaths(headTemplate, depth)
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`);
  return `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    ${customHead}\n    <style>\n      body { padding-top: 76px; background: var(--bg-primary); }\n      .case-study-hero { background: var(--bg-secondary); padding: 5rem 0; border-bottom: 1px solid var(--border-color); }\n      .case-study-content { padding: 4rem 0; color: var(--text-secondary); line-height: 1.8; }\n      .case-study-content h2, .case-study-content h3 { color: var(--text-primary); font-weight: 600; margin-top: 2rem; margin-bottom: 1rem; }\n      .case-study-content ul { padding-left: 1.2rem; }\n      .case-study-content li { margin-bottom: 0.5rem; }\n      .arch-diagram { display: flex; flex-direction: column; align-items: center; gap: 0.8rem; background: var(--bg-card); padding: 2rem; border-radius: 10px; border: 1px solid var(--border-color); margin: 2rem 0; font-family: monospace; }\n      .arch-node { background: var(--bg-secondary); padding: 0.8rem 1.5rem; border-radius: 8px; border: 1px solid var(--accent-color); color: var(--text-primary); text-align: center; width: 100%; max-width: 300px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }\n      .arch-arrow { color: var(--text-secondary); font-size: 1.5rem; }\n      \n    </style>\n  </head>\n  <body id="home" data-theme="dark">\n    <!-- Navbar -->\n    ${fixPaths(navTemplate, depth)}\n    <!--End Navbar-->\n    ${bodyContent}\n    <!-- Footer -->\n    ${fixPaths(footerTemplate, depth)}\n    <!-- End Footer -->\n    ${fixPaths(scriptsTemplate, depth)}\n  </body>\n</html>`;
}

const infraDir = path.join(__dirname, '../infrastructure');
if (!fs.existsSync(infraDir)) fs.mkdirSync(infraDir);

let listHtml = `<section class="case-study-hero text-center"><div class="container"><h1 class="display-4 fw-bold" style="color: var(--text-primary);">Infrastructure & DevOps</h1><p class="lead mt-3 mx-auto" style="max-width: 800px; color: var(--text-secondary);">Systems, deployment workflows, and infrastructure architectures I designed to solve real operational problems.</p></div></section><section style="padding: 4rem 0;"><div class="container"><div class="row justify-content-center">`;
infraList.forEach(item => {
  let tagsHtml = item.technologies.slice(0, 6).map(tech => `<span class="badge bg-dark me-1 mb-1"><i class="fas fa-layer-group me-1"></i>${tech}</span>`).join('');
  if (item.technologies.length > 6) tagsHtml += `<span class="badge bg-secondary me-1 mb-1">+${item.technologies.length - 6} more</span>`;
  listHtml += `<div class="col-lg-10 mb-5"><div class="project-card d-flex flex-column" style="padding: 2.5rem; background: var(--bg-card); border-left: 4px solid var(--accent-color);"><div class="mb-2"><span class="badge bg-secondary mb-2">${item.category.toUpperCase()}</span></div><h3 class="fw-bold mb-3" style="color: var(--text-primary);">${item.title}</h3><p style="color: var(--text-secondary); line-height: 1.6; font-size: 1.1rem;">${item.summary}</p><div class="mb-4 mt-2">${tagsHtml}</div><div class="mt-auto"><a href="${item.slug}/index.html" class="fw-bold" style="color: var(--accent-color); text-decoration: none; font-size: 1.1rem;">View Case Study &rarr;</a></div></div></div>`;
});
listHtml += `</div></div></section>`;
fs.writeFileSync(path.join(infraDir, 'index.html'), buildPage('Infrastructure & DevOps | Muhammad Rifki Zulfikar', 'Infrastructure engineering case studies.', listHtml, 1));

infraList.forEach(item => {
  const detailDir = path.join(infraDir, item.slug);
  if (!fs.existsSync(detailDir)) fs.mkdirSync(detailDir);
  let archHtml = '';
  if (item.architecture) {
    const nodes = item.architecture.desktop.map(n => `<div class="arch-node">${n.replace(/(?:\\n|\n)/g, '<br/>')}</div>`).join('\n<div class="arch-arrow">&darr;</div>\n');
    archHtml = `<h3 class="mt-5 mb-4 border-bottom pb-2" style="border-color: var(--border-color) !important;">Architecture</h3><div class="arch-diagram">${nodes}</div>`;
  }
  const arrayToHtmlList = (arr) => `<ul>${arr.map(i => `<li>${i}</li>`).join('')}</ul>`;
  let detailHtml = `<section class="case-study-hero"><div class="container"><a href="../index.html" class="text-decoration-none mb-4 d-inline-block" style="color: var(--accent-color);">&larr; Back to Infrastructure</a><div class="mb-3"><span class="badge bg-primary px-3 py-2 fs-6">${item.category}</span></div><h1 class="display-4 fw-bold" style="color: var(--text-primary);">${item.title}</h1><p class="lead mt-3" style="max-width: 800px; color: var(--text-secondary);">${item.summary}</p><div class="mt-4"><h5 class="mb-3" style="color: var(--text-primary); font-weight: 600;">Technologies Used:</h5>${item.technologies.map(t => `<span class="badge bg-dark me-2 mb-2 px-3 py-2 border border-secondary" style="font-size: 0.9rem;">${t}</span>`).join('')}</div></div></section><section class="case-study-content"><div class="container"><div class="row justify-content-center"><div class="col-lg-8"><h3 class="mb-3 border-bottom pb-2" style="border-color: var(--border-color) !important;">Overview</h3><p>${item.overview}</p><h3 class="mt-5 mb-3 border-bottom pb-2" style="border-color: var(--border-color) !important;">Challenge & Existing Condition</h3>${arrayToHtmlList(item.challenge)}<h3 class="mt-5 mb-3 border-bottom pb-2" style="border-color: var(--border-color) !important;">Engineering Decision & Solution</h3>${arrayToHtmlList(item.solution)}${archHtml}<h3 class="mt-5 mb-3 border-bottom pb-2" style="border-color: var(--border-color) !important;">Implementation & Responsibilities</h3>${arrayToHtmlList(item.responsibilities)}<h3 class="mt-5 mb-3 border-bottom pb-2" style="border-color: var(--border-color) !important;">Result</h3>${arrayToHtmlList(item.result)}${item.futureImprovements ? `<h3 class="mt-5 mb-3 border-bottom pb-2" style="border-color: var(--border-color) !important;">Future Improvements</h3>${arrayToHtmlList(item.futureImprovements)}` : ''}</div></div></div></section>`;
  fs.writeFileSync(path.join(detailDir, 'index.html'), buildPage(`${item.title} | Infrastructure`, item.summary, detailHtml, 2));
});
