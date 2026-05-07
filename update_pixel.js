const fs = require('fs');
const path = require('path');
const dir = 'c:/ANTIGRAVITY';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const newPixel = `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '4479480538994651');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=4479480538994651&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->`;

for (const file of files) {
  const p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf8');
  const rx = /<!-- Meta Pixel Code -->[\s\S]*?<!-- End Meta Pixel Code -->/;
  if (rx.test(content)) {
    content = content.replace(rx, newPixel);
    fs.writeFileSync(p, content, 'utf8');
    console.log('Replaced pixel in ' + file);
  } else {
    content = content.replace('</head>', `\n${newPixel}\n</head>`);
    fs.writeFileSync(p, content, 'utf8');
    console.log('Injected pixel in ' + file);
  }
}
