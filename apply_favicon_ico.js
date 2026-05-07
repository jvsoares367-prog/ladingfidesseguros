const fs = require('fs');
const path = require('path');

const dir = 'c:/ANTIGRAVITY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('temp') && f !== '404.html');

for (const file of files) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    // Replace the existing favicon tag with the correct ICO format
    // Also add shortcut icon for legacy browsers
    const strToMatch = /<link rel="icon"[^>]*?>/i;
    const newFaviconTag = `<link rel="icon" type="image/x-icon" href="assets/favicon.ico?v=final">\n    <link rel="shortcut icon" type="image/x-icon" href="assets/favicon.ico?v=final">`;
    
    if (strToMatch.test(content)) {
        content = content.replace(strToMatch, newFaviconTag);
    } else {
        // If not found, inject in head
        content = content.replace('</head>', `    ${newFaviconTag}\n</head>`);
    }

    fs.writeFileSync(fullPath, content, 'utf8');
}
console.log("Favicon ICO linked across all HTML files.");
