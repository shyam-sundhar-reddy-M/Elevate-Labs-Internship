import os
from PIL import Image

# Ask user for input dimensions
try:
    new_width = int(input("Enter new width: "))
    new_height = int(input("Enter new height: "))
except ValueError:
    print("❌ Invalid input for dimensions! Please enter numbers.")
    exit()

# Ask user for output format (e.g., PNG, JPEG, BMP)
output_format = input("Enter output format (PNG/JPEG/BMP): ").upper()
if output_format not in ["PNG", "JPEG", "BMP"]:
    print("❌ Invalid format! Using PNG by default.")
    output_format = "PNG"

# Folders
input_folder = "images"
output_folder = "output"
os.makedirs(output_folder, exist_ok=True)

# Process each file
for filename in os.listdir(input_folder):
    file_path = os.path.join(input_folder, filename)
    
    if not filename.lower().endswith((".png", ".jpg", ".jpeg", ".bmp", ".gif")):
        continue

    try:
        with Image.open(file_path) as img:
            resized_img = img.resize((new_width, new_height))
            output_name = os.path.splitext(filename)[0] + f".{output_format.lower()}"
            output_path = os.path.join(output_folder, output_name)
            resized_img.save(output_path, output_format)
            print(f"✅ Processed: {filename} → {output_name}")
    except Exception as e:
        print(f"❌ Error processing {filename}: {e}")

print("\n🎯 All images processed successfully!")
