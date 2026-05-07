const fs = require('fs');
const path = require('path');

const dir = 'c:/ANTIGRAVITY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('temp') && f !== '404.html');

const titleMap = {
    'index.html': 'Corretora de Seguros Premium | Grupo Fides Seguros',
    'sobre-nos.html': 'Quem Somos | História e Missão | Grupo Fides Seguros',
    'suporte.html': 'Suporte e Atendimento VIP | Grupo Fides Seguros',
    'compliance.html': 'Compliance e Ética | Grupo Fides Seguros',
    'cotacao.html': 'Simule sua Cotação Online | Grupo Fides Seguros',
    'lgpd.html': 'Política de Privacidade LGPD | Grupo Fides Seguros',
    'plano-de-saude-rj.html': 'Plano de Saúde no RJ | Melhores Operadoras | Grupo Fides Seguros',
    'saude-empresarial.html': 'Plano de Saúde Empresarial (PME) | Grupo Fides Seguros',
    'saude-individual.html': 'Plano de Saúde Individual e Familiar | Grupo Fides Seguros',
    'seguro-frota.html': 'Seguro de Frota Premium para Empresas | Grupo Fides Seguros'
};

for (const file of files) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    // Make the title tag unique using semantic structure
    const newTitle = titleMap[file] || `Portal | Grupo Fides Seguros`;
    content = content.replace(/<title>.*?<\/title>/gi, `<title>${newTitle}</title>`);
    
    fs.writeFileSync(fullPath, content, 'utf8');
}
console.log("Titles Unique Mapped successfully.");
