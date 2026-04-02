const fs = require('fs');
const path = require('path');

const dir = 'c:/ANTIGRAVITY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('temp'));

const oldTitle = 'FIDES SEGUROS | Consultoria Premium de Seguros';
const oldDescription = 'Consultoria de elite para quem busca proteção superior e atendimento personalizado. Otimizamos seus custos com as maiores seguradoras do país.';

const metaTags = `
    <!-- SEO Meta Tags -->
    <meta name="description" content="${oldDescription}">
    <meta property="og:title" content="${oldTitle}">
    <meta property="og:description" content="${oldDescription}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://grupofidesseguros.com.br/">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${oldTitle}">
    <meta name="twitter:description" content="${oldDescription}">`;

for (const file of files) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    // Remove old SEO tags if they exist to prevent duplicates
    content = content.replace(/<!-- SEO Meta Tags -->[\s\S]*?<meta name="twitter:description".*?>/gi, '');
    
    // Clean up loose meta tags if they were dangling
    content = content.replace(/<meta name="description".*?>\r?\n?/gi, '');
    content = content.replace(/<meta property="og:.*?>\r?\n?/gi, '');
    content = content.replace(/<meta name="twitter:.*?>\r?\n?/gi, '');

    // the <title> tag replacement
    // First, let's find the existing title and replace it along with appending the new meta tags right after
    const existingTitleMatch = content.match(/<title>.*?<\/title>/i);
    if (existingTitleMatch) {
        content = content.replace(existingTitleMatch[0], `<title>${oldTitle}</title>\n${metaTags}`);
    } else {
        // If there is no title tag, put it before </head>
        content = content.replace('</head>', `<title>${oldTitle}</title>\n${metaTags}\n</head>`);
    }

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Reverted meta descriptions and title in ${file}`);
}
