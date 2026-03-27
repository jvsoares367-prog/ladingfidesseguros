import os

filepath = r"c:\ANTIGRAVITY\index.html"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('group-hover:[animation-play-state:paused]', '')
content = content.replace(' partner-logo mix-blend-multiply grayscale hover:grayscale-0 opacity-60 hover:opacity-100', ' mix-blend-multiply')
content = content.replace(' partner-logo grayscale hover:grayscale-0 opacity-60 hover:opacity-100', '')
content = content.replace(' cursor-pointer', '')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
