const fs = require('fs');
const path = require('path');

const dir = 'c:/ANTIGRAVITY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('temp'));

for (const file of files) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    // Remove old favicon link
    content = content.replace(/<link rel="icon".*?>/gi, '<link rel="icon" type="image/png" href="assets/fides-favicon.png">');
    
    fs.writeFileSync(fullPath, content, 'utf8');
}
