const fs = require('fs');
const path = require('path');

const dir = 'C:\\ANTIGRAVITY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

for (const file of files) {
    const p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf8');

    // Replace the logo string. The scale may make it look weird if it's horizontal, but the user said "só altere isso em todas as paginas, o restante deixe como está", so we literally just swap the filename.
    if (content.includes('assets/fides_logo_vertical.png')) {
        content = content.replace(/assets\/fides_logo_vertical\.png/g, 'assets/fides_logo_oficial.png');
        fs.writeFileSync(p, content, 'utf8');
        console.log(`Updated logo in ${file}`);
        updatedCount++;
    }
}

console.log(`Done replacing logo in ${updatedCount} files.`);
