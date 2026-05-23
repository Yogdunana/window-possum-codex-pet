// Window Possum Widgets Module
// Provides clock, weather, system monitor, todo list, pomodoro
class PossumWidgets {
  constructor(possumElement) {
    this.possum = possumElement;
    this.widgets = new Map();
    this.init();
  }

  init() {
    this.createWidgetContainer();
    this.initClock();
    this.initPomodoro();
  }

  createWidgetContainer() {
    this.container = document.createElement('div');
    this.container.className = 'possum-widgets-container';
    this.container.style.cssText = `
      position: fixed;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 999;
    `;
    document.body.appendChild(this.container);
  }

  initClock() {
    const clock = document.createElement('div');
    clock.className = 'possum-widget clock-widget';
    clock.innerHTML = `
      <div class="widget-icon">🕐</div>
      <div class="widget-content">
        <div class="time">00:00</div>
        <div class="date">--/--</div>
      </div>
    `;
    clock.style.cssText = this.getWidgetStyle();
    this.container.appendChild(clock);

    const updateClock = () => {
      const now = new Date();
      clock.querySelector('.time').textContent = now.toLocaleTimeString('zh-CN', { 
        hour: '2-digit', minute: '2-digit' 
      });
      clock.querySelector('.date').textContent = now.toLocaleDateString('zh-CN', { 
        month: 'short', day: 'numeric', weekday: 'short'
      });
    };

    updateClock();
    setInterval(updateClock, 1000);
    this.widgets.set('clock', clock);
  }

  initPomodoro() {
    const pomodoro = document.createElement('div');
    pomodoro.className = 'possum-widget pomodoro-widget';
    pomodoro.innerHTML = `
      <div class="widget-header">
        <span class="widget-icon">🍅</span>
        <span class="widget-title">番茄钟</span>
      </div>
      <div class="timer">25:00</div>
      <div class="controls">
        <button class="start-btn">▶️</button>
        <button class="reset-btn">🔄</button>
      </div>
    `;
    pomodoro.style.cssText = this.getWidgetStyle() + ' text-align: center;';
    this.container.appendChild(pomodoro);
    this.widgets.set('pomodoro', pomodoro);
  }

  getWidgetStyle() {
    return `
      background: #fff;
      border-radius: 12px;
      padding: 12px 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 140px;
    `;
  }
}

window.PossumWidgets = PossumWidgets;