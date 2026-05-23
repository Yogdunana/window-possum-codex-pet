/**
 * Window Possum 互动功能模块
 * 提供点击交互、右键菜单、拖拽等功能
 */

class PossumInteractions {
  constructor(possumElement) {
    this.possum = possumElement;
    this.isDragging = false;
    this.dragOffset = { x: 0, y: 0 };
    this.clickCount = 0;
    this.lastClickTime = 0;
    this.longPressTimer = null;
    
    this.init();
  }

  init() {
    this.bindClickEvents();
    this.bindRightClickEvents();
    this.bindDragEvents();
    this.bindHoverEvents();
    this.bindKeyboardEvents();
  }

  bindClickEvents() {
    this.possum.addEventListener('click', (e) => {
      const currentTime = Date.now();
      const timeDiff = currentTime - this.lastClickTime;
      
      if (timeDiff < 300) {
        this.handleDoubleClick(e);
        this.clickCount = 0;
      } else {
        this.clickCount++;
        this.lastClickTime = currentTime;
        
        setTimeout(() => {
          if (this.clickCount === 1) {
            this.handleSingleClick(e);
          }
          this.clickCount = 0;
        }, 300);
      }
    });

    this.possum.addEventListener('mousedown', (e) => {
      this.longPressTimer = setTimeout(() => {
        this.handleLongPress(e);
      }, 800);
    });

    this.possum.addEventListener('mouseup', () => {
      if (this.longPressTimer) {
        clearTimeout(this.longPressTimer);
        this.longPressTimer = null;
      }
    });

    this.possum.addEventListener('mouseleave', () => {
      if (this.longPressTimer) {
        clearTimeout(this.longPressTimer);
        this.longPressTimer = null;
      }
    });
  }

  handleSingleClick(e) {
    this.showSpeechBubble(this.getRandomSaying('generic'));
    this.triggerAnimation('waving');
  }

  handleDoubleClick(e) {
    this.triggerAnimation('jumping');
    this.showSpeechBubble('✨ 双击 detected!');
  }

  handleLongPress(e) {
    this.showQuickMenu(e.clientX, e.clientY);
  }

