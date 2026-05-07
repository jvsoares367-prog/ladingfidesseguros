const fs = require('fs');
const path = require('path');
const dir = 'c:/ANTIGRAVITY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const faviconBlock = `    <!-- Standard Favicon -->
    <link rel="icon" type="image/png" sizes="64x64" href="assets/favicon.png?v=20260412">
    <link rel="icon" type="image/x-icon" href="assets/favicon.ico?v=20260412">
    <link rel="shortcut icon" type="image/x-icon" href="assets/favicon.ico?v=20260412">
    <!-- Apple Touch Icon for Mobile Devices -->
    <link rel="apple-touch-icon" sizes="180x180" href="assets/fides-favicon.png?v=20260412">`;

for (const file of files) {
  const p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf8');

  // We find where the favicon usually starts and where the title begins, replacing that whole block
  const rx = /<!-- Standard Favicon -->[\s\S]*?<!-- Apple Touch Icon for Mobile Devices -->[\s\S]*?<link[^>]*href="[^"]*fides-favicon\.png[^>]*>/;
  
  if (rx.test(content)) {
    content = content.replace(rx, faviconBlock);
    fs.writeFileSync(p, content, 'utf8');
    console.log('Replaced favicon block in ' + file);
  } else {
      console.log('Favicon block not matched properly in ' + file);
  }
}
