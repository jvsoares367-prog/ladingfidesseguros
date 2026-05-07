const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Ensure the robots tag is there
if (!content.includes('<meta name="robots" content="index, follow">')) {
    content = content.replace(
        '<link rel="canonical" href="https://grupofidesseguros.com.br/">',
        '<link rel="canonical" href="https://grupofidesseguros.com.br/">\n    <meta name="robots" content="index, follow">'
    );
}

// Add the JS redirect snippet
const redirectSnippet = `
    <!-- Forçar redirecionamento Canonical (www, http, e index.html) -->
    <script>
      (function() {
        var host = window.location.hostname;
        var path = window.location.pathname;
        var proto = window.location.protocol;
        var isWww = host === 'www.grupofidesseguros.com.br';
        var isHttp = proto === 'http:';
        var isIndex = path.endsWith('/index.html');
        
        if (isWww || isHttp || isIndex) {
          var newUrl = 'https://grupofidesseguros.com.br' + (isIndex ? path.replace(/\\/index\\.html$/, '/') : path) + window.location.search + window.location.hash;
          window.location.replace(newUrl);
        }
      })();
    </script>
`;

if (!content.includes('Forçar redirecionamento Canonical')) {
    content = content.replace(
        '<meta name="robots" content="index, follow">',
        '<meta name="robots" content="index, follow">\n' + redirectSnippet
    );
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('index.html updated successfully with SEO tags and redirects.');
