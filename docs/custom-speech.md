# 自定义台词包指南

本指南帮助你创建自己的台词包，让负鼠说出你想让它说的话！

## 快速开始

### 1. 复制模板

复制现有的台词包文件作为起点：

```bash
cp speech/zh-CN.json speech/my-custom.json
```

### 2. 编辑内容

用你喜欢的文本编辑器打开文件，修改台词内容。

### 3. 测试验证

运行验证脚本确保格式正确：

```bash
python scripts/validate-speech-packs.py speech/my-custom.json
```

## 台词包结构

```json
{
  "$schema": "../schemas/speech-pack.schema.json",
  "name": "我的自定义台词包",
  "language": "zh-CN",
  "variant": "custom",
  "version": "1.0.0",
  "author": "你的名字",
  "suggestedBubbleMaxChars": 35,
  "states": {
    "idle": ["台词1", "台词2", "台词3"],
    "running": ["台词1", "台词2", "台词3"],
    // ... 更多状态
  },
  "codexEvents": {
    "deploying": "部署时的台词",
    "debugging": "调试时的台词"
    // ... 更多事件
  }
}
```

## 字段说明

### 必填字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 台词包名称，用于显示 |
| `language` | string | 语言代码，如 `zh-CN`、`en`、`ja` |
| `states` | object | 状态台词集合 |
| `codexEvents` | object | Codex 事件台词集合 |

### 可选字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `$schema` | string | JSON Schema 引用，用于 IDE 验证 |
| `variant` | string | 变体标识，如 `spring`、`summer`、`custom` |
| `version` | string | 版本号，遵循语义化版本 |
| `author` | string | 作者名称 |
| `suggestedBubbleMaxChars` | number | 建议的气泡最大字符数 |
| `seasonal` | object | 季节配置（见下文） |

## 状态类型

负鼠有以下状态，每种状态可以配置多条台词（随机选择）：

| 状态 | 触发时机 | 建议台词数 |
|------|----------|------------|
| `idle` | 闲置时 | 10-20 条 |
| `running` | 运行任务时 | 5-10 条 |
| `waiting` | 等待响应时 | 5-10 条 |
| `review` | 审查代码时 | 5-10 条 |
| `failed` | 任务失败时 | 5-10 条 |
| `waving` | 挥手打招呼 | 5-10 条 |
| `jumping` | 跳跃时 | 5-10 条 |
| `running-left` | 向左跑时 | 5-10 条 |
| `running-right` | 向右跑时 | 5-10 条 |
| `generic` | 通用状态 | 5-10 条 |

## Codex 事件

| 事件 | 触发时机 |
|------|----------|
| `deploying` | 部署代码时 |
| `debugging` | 调试代码时 |
| `refactoring` | 重构代码时 |
| `merge-conflict` | 合并冲突时 |
| `installing` | 安装依赖时 |
| `error` | 发生错误时 |

## 季节性台词包

你可以创建季节主题的台词包，让负鼠根据季节自动切换：

```json
{
  "name": "春日版",
  "language": "zh-CN",
  "variant": "spring",
  "seasonal": {
    "activeMonths": [3, 4, 5],
    "description": "春天主题台词"
  }
}
```

### 季节月份对照

| 季节 | 月份 | variant |
|------|------|---------|
| 春 | 3, 4, 5 | `spring` |
| 夏 | 6, 7, 8 | `summer` |
| 秋 | 9, 10, 11 | `autumn` |
| 冬 | 12, 1, 2 | `winter` |

## 台词编写技巧

### 1. 保持简洁

建议每条台词控制在 `suggestedBubbleMaxChars` 字符以内，确保气泡显示完整。

### 2. 个性化风格

为你的台词包设定一个独特的风格：
- **程序员风**：充满技术梗和代码幽默
- **文艺风**：诗意和哲理并存
- **可爱风**：萌萌哒语气词
- **毒舌风**：犀利吐槽，一针见血

### 3. 避免重复

使用验证脚本检测重复台词：

```bash
python scripts/validate-speech-packs.py --strict speech/my-custom.json
```

### 4. 考虑上下文

不同状态的台词应该符合场景：
- `idle`：可以是一些日常吐槽或思考
- `running`：充满活力和干劲
- `failed`：幽默地安慰用户
- `waving`：友好热情的问候

## 验证与测试

### JSON 格式验证

```bash
python -m json.tool speech/my-custom.json > /dev/null
```

### Schema 验证

```bash
python scripts/validate-speech-packs.py speech/my-custom.json
```

### 完整验证（包括重复检测）

```bash
python scripts/validate-speech-packs.py --strict speech/my-custom.json
```

## 分享你的台词包

### 提交到仓库

1. Fork 本仓库
2. 将你的台词包文件放入 `speech/` 目录
3. 提交 Pull Request

### 文件命名规范

- 基础语言包：`{language}.json`（如 `zh-CN.json`）
- 变体包：`{language}.{variant}.json`（如 `zh-CN.spring.json`）
- 自定义包：`{language}.{custom-name}.json`（如 `zh-CN.my-style.json`）

## 示例

### 程序员风格

```json
{
  "states": {
    "idle": [
      "代码写完了吗？",
      "bug修好了吗？",
      "该提交代码了吧？",
      "咖啡喝了吗？"
    ],
    "running": [
      "编译中，请勿打扰...",
      "正在努力搬砖...",
      "代码跑起来了！"
    ],
    "failed": [
      "编译失败，请检查语法",
      "运行出错，建议重启试试",
      "这不是bug，是feature！"
    ]
  }
}
```

### 可爱风格

```json
{
  "states": {
    "idle": [
      "主人~你在干嘛呀？",
      "好无聊哦~",
      "陪我玩嘛~",
      "想睡觉了..."
    ],
    "running": [
      "加油加油！",
      "冲冲冲！",
      "努力工作中~"
    ],
    "failed": [
      "呜呜呜，失败了...",
      "没关系，下次一定行！",
      "抱抱主人~"
    ]
  }
}
```

## 常见问题

### Q: 台词太长显示不全怎么办？

A: 调整 `suggestedBubbleMaxChars` 值，或缩短台词内容。

### Q: 如何让台词随机显示？

A: Codex Pet 会自动从数组中随机选择一条台词显示。

### Q: 可以使用表情符号吗？

A: 可以！但建议适量使用，确保兼容性。

### Q: 如何贡献多语言台词包？

A: 参考现有语言包的格式，创建新的 `{language}.json` 文件即可。

---

有问题或建议？欢迎提交 [Issue](https://github.com/TristanZhang66/window-possum-codex-pet/issues) 或 Pull Request！