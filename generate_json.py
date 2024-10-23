import os
import json

def generate_images_json(image_folder, output_file):
    print(f"正在处理文件夹: {image_folder}")
    if not os.path.exists(image_folder):
        print(f"错误: 文件夹 {image_folder} 不存在")
        return

    image_files = [f for f in os.listdir(image_folder) if f.endswith('.jpg')]
    if not image_files:
        print(f"警告: 在 {image_folder} 中没有找到 .jpg 文件")
        return

    print(f"找到 {len(image_files)} 个 .jpg 文件")
    image_files.sort(key=lambda x: int(x.split('_')[1].split('.')[0]))
    
    with open(output_file, 'w') as f:
        json.dump(image_files, f)
    
    print(f"已生成 JSON 文件: {output_file}")

# 使用示例
image_folder = "output_images"
output_file = "images.json"
print("开始执行脚本")
generate_images_json(image_folder, output_file)
print("脚本执行完毕")