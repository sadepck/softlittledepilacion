from PIL import Image, ImageDraw, ImageFont
import os
import random

def create_image(width, height, color, text, filename):
    """Crea una imagen con un color de fondo y texto centrado"""
    img = Image.new('RGB', (width, height), color=color)
    draw = ImageDraw.Draw(img)
    
    # Intenta cargar una fuente, si no está disponible usa la fuente por defecto
    try:
        font = ImageFont.truetype("arial.ttf", 24)
    except:
        font = ImageFont.load_default()
    
    # Calcula el ancho y alto del texto
    text_width = draw.textlength(text, font=font)
    text_height = 20  # Aproximado para la fuente por defecto
    
    # Posiciona el texto en el centro
    position = ((width - text_width) // 2, (height - text_height) // 2)
    
    # Añade el texto
    draw.text(position, text, fill="black", font=font)
    
    # Guarda la imagen
    img.save(os.path.join("images", filename))

def create_before_after_images():
    """Crea imágenes de antes y después para la galería"""
    treatments = [
        ("piernas", "Depilación de piernas"),
        ("cejas", "Perfilado de cejas"),
        ("pestanas", "Lifting de pestañas"),
        ("brow-lamination", "Brow Lamination"),
        ("facial", "Limpieza facial"),
        ("axilas", "Depilación de axilas")
    ]
    
    for i, (treatment, title) in enumerate(treatments, 1):
        # Imagen "antes"
        create_image(400, 500, "#f0f0f0", f"Antes - {title}", f"before-{i}.jpg")
        
        # Imagen "después"
        create_image(400, 500, "#f8f8f8", f"Después - {title}", f"after-{i}.jpg")

def create_service_icons():
    """Crea iconos para los servicios"""
    services = [
        ("depilacion", "Depilación Definitiva"),
        ("cejas", "Perfilado de Cejas"),
        ("pestanas", "Lifting de Pestañas"),
        ("brow-lamination", "Brow Lamination"),
        ("facial", "Limpieza Facial")
    ]
    
    for i, (service, name) in enumerate(services, 1):
        create_image(200, 200, "#FDF2F8", name, f"service-{i}.jpg")

def create_testimonial_images():
    """Crea imágenes de perfil para los testimonios"""
    for i in range(1, 5):
        create_image(100, 100, f"#E0F2FE{random.randint(10, 99)}", f"Cliente {i}", f"testimonial-{i}.jpg")

def create_hero_image():
    """Crea la imagen principal del hero"""
    create_image(1200, 800, "#FCE7F3", "Soft Little Depilación - Resultados profesionales", "hero-bg.jpg")

def create_favicon():
    """Crea un favicon simple"""
    img = Image.new('RGB', (32, 32), color = '#FDF2F8')
    draw = ImageDraw.Draw(img)
    draw.rectangle([8, 8, 24, 24], outline="#0EA5E9", width=2)
    img.save(os.path.join("images", "favicon.ico"), format='ICO')

if __name__ == "__main__":
    # Crear directorio de imágenes si no existe
    if not os.path.exists("images"):
        os.makedirs("images")
    
    # Generar todas las imágenes necesarias
    create_before_after_images()
    create_service_icons()
    create_testimonial_images()
    create_hero_image()
    create_favicon()
    
    print("¡Imágenes generadas exitosamente en la carpeta 'images'!")
