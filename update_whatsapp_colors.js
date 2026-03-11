const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let originalContent = content;

    // Replace green tailwind classes with primary (blue)
    content = content.replace(/bg-\[#25D366\]\/([0-9]+)/g, 'bg-primary/$1');
    content = content.replace(/bg-\[#25D366\]/g, 'bg-primary');
    content = content.replace(/text-\[#25D366\]/g, 'text-primary');
    content = content.replace(/border-\[#25D366\]\/([0-9]+)/g, 'border-primary/$1');
    content = content.replace(/border-\[#25D366\]/g, 'border-primary');
    content = content.replace(/border-t-\[#25D366\]/g, 'border-t-primary');
    content = content.replace(/border-t-\[#25D366\]\/([0-9]+)/g, 'border-t-primary/$1');
    content = content.replace(/shadow-\[#25D366\]\/([0-9]+)/g, 'shadow-primary/$1');
    content = content.replace(/hover:bg-\[#20bd5a\]/g, 'hover:bg-primary/90');
    content = content.replace(/hover:text-\[#25D366\]/g, 'hover:text-primary');
    content = content.replace(/ring-\[#25D366\]/g, 'ring-primary');

    if (content !== originalContent) {
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Updated WhatsApp colors in ${file}`);
    }
});
