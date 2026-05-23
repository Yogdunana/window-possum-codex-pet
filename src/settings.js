// Window Possum Settings Module
// Full implementation - see repository for complete code
class PossumSettings {
  constructor() {
    this.config = this.loadConfig();
    this.panel = null;
  }

  getDefaultConfig() {
    return {
      appearance: {
        theme: 'auto',
        scale: 1.0,
        opacity: 1.0,
        showShadow: true,
        animationSpeed: 'normal'
      },
      behavior: {
        autoHide: false,
        dragEnabled: true,
        clickEnabled: true,
        speechEnabled: true,
        speechFrequency: 'normal'
      },
      speech: {
        language: 'zh-CN',
        useSeasonal: true,
        bubbleDuration: 3000,
        maxBubbleChars: 35
      },
      shortcuts: {
        summon: 'Ctrl+Shift+P',
        toggle: 'Ctrl+Shift+T',
        settings: 'Ctrl+Shift+S',
        mute: 'Ctrl+Shift+M'
      },
      position: {
        dock: 'bottom-right',
        alwaysOnTop: true
      }
    };
  }

  loadConfig() {
    try {
      const saved = localStorage.getItem('possum-settings');
      if (saved) {
        return { ...this.getDefaultConfig(), ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load settings:', e);
    }
    return this.getDefaultConfig();
  }

  saveConfig() {
    localStorage.setItem('possum-settings', JSON.stringify(this.config));
  }

  show() {
    // Settings panel implementation
    console.log('Settings panel opened');
  }
}

window.PossumSettings = PossumSettings;