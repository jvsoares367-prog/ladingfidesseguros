const fs = require('fs');

function analyzeFile(filename) {
    const content = fs.readFileSync(filename, 'utf8');
    
    const h1s = (content.match(/<h1[^>]*>.*?<\/h1>/gis) || []).length;
    const h2s = (content.match(/<h2[^>]*>.*?<\/h2>/gis) || []).length;
    const h3s = (content.match(/<h3[^>]*>.*?<\/h3>/gis) || []).length;
    
    const hasSemantic = /<(main|header|footer|section|article|nav)[\s>]/i.test(content);
    const langMatch = content.match(/<html[^>]*lang=["']([^"']+)["']/i);
    
    const canonical = content.includes('<link rel="canonical"');
    const metaDesc = content.includes('name="description"');
    const og = content.includes('property="og:title"');
    const jsonLd = content.includes('application/ld+json');
    const ga4 = content.includes('G-7GNHWDKNZW');
    const pixel = content.includes('fbevents.js') || content.includes('fbq(');
    const utm = content.toLowerCase().includes('utm_source');
    
    const aria = content.toLowerCase().includes('aria-');
    const lazy = content.toLowerCase().includes('loading="lazy"');
    
    const images = content.match(/<img[^>]+>/gi) || [];
    const imagesWithoutAlt = images.filter(img => !img.toLowerCase().includes('alt='));
    
    const webpCount = (content.match(/\.webp/gi) || []).length;
    const avifCount = (content.match(/\.avif/gi) || []).length;
    const pngJpgCount = (content.match(/\.(png|jpe?g)/gi) || []).length;
    
    return {
        h1s, h2s, h3s, hasSemantic, lang: langMatch ? langMatch[1] : null,
        canonical, metaDesc, og, jsonLd, ga4, pixel, utm, aria, lazy,
        totalImages: images.length, imagesWithoutAlt: imagesWithoutAlt.length,
        modernImages: webpCount + avifCount, oldImages: pngJpgCount
    };
}

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const results = {};
for (const file of htmlFiles) {
    results[file] = analyzeFile(file);
}

console.log(JSON.stringify(results, null, 2));
