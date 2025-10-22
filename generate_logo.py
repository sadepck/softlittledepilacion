from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

def create_logo():
    # Configuración del canvas
    width, height = 800, 300
    background_color = (255, 255, 255, 0)  # Fondo transparente
    
    # Crear una nueva imagen con canal alfa para transparencia
    logo = Image.new('RGBA', (width, height), background_color)
    draw = ImageDraw.Draw(logo)
    
    # Colores de la marca
    primary_color = (158, 127, 102)    # Marrón cálido
    accent_color = (232, 196, 184)     # Rosa suave
    
    # Dibujar el ícono (una línea suave con terminación en punta)
    # Crear una máscara para el degradado
    mask = Image.new('L', (width, height), 0)
    mask_draw = ImageDraw.Draw(mask)
    
    # Dibujar la línea principal con degradado
    for i in range(100, 250):
        y = 150 + int(30 * (i/100) * 0.5)  # Línea ligeramente curva
        opacity = int(255 * (1 - abs(i-175)/75))  # Hacer que los extremos se desvanezcan
        mask_draw.line([(i, y), (i+1, y+1)], fill=opacity, width=15)
    
    # Aplicar el degradado de color
    for x in range(width):
        for y in range(height):
            if mask.getpixel((x, y)) > 0:
                # Interpolar entre los dos colores basado en la posición X
                r = int(primary_color[0] + (accent_color[0] - primary_color[0]) * (x-100) / 150)
                g = int(primary_color[1] + (accent_color[1] - primary_color[1]) * (x-100) / 150)
                b = int(primary_color[2] + (accent_color[2] - primary_color[2]) * (x-100) / 150)
                alpha = mask.getpixel((x, y))
                logo.putpixel((x, y), (r, g, b, alpha))
    
    # Añadir un pequeño círculo al final de la línea
    draw.ellipse([(90, 145, 110, 165)], fill=accent_color)
    
    # Añadir el texto
    try:
        # Intentar cargar una fuente bonita, si no está disponible, usar la predeterminada
        font_path = os.path.join('fonts', 'Poppins', 'Poppins-SemiBold.ttf')
        if os.path.exists(font_path):
            font_large = ImageFont.truetype(font_path, 48)
            font_small = ImageFont.truetype(font_path, 24)
        else:
            # Si no se encuentra la fuente, usar la predeterminada
            font_large = ImageFont.load_default()
            font_small = ImageFont.load_default()
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    # Texto principal
    text = "Soft Little"
    text_width, text_height = draw.textsize(text, font=font_large)
    draw.text((300, 100), text, fill=primary_color, font=font_large)
    
    # Texto secundario
    text = "DEPILACIÓN"
    draw.text((300, 160), text, fill=accent_color, font=font_small)
    
    # Guardar el logo en diferentes tamaños
    logo_dir = 'images'
    os.makedirs(logo_dir, exist_ok=True)
    
    # Logo completo (para la página de inicio)
    logo_path = os.path.join(logo_dir, 'logo-soft-little-depilacion.png')
    logo.save(logo_path, 'PNG')
    
    # Versión más pequeña para el header
    logo_small = logo.resize((200, 75), Image.Resampling.LANCZOS)
    logo_small_path = os.path.join(logo_dir, 'logo-header.png')
    logo_small.save(logo_small_path, 'PNG')
    
    # Versión de icono para pestaña del navegador (favicon)
    icon = logo.resize((32, 32), Image.Resampling.LANCZOS)
    icon_path = os.path.join(logo_dir, 'favicon.ico')
    icon.save(icon_path, 'ICO')
    
    print(f"Logos creados exitosamente en la carpeta '{logo_dir}'")

if __name__ == "__main__":
    create_logo()
