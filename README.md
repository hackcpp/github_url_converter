# GitHub URL转换器 Chrome扩展

## 功能
- 在GitHub代码页面一键切换到DeepWiki
- 在GitHub代码页面一键切换到GitHub1s
- 在DeepWiki/GitHub1s页面一键返回GitHub

## 安装
1. 克隆本仓库
2. 在Chrome中打开`chrome://extensions`
3. 启用"开发者模式"
4. 点击"加载已解压的扩展程序"选择项目目录

## 使用说明
1. 在GitHub代码页面点击扩展图标
2. 选择要切换的目标平台
3. 在DeepWiki/GitHub1s页面可点击"返回GitHub"按钮

## 项目结构
```
github-url-converter/
├── icons/            # 扩展图标
├── src/              # 源代码
│   ├── background.js # 背景脚本
│   ├── content.js    # 内容脚本
│   └── popup/        # 弹出页面
├── manifest.json     # 扩展配置文件
└── README.md         # 说明文档