  bindRightClickEvents() {
    this.possum.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.showContextMenu(e.clientX, e.clientY);
    });
  }

  bindDragEvents() {
    this.possum.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        this.isDragging = true;
        const rect = this.possum.getBoundingClientRect();
        this.dragOffset.x = e.clientX - rect.left;
        this.dragOffset.y = e.clientY - rect.top;
        this.possum.style.cursor = 'grabbing';
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const x = e.clientX - this.dragOffset.x;
        const y = e.clientY - this.dragOffset.y;
        this.possum.style.left = `${x}px`;
        this.possum.style.top = `${y}px`;
        this.possum.style.position = 'fixed';
      }
    });

    document.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.possum.style.cursor = 'grab';
      }
    });
  }

  bindHoverEvents() {
    this.possum.addEventListener('mouseenter', () => {
      this.possum.style.transform = 'scale(1.05)';
      this.possum.style.transition = 'transform 0.2s ease';
    });

    this.possum.addEventListener('mouseleave', () => {
      this.possum.style.transform = 'scale(1)';
    });
  }

  bindKeyboardEvents() {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        this.summonPossum();
      }
      
      if (e.key === 'Escape') {
        this.hideAllMenus();
      }
    });
  }

  showSpeechBubble(text, duration = 3000) {
    const oldBubble = document.querySelector('.possum-speech-bubble');
    if (oldBubble) oldBubble.remove();

    const bubble = document.createElement('div');
    bubble.className = 'possum-speech-bubble';
    bubble.textContent = text;
    bubble.style.cssText = `
      position: absolute;
      background: #fff;
      border: 2px solid #333;
      border-radius: 12px;
      padding: 10px 15px;
      font-size: 14px;
      max-width: 200px;
      word-wrap: break-word;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      animation: bubblePop 0.3s ease;
    `;

    const rect = this.possum.getBoundingClientRect();
    bubble.style.left = `${rect.left + rect.width / 2 - 100}px`;
    bubble.style.top = `${rect.top - 60}px`;

    document.body.appendChild(bubble);

    setTimeout(() => {
      bubble.style.animation = 'bubbleFade 0.3s ease';
      setTimeout(() => bubble.remove(), 300);
    }, duration);
  }

  triggerAnimation(state) {
    if (window.electronAPI) {
      window.electronAPI.setAnimationState(state);
    }
    
    this.possum.classList.add(`anim-${state}`);
    setTimeout(() => {
      this.possum.classList.remove(`anim-${state}`);
    }, 1000);
  }

  showQuickMenu(x, y) {
    const menu = document.createElement('div');
    menu.className = 'possum-quick-menu';
    menu.innerHTML = `
      <div class="menu-item" data-action="feed">🍕 投喂</div>
      <div class="menu-item" data-action="pet">👋 摸摸</div>
      <div class="menu-item" data-action="sleep">😴 睡觉</div>
      <div class="menu-item" data-action="dance">💃 跳舞</div>
    `;
    menu.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      padding: 8px 0;
      z-index: 1001;
      min-width: 120px;
    `;

    menu.querySelectorAll('.menu-item').forEach(item => {
      item.style.cssText = `
        padding: 10px 16px;
        cursor: pointer;
        transition: background 0.2s;
      `;
      item.addEventListener('mouseenter', () => {
        item.style.background = '#f0f0f0';
      });
      item.addEventListener('mouseleave', () => {
        item.style.background = 'transparent';
      });
      item.addEventListener('click', () => {
        this.handleQuickAction(item.dataset.action);
        menu.remove();
      });
    });

    document.body.appendChild(menu);

    setTimeout(() => {
      document.addEventListener('click', function closeMenu(e) {
        if (!menu.contains(e.target)) {
          menu.remove();
          document.removeEventListener('click', closeMenu);
        }
      });
    }, 100);
  }

  showContextMenu(x, y) {
    const menu = document.createElement('div');
    menu.className = 'possum-context-menu';
    menu.innerHTML = `
      <div class="menu-section">
        <div class="menu-title">负鼠控制</div>
        <div class="menu-item" data-action="idle">待机</div>
        <div class="menu-item" data-action="running">运行</div>
        <div class="menu-item" data-action="review">审查</div>
        <div class="menu-item" data-action="waiting">等待</div>
      </div>
      <div class="menu-divider"></div>
      <div class="menu-section">
        <div class="menu-item" data-action="settings">⚙️ 设置</div>
        <div class="menu-item" data-action="about">ℹ️ 关于</div>
      </div>
    `;
    menu.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      padding: 8px 0;
      z-index: 1001;
      min-width: 150px;
      font-size: 13px;
    `;

    menu.querySelectorAll('.menu-title').forEach(title => {
      title.style.cssText = `
        padding: 8px 16px;
        color: #666;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `;
    });

    menu.querySelectorAll('.menu-item').forEach(item => {
      item.style.cssText = `
        padding: 10px 16px;
        cursor: pointer;
        transition: background 0.2s;
      `;
      item.addEventListener('mouseenter', () => {
        item.style.background = '#f0f0f0';
      });
      item.addEventListener('mouseleave', () => {
        item.style.background = 'transparent';
      });
      item.addEventListener('click', () => {
        this.handleContextAction(item.dataset.action);
        menu.remove();
      });
    });

    menu.querySelectorAll('.menu-divider').forEach(div => {
      div.style.cssText = `
        height: 1px;
        background: #e0e0e0;
        margin: 8px 0;
      `;
    });

    document.body.appendChild(menu);

    const rect = menu.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
      menu.style.left = `${x - rect.width}px`;
    }
    if (rect.bottom > window.innerHeight) {
      menu.style.top = `${y - rect.height}px`;
    }

    setTimeout(() => {
      document.addEventListener('click', function closeMenu(e) {
        if (!menu.contains(e.target)) {
          menu.remove();
          document.removeEventListener('click', closeMenu);
        }
      });
    }, 100);
  }

  handleQuickAction(action) {
    const responses = {
      feed: ['🍕 好吃！', '🍔 再来一个！', '🍰 谢谢投喂~'],
      pet: ['😊 舒服~', '😌 继续~', '🥰 被治愈了'],
      sleep: ['😴 zzz...', '🛌 晚安...', '💤 正在充电...'],
      dance: ['💃 摇摆~', '🕺 舞动~', '🎵 跟着节奏~']
    };

    const response = responses[action];
    if (response) {
      this.showSpeechBubble(response[Math.floor(Math.random() * response.length)]);
      this.triggerAnimation(action === 'sleep' ? 'idle' : 'jumping');
    }
  }

  handleContextAction(action) {
    switch (action) {
      case 'idle':
      case 'running':
      case 'review':
      case 'waiting':
        this.triggerAnimation(action);
        break;
      case 'settings':
        this.openSettings();
        break;
      case 'about':
        this.showAbout();
        break;
    }
  }

  getRandomSaying(state) {
    if (window.speechPack && window.speechPack.sayings) {
      const sayings = window.speechPack.sayings[state];
      if (sayings && sayings.length > 0) {
        return sayings[Math.floor(Math.random() * sayings.length)];
      }
    }
    return '...';
  }

  summonPossum() {
    this.possum.style.display = 'block';
    this.triggerAnimation('waving');
    this.showSpeechBubble('负鼠已上线！');
  }

  hideAllMenus() {
    document.querySelectorAll('.possum-quick-menu, .possum-context-menu').forEach(m => m.remove());
  }

  openSettings() {
    if (window.possumSettings) {
      window.possumSettings.show();
    }
  }

  showAbout() {
    this.showSpeechBubble('Window Possum v1.0 🦝');
  }
}

const style = document.createElement('style');
style.textContent = `
  @keyframes bubblePop {
    0% { transform: scale(0) translateY(10px); opacity: 0; }
    50% { transform: scale(1.1) translateY(-5px); }
    100% { transform: scale(1) translateY(0); opacity: 1; }
  }
  
  @keyframes bubbleFade {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(0.9); opacity: 0; }
  }
  
  .anim-jumping {
    animation: jump 0.5s ease;
  }
  
  @keyframes jump {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-30px); }
  }
  
  .anim-waving {
    animation: wave 0.5s ease;
  }
  
  @keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
  }
`;
document.head.appendChild(style);

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PossumInteractions;
}
