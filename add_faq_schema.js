const fs = require('fs');
const path = require('path');

const filePath = 'c:/ANTIGRAVITY/index.html';
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('"@type": "FAQPage"')) {
    const faqSchema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "Como funciona o processo de consultoria?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nossa consultoria mapeia seu perfil atual de seguros, identifica as vulnerabilidades financeiras e traz opções nas gigantes parceiras com custos minimizados."
        }
      }, {
        "@type": "Question",
        "name": "Quais são as seguradoras parceiras?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Trabalhamos com lideranças de mercado como Bradesco, Amil, SulAmerica, Golden Cross e Omint oferecendo abrangência VIP e nacional."
        }
      }, {
        "@type": "Question",
        "name": "Há custos adicionais para o cliente?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A consultoria comercial para cotação e negociação com as seguradoras é sem custos diretos ocultos para a empresa."
        }
      }]
    }
    </script>`;

    content = content.replace('</head>', `${faqSchema}\n</head>`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("FAQ Schema Added!");
}
