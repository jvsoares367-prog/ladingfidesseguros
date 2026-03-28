const fs = require('fs');
const path = require('path');

const dir = 'c:/ANTIGRAVITY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('temp'));

const oldTitle = '<title>FIDES SEGUROS | Consultoria Premium de Seguros</title>';
const newTitle = '<title>Grupo Fides - Corretora de Seguros</title>';

// We'll also use a regex just in case the title varies slightly in whitespace
// Regex to match anything inside <title>...</title> if the user explicitly wants everything to become the new title.
const titleRegex = /<title>.*?<\/title>/gi;

for (const file of files) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    // Mudar o título
    content = content.replace(titleRegex, newTitle);

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated title in ${file}`);
}
