# Speech Pack

`speech/zh-CN.json` 是 Window Possum 的中文台词包。

注意：它是一个 sidecar 文件，不是当前官方 Codex Pet manifest 的一部分。现在的官方本地宠物包只需要 `pet.json` 和 `spritesheet.webp`，所以仓库保留标准结构，避免安装时因为额外字段或非标准 schema 出问题。

换句话说：

- 直接安装宠物：只用 `window-possum/`
- 想做自定义气泡、fork Codex/OpenPets、或者给自己的 overlay 接台词：用 `speech/zh-CN.json`

## 结构

```text
speech/zh-CN.json
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
```

普通状态名和 Codex Pet 动画状态保持一致。`codexEvents` 是给未来集成用的更细事件，比如 `editing`、`testing`、`git`、`done`。

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

## 文风规则

这只负鼠可以阴阳怪气，但不要真的攻击用户、同事、群体或具体个人。

建议：

- 每句尽量短，适合气泡显示
- 围绕“打工人”“低能量”“班味”“背手凝视”“开发者日常”
- 可以抽象，可以自嘲，可以很损，但别变成辱骂
- 不要提交整段复制来的网络热梗文案
- 不要加入自伤鼓励、仇恨、骚扰或露骨内容

## 梗感来源

台词包主要参考最近中文互联网仍在高频传播的几个语境：

- `背手负鼠`：侧身、背手、凝视远方，适合“认真但荒诞”的沉默幽默
- `鼠鼠文学`：用“鼠鼠我啊”的自嘲第一人称包装脆弱感
- `低能量老鼠人`：拖延、低社交电量、低功耗活着
- `班味/去班味`：打工人被工作浸入后的精神气味
- `牛马/脆皮打工人`：自嘲式劳动处境和身心易碎感
- `发疯文学/精神离职`：在工位上保持体面，精神已经出走

这些梗会变老，所以欢迎继续投喂新的“负鼠精神状态”。但有一条底线：再抽象，也要让它像一只正在窗边背手的负鼠会说的话。
