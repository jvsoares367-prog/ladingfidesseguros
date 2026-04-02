try:
    from PIL import Image
    im = Image.open(r"C:\Users\jvsoa\.gemini\antigravity\brain\8f9fed7b-19be-4a19-a39c-2ad355764210\media__1774816832603.png")
    im = im.convert("RGBA")
    
    # Save as standard PNG
    im.save(r"c:\ANTIGRAVITY\assets\favicon.png", "PNG", optimize=True)
    
    # Save as ICO with multiple sizes for bulletproof compatibility
    icon_sizes = [(16, 16), (32, 32), (64, 64), (128, 128)]
    im.save(r"c:\ANTIGRAVITY\assets\favicon.ico", format="ICO", sizes=icon_sizes)
    print("SUCCESS: Image processed and saved as PNG and ICO.")
except Exception as e:
    print(f"FAILED: {e}")
