const fs = require('fs');
const path = require('path');

const dir = '.';
const header = fs.readFileSync('temp_header.html', 'utf8');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html'); // Ignore index.html since it already has it, or well we can replace it anyway as it's exactly where it came from but we modified it to sticky top-0. Let's do it on all pages!
const allFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

allFiles.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // Some headers have different content or even multiline. 
    // Use regex to find <header> to </header>
    const headerRegex = /<header[\s\S]*?<\/header>/i;
    if (headerRegex.test(content)) {
        content = content.replace(headerRegex, header);

        // Ensure Montserrat is loaded (for the logo)
        if (!content.includes('Montserrat')) {
            content = content.replace(/<head>/i, `<head>\n<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"/>\n`);
        }

        // Ensure styles for the logo fonts are there
        if (!content.includes('.logo-font-main')) {
            const styles = `
    <style>
        .logo-font-main { font-family: 'Montserrat', sans-serif; font-weight: 700; letter-spacing: -1.5px; }
        .logo-font-sub { font-family: 'Inter', sans-serif; font-weight: 600; font-size: 0.8rem; letter-spacing: 2.5px; margin-top: -8px; margin-left: 2px; text-transform: uppercase; }
        .text-charcoal { color: #1f2937; }
    </style>
            `;
            // insert before closing head
            content = content.replace(/<\/head>/i, styles + '\n</head>');
        }

        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Updated header globally in ${file}`);
    }
});
