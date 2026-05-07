const https = require('https');

https.get('https://grupofidesseguros.com.br/', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const match = data.match(/<link[^>]*icon[^>]*>/gi);
        console.log("HTML Tags na Hospedagem Atual:", match);
    });
});

https.get('https://grupofidesseguros.com.br/assets/favicon.ico', (res) => {
    console.log("Status real do favicon.ico via GitHub CDN:", res.statusCode);
});
