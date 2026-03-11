const fs = require('fs');
const path = require('path');

const dir = '.';
const files = ['sobre-nos.html', 'suporte.html', 'index.html'];

const whatsappLink = 'https://wa.me/5521995888291?text=Quero%20fazer%20uma%20cotacao';

const hrefTargets = {
    'Saúde Empresarial': 'saude-empresarial.html',
    'Saúde Individual': 'saude-individual.html',
    'Seguro de Frota': 'seguro-frota.html',
    'Seguro de Vida VIP': 'seguro-vida.html',
    'Sobre a Corretora': 'sobre-nos.html',
    'Sobre Nós': 'sobre-nos.html',
    'Compliance': 'compliance.html',
    'LGPD': 'lgpd.html',
    'FAQ': 'suporte.html',
    'Suporte': 'suporte.html',
    'Serviços': 'index.html#servicos',
    'Cotação Gratuita': 'cotacao.html',
    'Início': 'index.html',
    'Contato': whatsappLink,
    'Nossos Clientes': 'index.html#depoimentos'
};

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let originalContent = content;

    // 1. Fix <a> tags with text containing WhatsApp, Falar, Cotação etc, but that currently have a different href
    const aRegex = /<a([^>]*?)href=["'][^"']*["']([^>]*?)>([\s\S]*?)<\/a>/gi;
    content = content.replace(aRegex, (match, before, after, inner) => {
        let text = inner.toLowerCase();
        if (text.includes('whatsapp') || text.includes('falar com consultor') || text.includes('consultoria vip') || text.includes('iniciar conversa')) {
            return `<a${before}href="${whatsappLink}"${after}>${inner}</a>`;
        }
        return match;
    });

    // Replace href based on inner text using [\s\S]*? for multi-line support
    for (const [key, target] of Object.entries(hrefTargets)) {
        const regex = new RegExp(`<a([^>]*?)href=["']([^"']*)["']([^>]*?)>([\\s\\S]*?${key}[\\s\\S]*?)<\\/a>`, 'gi');
        content = content.replace(regex, (match, before, oldHref, after, innerHtml) => {
            if (innerHtml.toLowerCase().includes('whatsapp')) return match; // skip if we just fixed it
            return `<a${before}href="${target}"${after}>${innerHtml}</a>`;
        });
    }

    // Wrap header logo in link if it's not already
    const divLogoRegexMobile = /<div class="flex items-center gap-2">\s*<span class="material-symbols-outlined[^>]*>shield_with_heart<\/span>\s*<h1[^>]*>Fides Seguros<\/h1>\s*<\/div>/gi;
    content = content.replace(divLogoRegexMobile, (match) => {
        return `<a href="index.html" class="hover:opacity-80 transition-opacity">\n${match}\n</a>`;
    });

    const logoRe = /<a([^>]*?)href=["'][^"']*["']([^>]*?)>(\s*<span[^>]*>fides<\/span>\s*<span[^>]*>seguros<\/span>\s*)<\/a>/gi;
    content = content.replace(logoRe, `<a$1href="index.html"$2>$3</a>`);

    if (content !== originalContent) {
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Updated links in ${file}`);
    }
});
