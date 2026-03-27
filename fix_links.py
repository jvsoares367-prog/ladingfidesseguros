import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

link_map = {
    r'>Saúde Empresarial<': '>Saúde Empresarial<',
    r'>Saúde Individual<': '>Saúde Individual<',
    r'>Seguro de Frota<': '>Seguro de Frota<',
    r'>Seguro de Vida VIP<': '>Seguro de Vida VIP<',
    r'>Sobre a Corretora<': '>Sobre a Corretora<',
    r'>Sobre Nós<': '>Sobre Nós<',
    r'>Compliance<': '>Compliance<',
    r'>LGPD<': '>LGPD<',
    r'>FAQ<': '>FAQ<',
    r'>Serviços<': '>Serviços<',
    r'>Suporte<': '>Suporte<',
    r'>Cotação Gratuita<': '>Cotação Gratuita<',
    r'>fides<': '>fides<',
}

href_targets = {
    r'>Saúde Empresarial<': 'saude-empresarial.html',
    r'>Saúde Individual<': 'saude-individual.html',
    r'>Seguro de Frota<': 'seguro-frota.html',
    r'>Seguro de Vida VIP<': 'seguro-vida.html',
    r'>Sobre a Corretora<': 'sobre-nos.html',
    r'>Sobre Nós<': 'sobre-nos.html',
    r'>Compliance<': 'compliance.html',
    r'>LGPD<': 'lgpd.html',
    r'>FAQ<': 'index.html#faq',
    r'>Serviços<': 'index.html#servicos',
    r'>Suporte<': 'index.html#faq',
    r'>Cotação Gratuita<': 'cotacao.html',
    r'>fides<': 'index.html',
}

def replace_links(content):
    # Regex to find <a> tags
    pattern = re.compile(r'<a\s+([^>]*?)href=["\'](.*?)["\']([^>]*?)>(.*?)</a>', re.IGNORECASE | re.DOTALL)
    
    def match_replacer(match):
        before_href = match.group(1)
        old_href = match.group(2)
        after_href = match.group(3)
        inner_html = match.group(4)
        
        new_href = old_href
        
        # Check against whatsapp
        if 'wa.me' in old_href:
            new_href = 'https://wa.me/5521995888291?text=Quero%20fazer%20uma%20cotacao'
            
        # Check inner html mapping
        for key, target in href_targets.items():
            # simple text matching
            clean_key = key.replace('>', '').replace('<', '')
            if clean_key in inner_html:
                new_href = target
                break
                
        # hardcode index for logo
        if 'fides' in inner_html.lower() and 'seguros' in inner_html.lower():
            if 'logo' in inner_html.lower() or 'class="' in inner_html.lower():
                 new_href = 'index.html'

        return f'<a {before_href}href="{new_href}"{after_href}>{inner_html}</a>'
        
    new_content = pattern.sub(match_replacer, content)
    
    # Also globally replace dummy whatsapp link if it exists anywhere else
    new_content = new_content.replace('https://wa.me/5500000000000', 'https://wa.me/5521995888291?text=Quero%20fazer%20uma%20cotacao')
    
    return new_content

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    updated_content = replace_links(content)
    
    if updated_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        print(f"Updated links in {file}")

print("Site linking completed!")
