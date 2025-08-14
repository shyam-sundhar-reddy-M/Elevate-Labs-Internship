# 🖼️ Image Resizer Tool (Python + Pillow)

## 📌 Overview
This Python script resizes and converts images in **batch** using the Pillow library.  
It asks for **width, height, and output format** at runtime, making it completely dynamic.

## 🚀 Features
- Batch processes all images in the `images/` folder
- Resize to any dimensions you choose
- Convert to **PNG, JPEG, or BMP**
- Saves output to the `output/` folder
- Handles invalid inputs gracefully

## 📂 Project Structure
image_resizer_tool/
├── images/ # Input images
├── output/ # Processed images
├── image_resizer.py # Main script
└── README.md # Documentation

less
Copy
Edit

## 🛠 Installation
1. Install Python (>=3.7) from [python.org](https://www.python.org/).
2. Install Pillow:
   ```bash
   pip install pillow