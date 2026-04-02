const fs = require('fs');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'temp_header.html');

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Convert specific H2 to H1. Only applies to pages missing H1
    if (file === 'saude-individual.html') {
        content = content.replace(/<h2 class="text-4xl font-black leading-\[1\.1\] text-slate-900 dark:text-white">([\s\S]*?)<\/h2>/, 
          '<h1 class="text-4xl font-black leading-[1.1] text-slate-900 dark:text-white">$1</h1>');
    }
    else if (file === 'seguro-frota.html') {
        content = content.replace(/<h2 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-\[1\.1\] tracking-tight">\s*((?:.|\n)*?)<\/h2>/i,
          '<h1 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">\n                    $1</h1>');
    }
    else if (file === 'suporte.html') {
        content = content.replace(/<h2 class="text-5xl font-bold text-slate-900 mb-6 tracking-tight">Suporte<\/h2>/,
          '<h1 class="text-5xl font-bold text-slate-900 mb-6 tracking-tight">Suporte</h1>');
    }

    // 2. Canonical tag
    // Only index.html has it natively, but earlier we replaced stuff and I shouldn't duplicate. We can remove old and re-inject.
    content = content.replace(/<link rel="canonical"[^>]+>/g, '');
    let canonicalTag = `\n    <link rel="canonical" href="https://grupofidesseguros.com.br/${file === 'index.html' ? '' : file}">\n`;
    content = content.replace('</head>', canonicalTag + '</head>');

    // 3. Add JSON-LD to index.html
    if (file === 'index.html' && !content.includes('application/ld+json')) {
        const jsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "InsuranceAgency",
      "name": "Grupo Fides Seguros",
      "url": "https://grupofidesseguros.com.br/",
      "logo": "https://grupofidesseguros.com.br/assets/fides_logo_oficial.png",
      "description": "Corretora especialista em seguros saúde e frota, protegendo você e sua empresa com agilidade VIP.",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+55-21-99588-8291",
        "contactType": "customer support",
        "availableLanguage": "Portuguese"
      }
    }
    </script>
`;
        content = content.replace('</head>', jsonLd + '</head>');
        
        // 4. ARIA label to carousel arrows (index.html)
        content = content.replace(/<span class="material-symbols-outlined" style="">arrow_back<\/span>/g, '<span class="material-symbols-outlined" aria-label="Voltar depoimento" style="">arrow_back</span>');
        content = content.replace(/<button([^>]+)>\s*<span class="material-symbols-outlined"[^>]*>arrow_back<\/span>\s*<\/button>/g, '<button$1 aria-label="Voltar depoimento">\n                            <span class="material-symbols-outlined" style="">arrow_back</span>\n                        </button>');
        
        content = content.replace(/<span class="material-symbols-outlined" style="">arrow_forward<\/span>/g, '<span class="material-symbols-outlined" aria-label="Avançar depoimento" style="">arrow_forward</span>');
        content = content.replace(/<button([^>]+)>\s*<span class="material-symbols-outlined"[^>]*>arrow_forward<\/span>\s*<\/button>/g, '<button$1 aria-label="Avançar depoimento">\n                            <span class="material-symbols-outlined" style="">arrow_forward</span>\n                        </button>');
    }

    // 5. Lazy loading for images
    // Replace <img ...> with <img loading="lazy" ...> except if it's the main fides_logo_oficial.png or other essential LCP elements
    // We will do a generic regex but check for 'fides_logo'
    const imgRegex = /<img([^>]+)>/g;
    content = content.replace(imgRegex, (match, p1) => {
        if (p1.includes('loading="lazy"')) return match; 
        if (p1.includes('fides_logo')) return match; // exclude main logos
        return `<img loading="lazy"${p1}>`;
    });

    fs.writeFileSync(file, content);
}
console.log('Update Complete!');
