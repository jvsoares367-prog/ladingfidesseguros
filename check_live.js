const https = require('https');

https.get('https://grupofidesseguros.com.br/', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log("TITLE:", data.match(/<title>.*?<\/title>/gi)?.[0] || 'NOT FOUND');
        console.log("DESC:", data.match(/<meta name="description".*?>/gi)?.[0] || 'NOT FOUND');
        console.log("ICON:", data.match(/<link rel="icon".*?>/gi)?.[0] || 'NOT FOUND');
    });
}).on('error', (err) => {
    console.log("Error: " + err.message);
});
