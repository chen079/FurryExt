import os

# 遍历的根目录
root_dir = './'

# 输出的 txt 文件路径
txt_path = 'file_paths.txt'

# 获取文件夹及其子文件夹的所有路径
file_paths = []
for root, dirs, files in os.walk(root_dir):
    for file in files:
        file_path = os.path.join(root, file)
        file_paths.append(file_path)

# 将文件路径写入 txt 文件中
with open(txt_path, 'w') as f:
    for file_path in file_paths:
        f.write(f"'{file_path}',\n")

print('文件路径已写入到', txt_path)