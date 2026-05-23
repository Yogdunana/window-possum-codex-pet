# Window Possum 功能拓展

本文档介绍 Window Possum 的功能拓展模块。

## 📦 功能模块

### 1. 互动功能 (interactions.js)

提供丰富的用户交互体验。

#### 点击交互
- **单击**: 显示随机台词气泡
- **双击**: 触发跳跃动画
- **长按 (800ms)**: 显示快速菜单

#### 右键菜单
- 状态切换: 待机 / 运行 / 审查 / 等待
- 设置入口
- 关于信息

#### 拖拽功能
- 支持自由拖拽定位
- 自动保存位置到配置

#### 快捷键
- `Ctrl/Cmd + Shift + P`: 召唤负鼠
- `Esc`: 关闭所有菜单

#### 快速动作菜单
- 🍕 投喂 - 触发感谢台词
- 👋 摸摸 - 触发舒适台词
- 😴 睡觉 - 触发睡眠台词
- 💃 跳舞 - 触发舞蹈动画

---

### 2. 配置系统 (settings.js)

完整的设置面板，支持持久化存储。

#### 外观设置
- 主题: 浅色 / 深色 / 自动
- 大小: 50% - 200%
- 透明度: 30% - 100%
- 动画速度

#### 行为设置
- 允许拖拽
- 允许点击交互
- 启用台词
- 台词频率

#### 台词设置
- 语言选择 (7种)
- 季节性台词
- 气泡时长
- 最大字符数

#### 快捷键设置
- 召唤负鼠: Ctrl+Shift+P
- 显示/隐藏: Ctrl+Shift+T
- 打开设置: Ctrl+Shift+S
- 静音切换: Ctrl+Shift+M

---

### 3. 实用工具 (widgets.js)

桌面小组件集合。

#### 🕐 时钟小组件
- 实时显示当前时间
- 显示日期和星期

#### 🍅 番茄钟
- 25 分钟工作计时
- 开始/暂停/重置
- 结束通知提醒

---

### 4. AI 对话 (ai-chat.js)

智能代码助手，根据上下文给出评论和建议。

#### 功能特性
- 代码错误检测与吐槽
- 代码质量检查
- 智能提醒（摸鱼/加班检测）
- 简单的自然语言交互

---

## 🚀 使用方法

### 基础用法

```html
<script src="src/interactions.js"></script>
<script src="src/settings.js"></script>
<script src="src/widgets.js"></script>
<script src="src/ai-chat.js"></script>
<script src="src/main.js"></script>
```

### API 使用

```javascript
// 让负鼠说话
window.possumAI.speak("代码写得不错！");

// 分析代码
const suggestions = window.possumAI.analyzeCode(code, 'javascript');

// 打开设置
window.possumSettings.show();
```

---

有问题或建议？欢迎提交 Issue！