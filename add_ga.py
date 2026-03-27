import os

ga_snippet = """
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-7GNHWDKNZW"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-7GNHWDKNZW');
</script>
"""

for filename in os.listdir('.'):
    if filename.endswith('.html') and not filename.startswith('temp'):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'G-7GNHWDKNZW' not in content:
            # find </head> and insert before it
            if '</head>' in content:
                content = content.replace('</head>', ga_snippet + '</head>')
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Adicionado GA em {filename}")
