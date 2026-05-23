// Window Possum Main Entry
// Integrates all modules
class WindowPossum {
  constructor() {
    this.container = null;
    this.interactions = null;
    this.settings = null;
    this.widgets = null;
    this.ai = null;
  }

  async init() {
    this.createContainer();
    
    if (typeof PossumSettings !== 'undefined') {
      this.settings = new PossumSettings();
      window.possumSettings = this.settings;
    }
    
    if (typeof PossumInteractions !== 'undefined') {
      this.interactions = new PossumInteractions(this.container);
      window.possumInteractions = this.interactions;
    }
    
    if (typeof PossumWidgets !== 'undefined') {
      this.widgets = new PossumWidgets(this.container);
      window.possumWidgets = this.widgets;
    }
    
    if (typeof PossumAI !== 'undefined') {
      this.ai = new PossumAI(this.container);
      window.possumAI = this.ai;
    }

    console.log('🦝 Window Possum initialized!');
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.className = 'possum-container';
    this.container.innerHTML = `
      <div class="possum-sprite">
        <img src="window-possum/spritesheet.webp" alt="Window Possum" width="192" height="208">
      </div>
    `;
    this.container.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 192px;
      height: 208px;
      z-index: 9999;
      cursor: grab;
      user-select: none;
    `;
    document.body.appendChild(this.container);
  }
}

const possum = new WindowPossum();
if (document.readyState !== 'loading') {
  possum.init();
} else {
  document.addEventListener('DOMContentLoaded', () => possum.init());
}

window.WindowPossum = WindowPossum;
window.possum = possum;