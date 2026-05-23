// Window Possum AI Chat Module
// Provides code context awareness and smart comments
class PossumAI {
  constructor(possumElement) {
    this.possum = possumElement;
    this.context = {
      currentFile: null,
      recentErrors: [],
      lastActivity: Date.now()
    };
  }

  speak(message) {
    if (window.possumInteractions) {
      window.possumInteractions.showSpeechBubble(message);
    } else {
      console.log(`[Possum AI] ${message}`);
    }
  }

  analyzeCode(code, language) {
    const suggestions = [];
    
    // Check function length
    const functionMatches = code.match(/function\s+\w+\s*\([^)]*\)\s*\{[\s\S]*?\}/g);
    if (functionMatches) {
      for (const func of functionMatches) {
        if (func.split('\n').length > 50) {
          suggestions.push({
            type: 'longFunction',
            message: '这个函数有点长，考虑拆分一下？'
          });
        }
      }
    }

    return suggestions;
  }

  respondToUser(input) {
    const responses = {
      'hello': ['你好！今天写代码了吗？', 'Hi！有什么我可以帮你的吗？'],
      'help': ['我可以帮你检查代码、给建议', '试试问我关于代码的问题'],
      'bug': ['有 bug？让我看看', 'bug 是程序员的日常'],
      'tired': ['累了就休息一下吧', '去倒杯水，活动一下'],
      'done': ['完成了？恭喜！', 'Good job！']
    };

    const lowerInput = input.toLowerCase();
    for (const [keyword, replies] of Object.entries(responses)) {
      if (lowerInput.includes(keyword)) {
        return replies[Math.floor(Math.random() * replies.length)];
      }
    }

    return '我在听，继续说...';
  }
}

window.PossumAI = PossumAI;