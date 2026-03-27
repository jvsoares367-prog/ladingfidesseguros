const fs = require('fs');

const ga = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-7GNHWDKNZW"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-7GNHWDKNZW');
</script>
</head>`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.startsWith('temp'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if(!content.includes('G-7GNHWDKNZW') && content.includes('</head>')) {
    content = content.replace('</head>', ga);
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Added GA to ${f}`);
  }
});
