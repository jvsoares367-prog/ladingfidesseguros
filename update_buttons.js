const fs = require('fs');
const path = require('path');

const dir = '.';
const files = ['sobre-nos.html', 'suporte.html'];

const whatsappLink = 'https://wa.me/5521995888291?text=Quero%20fazer%20uma%20cotacao';

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let originalContent = content;

    // Convert <button class="...">Falar no WhatsApp</button> into <a href="..." class="...">Falar no WhatsApp</a>
    const btnRegex = /<button([^>]*?)>([\s\S]*?(?:WhatsApp|Consultor)[\s\S]*?)<\/button>/gi;
    content = content.replace(btnRegex, (match, before, innerHtml) => {
        return `<a href="${whatsappLink}"${before}>${innerHtml}</a>`;
    });

    if (content !== originalContent) {
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Updated buttons in ${file}`);
    }
});
