const fs = require('fs');
const filepath = 'c:\\\\ANTIGRAVITY\\\\index.html';

let content = fs.readFileSync(filepath, 'utf8');

content = content.replace(/group-hover:\[animation-play-state:paused\]/g, '');
content = content.replace(/ partner-logo mix-blend-multiply grayscale hover:grayscale-0 opacity-60 hover:opacity-100/g, ' mix-blend-multiply');
content = content.replace(/ partner-logo grayscale hover:grayscale-0 opacity-60 hover:opacity-100/g, '');
content = content.replace(/ cursor-pointer/g, '');

fs.writeFileSync(filepath, content, 'utf8');
