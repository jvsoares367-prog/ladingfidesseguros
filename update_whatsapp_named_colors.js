const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let originalContent = content;

    // Replace green tailwind classes configured as "whatsapp" with primary (blue)
    content = content.replace(/bg-whatsapp/g, 'bg-primary');
    content = content.replace(/text-whatsapp/g, 'text-primary');
    content = content.replace(/border-whatsapp/g, 'border-primary');
    content = content.replace(/border-t-whatsapp/g, 'border-t-primary');
    content = content.replace(/shadow-whatsapp\/([0-9]+)/g, 'shadow-primary/$1');
    content = content.replace(/shadow-whatsapp/g, 'shadow-primary');
    content = content.replace(/hover:bg-whatsapp-dark/g, 'hover:bg-primary-hover');
    content = content.replace(/hover:bg-whatsapp\/90/g, 'hover:bg-primary/90');
    content = content.replace(/hover:text-whatsapp/g, 'hover:text-primary');

    if (content !== originalContent) {
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Updated 'whatsapp' color classes in ${file}`);
    }
});
