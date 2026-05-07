const fs = require('fs');
const path = require('path');

const dir = 'c:/ANTIGRAVITY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('temp') && f !== '404.html');

const oldPixelId = '330955319794947';
const newPixelId = '706703514613089';

for (const file of files) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    if (content.includes(oldPixelId)) {
        // Global replace in the string
        content = content.replace(new RegExp(oldPixelId, 'g'), newPixelId);
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated Pixel ID in ${file}`);
    }
}
console.log("All HTML files updated successfully with new Pixel ID.");
