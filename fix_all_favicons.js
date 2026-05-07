const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname);

// Regex para encontrar o bloco atual de favicons
const faviconRegex = /<!-- Standard Favicon -->[\s\S]*?href="\/assets\/fides-favicon\.png\?v=\d+">/g;
// Versão alternativa de regex caso o bloco seja ligeiramente diferente
const faviconRegex2 = /<link rel="icon" type="image\/x-icon".*?href="assets\/fides-favicon\.png.*?>/g;

const novoBlocoFavicon = `<!-- Favicons Modernos e Otimizados -->
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon.png?v=v6">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon.png?v=v6">
    <link rel="shortcut icon" href="/favicon.ico?v=v6">
    <!-- Apple Touch Icon for Mobile Devices -->
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/fides-favicon.png?v=v6">`;

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Erro ao ler diretório: ' + err);
    }

    const htmlFiles = files.filter(file => file.endsWith('.html'));

    htmlFiles.forEach(file => {
        const filePath = path.join(directoryPath, file);
        let content = fs.readFileSync(filePath, 'utf8');

        let originalContent = content;

        // Remover tags soltas de favicon antes para garantir que não teremos duplicados
        content = content.replace(/<link rel="icon".*?>\r?\n?/g, '');
        content = content.replace(/<link rel="shortcut icon".*?>\r?\n?/g, '');
        content = content.replace(/<link rel="apple-touch-icon".*?>\r?\n?/g, '');
        content = content.replace(/<!-- Standard Favicon -->\r?\n?/g, '');
        content = content.replace(/<!-- Apple Touch Icon for Mobile Devices -->\r?\n?/g, '');

        // Inserir o novo bloco no <head>
        content = content.replace(/<head>/i, `<head>\n    ${novoBlocoFavicon}`);

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Atualizado favicons em: ${file}`);
        } else {
            console.log(`⚠️ Nenhuma alteração em: ${file}`);
        }
    });
});
