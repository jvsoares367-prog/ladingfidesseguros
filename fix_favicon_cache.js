const fs = require('fs');
const path = require('path');

const dir = 'c:/ANTIGRAVITY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('temp'));

for (const file of files) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    // Add cache buster ?v=2 to ensure the CDN fetches the newest image and ignores the 404 cache
    content = content.replace(/href="assets\/favicon\.png"/gi, 'href="assets/favicon.png?v=2"');
    
    fs.writeFileSync(fullPath, content, 'utf8');
}
