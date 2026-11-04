const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const data = vm.runInNewContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8') + '\nportfolioData;');
const infraList = data.infrastructure;
const extract = pattern => indexHtml.match(pattern)?.[1] || '';
const head = extract(/<head>([\s\S]*?)<\/head>/).replace(/<!-- SEO:start -->[\s\S]*?<!-- SEO:end -->/g, '');
const nav = extract(/<!-- Navbar -->([\s\S]*?)<!--End Navbar-->/);
const footer = extract(/<!-- Footer -->([\s\S]*?)<!-- End Footer -->/);
const scripts = extract(/<!-- Option 1: Bootstrap Bundle with Popper -->([\s\S]*?)<\/body>/);
const escape = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const tags = items => `<div class="infra-tags">${items.map(t => `<span>${escape(t)}</span>`).join('')}</div>`;
const list = items => `<ul>${items.map(t => `<li>${escape(t)}</li>`).join('')}</ul>`;
function fixPaths(html, depth) {
  const prefix = '../'.repeat(depth);
  return html.replace(/href="(favicon.ico|style.css|portfolio.css)"/g, `href="${prefix}$1"`)
    .replace(/src="(data.js|script.js)"/g, `src="${prefix}$1"`)
    .replace(/href="#(home|about|tech-stack|experience|project|infrastructure|contact)"/g, `href="${prefix}index.html#$1"`);
}
function buildPage(title, description, content, depth) {
  const pageHead = fixPaths(head, depth).replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escape(description)}" />`);
  const pageNav = fixPaths(nav, depth).replace('aria-current="page"', '')
    .replace(/class="nav-link" href="[^"]+#infrastructure"/, `class="nav-link active" aria-current="page" href="${depth === 1 ? '' : '../'}index.html"`);
  return `<!DOCTYPE html>
<html lang="en"><head>${pageHead}<link rel="stylesheet" href="${depth === 1 ? '' : '../'}infrastructure.css"></head>
<body id="home" class="portfolio-page infrastructure-page">
<a class="skip-link" href="#main-content">Skip to content</a>
${pageNav}<main id="main-content">${content}</main>${fixPaths(footer, depth)}${fixPaths(scripts, depth)}
</body></html>\n`;
}
const infraDir = path.join(root, 'infrastructure');
fs.mkdirSync(infraDir, { recursive: true });
const cards = infraList.map((item, i) => `<article class="infra-card">
  <div class="infra-card-top"><span class="section-kicker">CASE STUDY / 0${i + 1}</span><i class="fas fa-server" aria-hidden="true"></i></div>
  <p class="infra-category">${escape(item.category)}</p><h2>${escape(item.title)}</h2>
  <p>${escape(item.summary)}</p>${tags(item.technologies)}
  <a class="infra-card-link" href="${item.slug}/index.html">Explore case study <span aria-hidden="true">↗</span><span class="visually-hidden">: ${escape(item.title)}</span></a>
</article>`).join('\n');
fs.writeFileSync(path.join(infraDir, 'index.html'), buildPage('Infrastructure & DevOps | Muhammad Rifki Zulfikar', 'Infrastructure engineering case studies.', `
<header class="infra-hero"><div class="container">
<a class="infra-back" href="../index.html">← Back to portfolio</a>
<p class="section-kicker">BEHIND THE APPLICATIONS</p><h1>Infrastructure<br><span>&amp; DevOps.</span></h1>
<p class="infra-intro">Systems, deployment workflows, and infrastructure architectures I designed to solve real operational problems.</p>
<div class="infra-hero-bottom"><span>${infraList.length} ENGINEERING CASE STUDIES</span><span>LINUX / NETWORKING / CI/CD</span></div>
</div></header><div class="container infra-grid">${cards}</div>`, 1));
infraList.forEach((item, index) => {
  const sections = [
    ['overview', 'Overview', `<p>${escape(item.overview)}</p>`],
    ['challenge', 'The challenge', list(item.challenge)],
    ['solution', 'Engineering decisions', list(item.solution)],
  ];
  if (item.architecture) sections.push(['architecture', 'System architecture', `<ol class="arch-diagram">${item.architecture.desktop.map(n => `<li class="arch-node">${escape(n).replace(/(?:\\n|\n)/g, '<br>')}</li>`).join('')}</ol>`]);
  sections.push(['implementation', 'Implementation & responsibilities', list(item.responsibilities)], ['results', 'Results & impact', list(item.result)]);
  if (item.futureImprovements) sections.push(['next-steps', 'Next steps', list(item.futureImprovements)]);
  const contents = sections.map(([id, title], i) => `<a href="#${id}"><span>0${i + 1}</span>${title}</a>`).join('');
  const body = sections.map(([id, title, content], i) => `<section id="${id}" class="case-section ${id === 'results' ? 'case-results' : ''}"><p class="section-kicker">0${i + 1} / ${id.toUpperCase()}</p><h2>${title}</h2>${content}</section>`).join('\n');
  const next = infraList[(index + 1) % infraList.length];
  const content = `<header class="infra-hero"><div class="container"><a class="infra-back" href="../index.html">← All case studies</a>
<p class="section-kicker">CASE STUDY / 0${index + 1} — ${escape(item.category)}</p><h1>${escape(item.title)}</h1>
<p class="infra-intro">${escape(item.summary)}</p>${tags(item.technologies)}</div></header>
<div class="container case-layout"><aside class="case-sidebar"><nav aria-label="On this page"><p class="section-kicker">ON THIS PAGE</p>${contents}</nav></aside><article class="case-article">${body}
<a class="next-case" href="../${next.slug}/index.html"><span>EXPLORE NEXT</span><strong>${escape(next.title)} ↗</strong></a></article></div>`;
  const dir = path.join(infraDir, item.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), buildPage(`${item.title} | Infrastructure`, item.summary, content, 2));
});
console.log(`Built infrastructure index and ${infraList.length} case studies.`);
