const fs = require('fs');

// Add to index.html Web3Forms
let indexHtml = fs.readFileSync('c:/ANTIGRAVITY/index.html', 'utf8');
const formStr = '<form action="https://api.web3forms.com/submit" method="POST" class="space-y-6">';
if (indexHtml.includes(formStr)) {
    indexHtml = indexHtml.replace(formStr, '<form action="https://api.web3forms.com/submit" method="POST" class="space-y-6" onsubmit="if(typeof fbq !== \'undefined\') fbq(\'track\', \'Lead\');">');
    fs.writeFileSync('c:/ANTIGRAVITY/index.html', indexHtml, 'utf8');
    console.log("Lead event attached to index.html main form.");
}

// Add to cotacao.html custom JS
let cotacaoHtml = fs.readFileSync('c:/ANTIGRAVITY/cotacao.html', 'utf8');
const jsSearchStr = 'event.preventDefault(); // Impede o recarregamento padrao da pagina';
if (cotacaoHtml.includes(jsSearchStr)) {
    cotacaoHtml = cotacaoHtml.replace(
        jsSearchStr,
        jsSearchStr + "\n                if(typeof fbq !== 'undefined') fbq('track', 'Lead'); // Dispara evento de Lead do Meta Pixel"
    );
    fs.writeFileSync('c:/ANTIGRAVITY/cotacao.html', cotacaoHtml, 'utf8');
    console.log("Lead event attached to cotacao.html whatsapp logic.");
}
