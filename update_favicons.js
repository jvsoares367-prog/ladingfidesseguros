const fs = require('fs');
const files = fs.readdirSync('.');
const htmlFiles = files.filter(f => f.endsWith('.html'));
const robustTags = `    <!-- Standard Favicon -->
    <link rel="icon" type="image/png" href="/favicon.png?v=3">
    <link rel="icon" type="image/x-icon" href="/favicon.ico?v=3">
    <!-- Apple Touch Icon for Mobile Devices -->
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/fides-favicon.png?v=3">`;

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    // Basic replace
    content = content.replace(/<link rel="icon" type="image\/png" href="assets\/fides-favicon\.png">/g, robustTags);
    content = content.replace(/<link rel="icon" type="image\/png" href="assets\/fides-favicon\.png\?v=2">/g, robustTags);
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
}
