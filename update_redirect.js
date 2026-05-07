const fs = require('fs');
let content = fs.readFileSync('c:/ANTIGRAVITY/index.html', 'utf8');

const oldStr = 'value="https://wa.me/5521995888291?text=Acabo%20de%20enviar%20uma%20solicitacao%20de%20cotacao%20pelo%20site!"';
const newStr = 'value="https://wa.me/5521995888291?text=Ol%C3%A1%2C%20quero%20fazer%20uma%20cota%C3%A7%C3%A3o%20agora"';

content = content.replace(oldStr, newStr);

fs.writeFileSync('c:/ANTIGRAVITY/index.html', content, 'utf8');
console.log("Redirect updated in index.html");
