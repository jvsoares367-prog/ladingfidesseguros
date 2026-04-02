const fs = require('fs');
const path = require('path');

const dir = 'c:/ANTIGRAVITY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('temp'));

const correctTitle = 'Grupo Fides - Corretora de Seguros';
const correctDescription = 'Grupo Fides Seguros: experiência e confiança para proteger você, sua família e sua empresa com as melhores soluções em seguros do mercado.';

const metaTags = `
    <!-- SEO Meta Tags -->
    <meta name="description" content="${correctDescription}">
    <meta property="og:title" content="${correctTitle}">
    <meta property="og:description" content="${correctDescription}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://grupofidesseguros.com.br/">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${correctTitle}">
    <meta name="twitter:description" content="${correctDescription}">`;

for (const file of files) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    // Remove seo block
    content = content.replace(/<!-- SEO Meta Tags -->[\s\S]*?<meta name="twitter:description".*?>/gi, '');
    
    // Clean any loose meta tags
    content = content.replace(/<meta name="description".*?>\r?\n?/gi, '');
    content = content.replace(/<meta property="og:.*?>\r?\n?/gi, '');
    content = content.replace(/<meta name="twitter:.*?>\r?\n?/gi, '');

    // replace title with correct one and add meta tags
    const existingTitleMatch = content.match(/<title>.*?<\/title>/i);
    if (existingTitleMatch) {
        content = content.replace(existingTitleMatch[0], `<title>${correctTitle}</title>\n${metaTags}`);
    } else {
        content = content.replace('</head>', `<title>${correctTitle}</title>\n${metaTags}\n</head>`);
    }

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Applied crafted meta descriptions and title in ${file}`);
}
