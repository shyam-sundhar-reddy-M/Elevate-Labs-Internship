import os
from PIL import Image

# Input and output folders
input_folder = "images"
output_folder = "output"

# Create input folder if not exists
if not os.path.exists(input_folder):
    os.makedirs(input_folder)
    print(f"📂 '{input_folder}' folder created. Please add some images and run the script again.")
    exit()

# Resize dimensions
new_width = 800
new_height = 600

# Create output folder if not exists
os.makedirs(output_folder, exist_ok=True)

# Loop through all files in input folder
files_found = False
for filename in os.listdir(input_folder):
    file_path = os.path.join(input_folder, filename)
    
    # Skip if not an image
    if not filename.lower().endswith((".png", ".jpg", ".jpeg", ".bmp", ".gif")):
        continue
    
    files_found = True
    try:
        with Image.open(file_path) as img:
            resized_img = img.resize((new_width, new_height))
            output_path = os.path.join(output_folder, os.path.splitext(filename)[0] + ".png")
            resized_img.save(output_path, "PNG")
            print(f"✅ Processed: {filename} → {output_path}")
    except Exception as e:
        print(f"❌ Error processing {filename}: {e}")

if not files_found:
    print("⚠️ No valid images found in the 'images' folder.")
else:
    print("\n🎯 All images processed successfully!")
