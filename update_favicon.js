const fs = require('fs');

const files = fs.readdirSync('c:/ANTIGRAVITY').filter(f => f.endsWith('.html') && !f.startsWith('temp_'));

const linkTag = '\n    <link rel="icon" type="image/png" href="assets/favicon.png">\n';

files.forEach(file => {
    const path = 'c:/ANTIGRAVITY/' + file;
    let content = fs.readFileSync(path, 'utf8');
    
    // Remove if already exists to avoid duplicates
    content = content.replace(/<link rel="icon"[^>]*>\r?\n?/g, '');
    
    // Add before </head> if not exists
    if (content.includes('</head>')) {
        content = content.replace('</head>', linkTag + '</head>');
        fs.writeFileSync(path, content, 'utf8');
        console.log('Updated ' + file);
    }
});
