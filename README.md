# GitHub URL转换器 Chrome扩展

## 功能
- 在GitHub代码页面一键切换到DeepWiki
- 在GitHub代码页面一键切换到GitHub1s
- 在DeepWiki/GitHub1s页面一键返回GitHub

## 转换规则

### 1. GitHub → DeepWiki
**转换规则：**
- 将 `https://github.com/owner/repo` 转换为 `https://deepwiki.com/owner/repo`
- 将 `https://github.com/owner/repo/tree/branch` 转换为 `https://deepwiki.com/owner/repo/tree/branch`
- 将 `https://github.com/owner/repo/blob/branch/path/to/file` 转换为 `https://deepwiki.com/owner/repo/blob/branch/path/to/file`

**示例：**
- `https://github.com/facebook/react` → `https://deepwiki.com/facebook/react`
- `https://github.com/facebook/react/tree/main` → `https://deepwiki.com/facebook/react/tree/main`
- `https://github.com/facebook/react/blob/main/README.md` → `https://deepwiki.com/facebook/react/blob/main/README.md`

### 2. GitHub → GitHub1s
**转换规则：**
- 将 `https://github.com/owner/repo` 转换为 `https://github1s.com/owner/repo`
- 将 `https://github.com/owner/repo/tree/branch` 转换为 `https://github1s.com/owner/repo/tree/branch`
- 将 `https://github.com/owner/repo/blob/branch/path/to/file` 转换为 `https://github1s.com/owner/repo/blob/branch/path/to/file`

**示例：**
- `https://github.com/facebook/react` → `https://github1s.com/facebook/react`
- `https://github.com/facebook/react/tree/main` → `https://github1s.com/facebook/react/tree/main`
- `https://github.com/facebook/react/blob/main/README.md` → `https://github1s.com/facebook/react/blob/main/README.md`

### 3. DeepWiki → GitHub
**转换规则：**
- 将 `https://deepwiki.com/owner/repo` 转换为 `https://github.com/owner/repo`
- 将 `https://deepwiki.com/owner/repo/tree/branch` 转换为 `https://github.com/owner/repo/tree/branch`
- 将 `https://deepwiki.com/owner/repo/blob/branch/path/to/file` 转换为 `https://github.com/owner/repo/blob/branch/path/to/file`

### 4. DeepWiki → GitHub1s
**转换规则：**
- 将 `https://deepwiki.com/owner/repo` 转换为 `https://github1s.com/owner/repo`
- 将 `https://deepwiki.com/owner/repo/tree/branch` 转换为 `https://github1s.com/owner/repo/tree/branch`
- 将 `https://deepwiki.com/owner/repo/blob/branch/path/to/file` 转换为 `https://github1s.com/owner/repo/blob/branch/path/to/file`

### 5. GitHub1s → GitHub
**转换规则：**
- 将 `https://github1s.com/owner/repo` 转换为 `https://github.com/owner/repo`
- 将 `https://github1s.com/owner/repo/tree/branch` 转换为 `https://github.com/owner/repo/tree/branch`
- 将 `https://github1s.com/owner/repo/blob/branch/path/to/file` 转换为 `https://github.com/owner/repo/blob/branch/path/to/file`

### 6. GitHub1s → DeepWiki
**转换规则：**
- 将 `https://github1s.com/owner/repo` 转换为 `https://deepwiki.com/owner/repo`
- 将 `https://github1s.com/owner/repo/tree/branch` 转换为 `https://deepwiki.com/owner/repo/tree/branch`
- 将 `https://github1s.com/owner/repo/blob/branch/path/to/file` 转换为 `https://deepwiki.com/owner/repo/blob/branch/path/to/file`

## 技术实现

### URL转换逻辑
扩展通过以下步骤进行URL转换：

1. **解析原始URL**：使用 `new URL(url)` 解析当前页面URL
2. **提取关键信息**：
   - 从 `pathname` 中提取 `owner/repo` 部分
   - 保留分支信息（如果有）
   - 保留文件路径信息（如果有）
3. **构建新URL**：根据目标平台拼接新的URL
4. **执行跳转**：使用 `chrome.tabs.update()` 更新当前标签页

### 按钮状态管理
扩展会根据当前页面的域名自动禁用相应的按钮：
- 在 `github.com` 页面禁用"返回GitHub"按钮
- 在 `github1s.com` 页面禁用"切换到GitHub1s"按钮
- 在 `deepwiki.com` 页面禁用"切换到DeepWiki"按钮
- 在其他页面禁用所有按钮

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