// Run after editing data.js or page templates: node scripts/build_site.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');
const origin = 'https://renemu.github.io';
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, text) => fs.writeFileSync(path.join(root, file), text.replace(/[ \t]+$/gm, '')); 
const escape = value => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Reuse the browser renderers so static content and interactive cards stay identical.
const ids = ['about-container', 'tech-stack-container', 'experience-container', 'projects-container', 'infrastructure-container'];
const containers = Object.fromEntries(ids.map(id => [id, { innerHTML: '', querySelectorAll: () => [] }]));
const context = { console, localStorage: { getItem: () => null }, document: {
  documentElement: { setAttribute() {} }, addEventListener() {},
  getElementById: id => containers[id] || null
} };
vm.createContext(context);
vm.runInContext(read('data.js') + '\n' + read('script.js'), context);
const data = vm.runInContext('portfolioData', context);
let home = read('index.html');
for (const id of ids) {
  const marker = new RegExp(`<!-- static:${id}:start -->[\\s\\S]*?<!-- static:${id}:end -->`);
  const content = `<!-- static:${id}:start -->${containers[id].innerHTML}<!-- static:${id}:end -->`;
  if (marker.test(home)) home = home.replace(marker, () => content);
  else {
    const placeholder = new RegExp(`(<div\\s+id="${id}"[^>]*>)(\\s*<!-- Content loaded from JSON -->)`);
    if (!placeholder.test(home)) throw new Error(`Missing static slot: ${id}`);
    home = home.replace(placeholder, (_, opening) => opening + content);
  }
}
write('index.html', home);
require('./build_infra.js');
const portraitPath = home.match(/<img\s+src="([^"]+)"/)?.[1];
if (!portraitPath || !fs.existsSync(path.join(root, portraitPath))) throw new Error('Homepage portrait is missing');
const portraitUrl = new URL(portraitPath, origin + '/').href;
const person = { '@type': 'Person', '@id': origin + '/#person', name: 'Muhammad Rifki Zulfikar', url: origin + '/', jobTitle: 'Software Engineer', image: portraitUrl, sameAs: ['https://github.com/renemu', 'https://www.linkedin.com/in/muhammad-rifki-zulfikar-4243a9144', 'https://www.instagram.com/tuan_zuli/'] };
const pages = [
  { file: 'index.html', url: origin + '/', title: 'Muhammad Rifki Zulfikar | Software Engineer & Fullstack Developer', description: 'Explore Muhammad Rifki Zulfikar’s portfolio: fullstack web applications, IoT systems, Linux infrastructure, Docker deployments, and CI/CD engineering.', type: 'ProfilePage' },
  { file: 'infrastructure/index.html', url: origin + '/infrastructure/', title: 'Infrastructure & DevOps Case Studies | Muhammad Rifki Zulfikar', description: 'Explore engineering case studies covering Linux hosting, secure networking, large file uploads, and centralized Jenkins CI/CD deployments.', type: 'CollectionPage' },
  ...data.infrastructure.map(item => ({file: `infrastructure/${item.slug}/index.html`, url: `${origin}/infrastructure/${item.slug}/`, title: `${item.title} | Muhammad Rifki Zulfikar`, description: item.summary, type: 'TechArticle', item}))
];
for (const page of pages) {
  let html = read(page.file).replace(/<!-- SEO:start -->[\s\S]*?<!-- SEO:end -->\s*/g, '')
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, `<meta name="description" content="${escape(page.description)}" />`)
    .replace(/\s*<meta\s+name="keywords"[\s\S]*?\/?>/, '');
  const entity = { '@type': page.type, '@id': page.url + '#page', url: page.url, name: page.title, description: page.description, inLanguage: 'en', isPartOf: { '@id': origin + '/#website' } };
  if (page.type === 'ProfilePage') entity.mainEntity = { '@id': person['@id'] };
  if (page.item) Object.assign(entity, { headline: page.item.title, author: { '@id': person['@id'] }, mainEntityOfPage: page.url, about: page.item.technologies });
  const graph = [entity, person, { '@type': 'WebSite', '@id': origin + '/#website', name: 'Muhammad Rifki Zulfikar', alternateName: 'M Rifki Z', url: origin + '/' }];
  if (page.file !== 'index.html') {
    const crumbs = [{name:'Home',item:origin+'/'},{name:'Infrastructure & DevOps',item:origin+'/infrastructure/'}];
    if (page.item) crumbs.push({name:page.item.title,item:page.url});
    graph.push({'@type':'BreadcrumbList',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,...c}))});
  }
  const metadata = `<!-- SEO:start -->
    <link rel="canonical" href="${page.url}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="${page.item ? 'article' : 'website'}" />
    <meta property="og:site_name" content="Muhammad Rifki Zulfikar" />
    <meta property="og:title" content="${escape(page.title)}" />
    <meta property="og:description" content="${escape(page.description)}" />
    <meta property="og:url" content="${page.url}" />
    <meta property="og:image" content="${portraitUrl}" />
    <meta property="og:image:alt" content="Muhammad Rifki Zulfikar" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escape(page.title)}" />
    <meta name="twitter:description" content="${escape(page.description)}" />
    <meta name="twitter:image" content="${portraitUrl}" />
    <meta name="twitter:image:alt" content="Muhammad Rifki Zulfikar" />
    <script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c')}</script>
    <!-- SEO:end -->`;
  html = html.replace('</head>', `${metadata}\n  </head>`);
  write(page.file, html);
}
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p=>`  <url><loc>${p.url}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`Generated static portfolio content, SEO metadata, and sitemap for ${pages.length} pages.`);
