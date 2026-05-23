# Speech Pack

Window Possum 的台词包放在 `speech/` 目录下，目前支持以下语言：

| 语言 | 文件 | 状态 |
| --- | --- | --- |
| 简体中文 | `speech/zh-CN.json` | ✅ 完整 |
| English | `speech/en.json` | ✅ 完整 |
| 日本語 | `speech/ja.json` | ✅ 完整 |
| 한국어 | `speech/ko.json` | ✅ 完整 |

注意：台词包是 sidecar 文件，不是当前官方 Codex Pet manifest 的一部分。现在的官方本地宠物包只需要 `pet.json` 和 `spritesheet.webp`，所以仓库保留标准结构，避免安装时因为额外字段或非标准 schema 出问题。

换句话说：

- 直接安装宠物：只用 `window-possum/`
- 想做自定义气泡、fork Codex/OpenPets、或者给自己的 overlay 接台词：用 `speech/*.json`

## 结构

每个台词包遵循相同的 schema：

```text
speech/<lang>.json
├── schema
├── language
├── petId
├── tone
├── memeContext
└── sayings
    ├── idle
    ├── running
    ├── waiting
    ├── review
    ├── failed
    ├── waving
    ├── jumping
    ├── running-right
    ├── running-left
    ├── generic
    └── codexEvents
        ├── thinking
        ├── shell
        ├── editing
        ├── testing
        ├── git
        ├── done
        ├── deploying
        ├── debugging
        ├── refactoring
        ├── merge-conflict
        └── installing
```

普通状态名和 Codex Pet 动画状态保持一致。`codexEvents` 是给未来集成用的更细事件。

## 推荐用法

```js
import speechPack from "./speech/zh-CN.json" assert { type: "json" };

function pickPossumLine(state, event) {
  const sayings = speechPack.sayings;
  const eventLines = event ? sayings.codexEvents?.[event] : null;
  const stateLines = sayings[state];
  const pool = eventLines || stateLines || sayings.generic;

  return pool[Math.floor(Math.random() * pool.length)];
}
```

## 添加新语言

欢迎贡献新的语言台词包！步骤：

1. 复制 `speech/zh-CN.json` 作为模板
2. 修改 `language` 字段为对应的 IETF BCP 47 语言标签（如 `en`、`ja`、`ko`、`fr`、`de`）
3. 将 `displayName` 和 `description` 翻译为目标语言
4. 将 `tone` 和 `memeContext` 替换为目标语言文化中对应的梗/语境
5. 翻译/改编 `sayings` 中的所有台词——**不要直译**，要用目标语言的互联网文化中对应的梗感
6. 确保所有状态和事件的 key 与 `zh-CN.json` 保持一致
7. 提交 PR，并在本文件顶部的语言表格中添加新行

## 文风规则

这只负鼠可以阴阳怪气，但不要真的攻击用户、同事、群体或具体个人。

建议：

- 每句尽量短，适合气泡显示
- 围绕"打工人""低能量""班味""背手凝视""开发者日常"
- 可以抽象，可以自嘲，可以很损，但别变成辱骂
- 不要提交整段复制来的网络热梗文案
- 不要加入自伤鼓励、仇恨、骚扰或露骨内容

## 梗感来源

台词包主要参考最近中文互联网仍在高频传播的几个语境：

- `背手负鼠`：侧身、背手、凝视远方，适合"认真但荒诞"的沉默幽默
- `鼠鼠文学`：用"鼠鼠我啊"的自嘲第一人称包装脆弱感
- `低能量老鼠人`：拖延、低社交电量、低功耗活着
- `班味/去班味`：打工人被工作浸入后的精神气味
- `牛马/脆皮打工人`：自嘲式劳动处境和身心易碎感
- `发疯文学/精神离职`：在工位上保持体面，精神已经出走

英文台词包参考的语境：

- `quiet quitting`：精神离职的英文版
- `this is fine`：经典"一切还好"自嘲
- `corporate meme`：企业文化梗
- `burnout humor`：倦怠幽默
- `per my last email`：经典职场被动攻击

日韩台词包参考的语境：

- `社畜/직장인`：东亚共通的职场自嘲文化
- `残業文化/야근 문화`：加班文化
- `燃え尽き症候群/번아웃`：倦怠感
- `精神の退勤/정신적 퇴근`：精神退勤

这些梗会变老，所以欢迎继续投喂新的"负鼠精神状态"。但有一条底线：再抽象，也要让它像一只正在窗边背手的负鼠会说的话。
