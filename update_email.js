const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\ANTIGRAVITY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
    const filepath = path.join(dir, file);
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Expressão regular para encontrar a linha do WhatsApp + email no rodapé, permitindo quebras de linha/estilos extras dentro da tag <i>
    const regex1 = /<i\s+class="fa-brands fa-whatsapp text-primary text-lg"[^>]*><\/i>\s*fidesseguros@gmail\.com/g;
    
    // Em caso de a classe ser ligeiramente diferente
    const regex2 = /<i\s+class="fa-brands fa-whatsapp text-primary text-lg"[^>]*><\/i>\s*fidesseguros@gmail\.com/g;

    const modified = content.replace(regex1, '<span class="material-symbols-outlined text-primary text-lg">mail</span>email@grupofidesseguros.com.br');
    
    if (modified !== content) {
        fs.writeFileSync(filepath, modified, 'utf8');
        console.log(`Updated: ${file}`);
    }
}
