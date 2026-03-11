const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let originalContent = content;

    // Fix Suporte and FAQ links everywhere to point exactly to "suporte.html" instead of "index.html#faq"
    const regex1 = /<a([^>]*?)href=["']([^"']*)["']([^>]*?)>([\s\S]*?(?:Suporte|FAQ)[\s\S]*?)<\/a>/gi;
    content = content.replace(regex1, (match, before, oldHref, after, innerHtml) => {
        return `<a${before}href="suporte.html"${after}>${innerHtml}</a>`;
    });

    if (content !== originalContent) {
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Updated Suporte links in ${file}`);
    }
});
