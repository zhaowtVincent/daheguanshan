import os
from pdf2image import convert_from_path

def convert_pdf_to_images(pdf_path, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    # 在 Windows 上，指定 poppler_path
    if os.name == 'nt':
        from pdf2image.exceptions import PDFInfoNotInstalledError
        try:
            pages = convert_from_path(pdf_path, 300)
        except PDFInfoNotInstalledError:
            poppler_path = r"C:\path\to\poppler-xx\Library\bin"
            pages = convert_from_path(pdf_path, 300, poppler_path=poppler_path)
    else:
        # 在 macOS 和 Linux 上，不需要指定 poppler_path
        pages = convert_from_path(pdf_path, 300)
    
    for i, page in enumerate(pages):
        image_name = f"page_{i+1}.jpg"
        page.save(os.path.join(output_folder, image_name), "JPEG")
    
    print(f"转换完成。图片保存在 {output_folder}")

# 使用示例
pdf_path = r"H:\工作——new\凤阳网站\模版中国风.pdf"
output_folder = "output_images"
convert_pdf_to_images(pdf_path, output_folder)
