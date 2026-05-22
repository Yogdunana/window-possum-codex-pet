# Window Possum Codex Pet

一只站在窗边、双手背后、正在用沉默审阅你人生进度条的 Codex Pet。

它的工作方式很简单：你写代码，它背手；Codex 跑任务，它背手；测试挂了，它还是背手。稳定得像 CI 里的一个哲学问题。

![Window Possum contact sheet](./preview/contact-sheet.png)

## 这是什么

`Window Possum` 是一个自定义 [Codex Pet](https://developers.openai.com/codex/app/settings) 包，包含：

```text
window-possum/
├── pet.json
└── spritesheet.webp
```

Codex 会读取 `~/.codex/pets/<pet-id>/` 下面的本地宠物包。这个包已经按 Codex Pet 的固定 atlas 格式制作：

```text
1536 x 1872
8 columns x 9 rows
192 x 208 per cell
transparent background
```

支持的状态包括：

```text
idle
running-right
running-left
waving
jumping
failed
waiting
running
review
```

## 安装

克隆仓库：

```bash
git clone https://github.com/TristanZhang66/window-possum-codex-pet.git
cd window-possum-codex-pet
```

复制到 Codex 的本地宠物目录：

```bash
mkdir -p ~/.codex/pets
cp -R window-possum ~/.codex/pets/
```

或者直接运行：

```bash
./install.sh
```

然后打开 Codex：

1. 进入 `Settings > Appearance > Pets`
2. 点击 `Refresh local pets`
3. 选择 `Window Possum`
4. 开始被它背手凝视

## 预览

| State | Preview |
| --- | --- |
| idle | ![idle](./preview/idle.gif) |
| running-right | ![running-right](./preview/running-right.gif) |
| running-left | ![running-left](./preview/running-left.gif) |
| waiting | ![waiting](./preview/waiting.gif) |
| running | ![running](./preview/running.gif) |
| review | ![review](./preview/review.gif) |
| failed | ![failed](./preview/failed.gif) |

## 梗从哪里来

短版：这是一只「背手负鼠」精神状态外接 Codex。

稍微长一点：中文互联网最近一波负鼠表情包的核心视觉是“背手站立、眼神空洞、姿态认真但荒诞”。新浪的实时收集页把它概括成“背手负鼠”，并提到这类图靠呆滞的背手姿态和生无可恋的视觉冲击形成共鸣。

再往前看，它和这几年中文互联网的“鼠鼠文学”“低能量老鼠人”是一条情绪河流里的邻居：

- “鼠鼠文学”把“鼠鼠我啊”变成自嘲第一人称，用可爱外壳承载生活被按在地上摩擦后的碎碎念。
- “低能量老鼠人”把当代年轻人的疲惫、拖延、社交退缩和自我保护，压缩成一种“我先窝一下”的生活姿态。
- “背手负鼠”则更像这套精神宇宙里的中层干部：不解释，不发疯，只背着手看窗外，好像刚刚审批完宇宙的请假流程。

这个 Codex Pet 版本把它移植成开发者语境：

- `idle`：我在，但我不想打扰你。
- `waiting`：你要不要批一下权限。
- `running`：我正在努力，虽然看起来只是在背手。
- `review`：这段代码，嗯，有点意思。
- `failed`：没关系，失败也是一种输出。

参考阅读：

- [Codex app settings: Pets](https://developers.openai.com/codex/app/settings)
- [背手负鼠表情包 - 新浪新闻](https://www.sina.cn/news/detail/5299656603211951.html)
- [“鼠鼠文学”，为什么火了？ - 虎嗅](https://m.huxiu.com/article/775552.html)
- [洗澡都要拖到后半夜：我们为何成了低能量的“老鼠人”？ - 虎嗅](https://www.huxiu.com/article/4089751.html)

## 文件说明

`window-possum/pet.json`:

```json
{
  "id": "window-possum",
  "displayName": "Window Possum",
  "description": "A thoughtful 3D animated possum gazing out the window with its hands clasped behind its back.",
  "spritesheetPath": "spritesheet.webp"
}
```

`window-possum/spritesheet.webp` 是实际动画图集。

`preview/` 里是预览图和每个状态的 GIF，方便你在安装前先确认：这只负鼠确实很会背手。

## 二创

欢迎 fork，欢迎二创，欢迎把它改成：

- 你的公司 mascot
- 每天看 Jira 的版本
- 永远等 CI 的版本
- 正在被 TypeScript 凝视的版本

只要还保留那个灵魂姿势：侧身，背手，凝视远方。

## 授权

本仓库中的生成宠物资产以 [CC BY 4.0](./LICENSE) 授权发布。

你可以使用、修改、再分发，但请保留署名。原始网络表情包和参考图不包含在本仓库授权范围内。
