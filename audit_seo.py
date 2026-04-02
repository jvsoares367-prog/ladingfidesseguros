import os
import re
import json

def analyze_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Basic stats
    h1s = re.findall(r'<h1.*?>.*?</h1>', content, re.IGNORECASE|re.DOTALL)
    h2s = re.findall(r'<h2.*?>.*?</h2>', content, re.IGNORECASE|re.DOTALL)
    h3s = re.findall(r'<h3.*?>.*?</h3>', content, re.IGNORECASE|re.DOTALL)

    has_semantic = bool(re.search(r'<main|header|footer|section|article|nav', content, re.IGNORECASE))
    lang = re.search(r'<html[^>]*lang=["\']([^"\']+)["\']', content, re.IGNORECASE)
    
    canonical = '<link rel="canonical"' in content
    meta_desc = 'name="description"' in content
    og = 'property="og:title"' in content
    
    json_ld = 'application/ld+json' in content
    has_ga = 'googletagmanager.com/gtag/js' in content or 'G-7GNHWDKNZW' in content
    has_gtm = 'GTM-M56NLDRS' in content
    has_pixel = 'fbevents.js' in content
    has_utm = 'utm' in content.lower()
    
    # Accessibility
    has_aria = 'aria-' in content.lower()
    has_prefers_reduced = 'prefers-reduced-motion' in content.lower()
    images = re.findall(r'<img[^>]+>', content, re.IGNORECASE)
    images_without_alt = [img for img in images if 'alt=' not in img.lower()]
    
    # Performance
    lazy = 'loading="lazy"' in content.lower()
    # WebP check
    webp_count = content.lower().count('.webp')
    avif_count = content.lower().count('.avif')
    
    # Fonts
    preload_fonts = 'preload' in content.lower() and 'font' in content.lower()
    display_swap = 'display=swap' in content.lower()

    return {
        'h1_count': len(h1s),
        'has_semantic_html': has_semantic,
        'lang': lang.group(1) if lang else None,
        'canonical': canonical,
        'meta_desc': meta_desc,
        'og': og,
        'json_ld': json_ld,
        'ga4': has_ga,
        'gtm': has_gtm,
        'pixel': has_pixel,
        'utm': has_utm,
        'aria': has_aria,
        'prefers_reduced': has_prefers_reduced,
        'total_images': len(images),
        'images_without_alt': len(images_without_alt),
        'lazy_load': lazy,
        'modern_images': webp_count > 0 or avif_count > 0,
        'preload_fonts': preload_fonts,
        'display_swap': display_swap
    }

results = {}
for f in os.listdir('.'):
    if f.endswith('.html'):
        results[f] = analyze_file(f)

# Also check technical files
tech_files = ['sitemap.xml', 'robots.txt', 'llms.txt']
tech_status = {f: os.path.exists(f) for f in tech_files}

print(json.dumps({'html': results, 'tech': tech_status}, indent=2))
