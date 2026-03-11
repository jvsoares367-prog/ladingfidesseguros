const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let originalContent = content;

    // Fix the "WhatsApp" / "Falar com Consultor" buttons that have class `bg-primary` (the blue ones)
    content = content.replace(/<a([^>]*?)href=["'][^"']*["']([^>]*class=["'][^"']*bg-primary[^"']*["'][^>]*?)>([\s\S]*?(?:WhatsApp|Falar com Consultor|Whatsapp)[\s\S]*?)<\/a>/gi,
        `<a$1href="https://wa.me/5521995888291?text=Quero%20fazer%20uma%20cotacao"$2>$3</a>`
    );

    // Also fix the logo linking back to index.html (the script made it cotacao.html by accident somehow)
    const logoRegex = /<a([^>]*?)href=["'][^"']*["']([^>]*?)>(\s*<span[^>]*>fides<\/span>\s*<span[^>]*>seguros<\/span>\s*)<\/a>/gi;
    content = content.replace(logoRegex, `<a$1href="index.html"$2>$3</a>`);

    // Fix 'Sobre Nós' that were accidentally linked to index.html#servicos due to regex
    content = content.replace(/<a([^>]*?)href=["']index\.html#servicos["']([^>]*?)>Sobre Nós<\/a>/gi, `<a$1href="sobre-nos.html"$2>Sobre Nós</a>`);

    if (content !== originalContent) {
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Updated WhatsApp & fixes in ${file}`);
    }
});
