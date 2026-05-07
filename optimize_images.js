const fs = require('fs');
const path = require('path');

const dir = 'c:/ANTIGRAVITY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('temp'));

for (const file of files) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    // Add loading="lazy" to all img tags that don't already have it
    // Exception: images in the header or logo, which shouldn't be lazy loaded for LCP reasons.
    content = content.replace(/<img(.*?)>/gi, (match, p1) => {
        if (p1.includes('loading="lazy"')) return match; // already has it
        
        // Don't lazy load the main header logo 
        if (p1.includes('fides_logo_oficial.png')) return `<img${p1} decoding="async">`;

        return `<img${p1} loading="lazy" decoding="async">`;
    });
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Optimized images in ${file}`);
}
