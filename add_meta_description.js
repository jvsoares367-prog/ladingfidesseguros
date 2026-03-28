const fs = require('fs');
const path = require('path');

const dir = 'c:/ANTIGRAVITY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('temp'));

const newDescription = 'Grupo Fides Seguros: experiência e confiança para proteger você, sua família e sua empresa com as melhores soluções em seguros do mercado.';
const newTitle = 'Grupo Fides - Corretora de Seguros';

const metaTags = `
    <!-- SEO Meta Tags -->
    <meta name="description" content="${newDescription}">
    <meta property="og:title" content="${newTitle}">
    <meta property="og:description" content="${newDescription}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://grupofidesseguros.com.br/">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${newTitle}">
    <meta name="twitter:description" content="${newDescription}">
`;

for (const file of files) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    // First remove any existing meta description, og:description, etc just in case
    content = content.replace(/<meta name="description".*?>/gi, '');
    content = content.replace(/<meta property="og:description".*?>/gi, '');
    content = content.replace(/<meta property="og:title".*?>/gi, '');
    content = content.replace(/<meta property="og:url".*?>/gi, '');
    content = content.replace(/<meta name="twitter:description".*?>/gi, '');
    content = content.replace(/<meta name="twitter:title".*?>/gi, '');
    content = content.replace(/<!-- SEO Meta Tags -->/gi, '');

    // The user has <title>Grupo Fides - Corretora de Seguros</title>. We insert right below title.
    content = content.replace(/<title>.*?<\/title>/gi, match => `${match}\n${metaTags}`);

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated meta descriptions in ${file}`);
}
