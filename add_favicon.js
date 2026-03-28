const fs = require('fs');
const path = require('path');

const dir = 'c:/ANTIGRAVITY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('temp'));

const faviconTag = '\n    <link rel="icon" type="image/png" href="assets/favicon.png">';

for (const file of files) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    // previne duplicação se rodar 2 vezes
    content = content.replace(/<link rel="icon".*?>/gi, '');

    // Insere perto do title
    content = content.replace(/<title>/i, match => `${faviconTag}\n    ${match}`);

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Added favicon link to ${file}`);
}
