from PIL import Image, ImageDraw, ImageFont
import os

# Create a simple test image
img = Image.new('RGB', (400, 300), color='lightblue')
draw = ImageDraw.Draw(img)

# Add some text
try:
    # Try to use a system font
    font = ImageFont.truetype("arial.ttf", 30)
except:
    # Fallback to default font
    font = ImageFont.load_default()

draw.text((150, 130), "Test Image", fill='darkblue', font=font)
draw.rectangle([50, 50, 350, 250], outline='darkblue', width=3)

# Save the image
img.save('test-image.png')
print("Test image created successfully!")