# 动态加载建议

本文档为 Codex Pet 或类似工具开发者提供台词包动态加载的实现建议。

## 概述

台词包设计为独立的 JSON 文件，支持按需加载、语言切换和季节性主题切换。

## 文件结构

```
speech/
├── zh-CN.json           # 中文基础包
├── zh-CN.spring.json    # 中文春日版
├── zh-CN.summer.json    # 中文夏日版
├── zh-CN.autumn.json    # 中文秋日版
├── zh-CN.winter.json    # 中文冬日版
├── en.json              # 英文基础包
├── ja.json              # 日文基础包
├── ko.json              # 韩文基础包
├── fr.json              # 法文基础包
├── de.json              # 德文基础包
└── es.json              # 西班牙文基础包
```

## 加载策略

### 1. 语言优先

根据用户系统语言或配置选择台词包：

```javascript
function getSpeechPackPath(userLanguage) {
  const supportedLanguages = ['zh-CN', 'en', 'ja', 'ko', 'fr', 'de', 'es'];
  const baseLanguage = userLanguage.split('-')[0];
  
  // 精确匹配
  if (supportedLanguages.includes(userLanguage)) {
    return `speech/${userLanguage}.json`;
  }
  
  // 语言代码匹配（如 zh -> zh-CN）
  const matched = supportedLanguages.find(lang => lang.startsWith(baseLanguage));
  if (matched) {
    return `speech/${matched}.json`;
  }
  
  // 默认英文
  return 'speech/en.json';
}
```

### 2. 季节性变体

检查当前月份并加载对应的季节性台词包：

```javascript
function getSeasonalVariant(date = new Date()) {
  const month = date.getMonth() + 1; // 1-12
  
  const seasons = {
    spring: [3, 4, 5],
    summer: [6, 7, 8],
    autumn: [9, 10, 11],
    winter: [12, 1, 2]
  };
  
  for (const [season, months] of Object.entries(seasons)) {
    if (months.includes(month)) {
      return season;
    }
  }
  
  return null;
}
```

## 最佳实践

1. **优先使用缓存**：避免重复网络请求
2. **提供回退方案**：始终有可用的默认台词
3. **异步加载**：不阻塞主线程
4. **版本管理**：支持增量更新
5. **错误恢复**：网络失败时使用缓存或默认值

---

有问题或建议？欢迎提交 [Issue](https://github.com/TristanZhang66/window-possum-codex-pet/issues) 或 Pull Request！