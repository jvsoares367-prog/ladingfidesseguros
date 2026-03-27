const fs = require('fs');
const path = require('path');

const dir = 'c:/ANTIGRAVITY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.includes('temp'));

const ga = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-7GNHWDKNZW"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-7GNHWDKNZW');
</script>`;

for (const file of files) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // 1. Remove toda e qualquer tag velha do Google que estava perdida no arquivo
    content = content.replace(/<!-- Google tag \(gtag\.js\) -->[\s\S]*?<\/script>\s*/g, '');
    
    // 2. Insere exatamente DEPOIS do <head>, de acordo com o padrão do Google
    content = content.replace('<head>', `<head>\n${ga}\n`);
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
}
