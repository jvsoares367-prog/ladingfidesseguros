const fs = require('fs');
const path = require('path');

const dir = 'c:/ANTIGRAVITY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('temp') && f !== '404.html');

for (const file of files) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    // 1. Add Canonical Tags
    const canonicalHtml = `\n    <link rel="canonical" href="https://grupofidesseguros.com.br/${file === 'index.html' ? '' : file}">`;
    if (!content.includes('<link rel="canonical"')) {
        content = content.replace('</head>', `${canonicalHtml}\n</head>`);
    }

    // 2. Add Schema JSON-LD to index.html ONLY
    if (file === 'index.html' && !content.includes('application/ld+json')) {
        const schema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "InsuranceAgency",
      "name": "Grupo Fides Seguros",
      "url": "https://grupofidesseguros.com.br",
      "logo": "https://grupofidesseguros.com.br/assets/fides_logo_oficial.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+55-21-99588-8291",
        "contactType": "customer service"
      }
    }
    </script>`;
        content = content.replace('</head>', `${schema}\n</head>`);
    }

    fs.writeFileSync(fullPath, content, 'utf8');
}
console.log("Canonical tags and Schema org implemented.");
