/**
 * AudioBot - Accessible Client-Side Voice Reader Engine
 * Zero-Cost, Zero-Dependency Text-to-Speech using W3C Web Speech API
 */

class AudioBot {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.rate = 1.0;
    this.voices = [];
    this.selectedVoice = null;
    this.onStateChangeCallback = null;

    if (this.synth) {
      this.loadVoices();
      if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    const allVoices = this.synth.getVoices();
    // Prioritize Spanish voices (es-*, es-ES, es-MX, es-US, es-PE, etc.)
    this.voices = allVoices.filter(v => v.lang.startsWith('es') || v.lang.startsWith('ES'));
    if (this.voices.length === 0) {
      this.voices = allVoices; // Fallback to all available voices
    }
    if (!this.selectedVoice && this.voices.length > 0) {
      // Prefer neural or natural voices if available
      this.selectedVoice = this.voices.find(v => v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google') || v.name.includes('Sabina') || v.name.includes('Jorge') || v.name.includes('Helena')) || this.voices[0];
    }
  }

  isSupported() {
    return !!this.synth;
  }

  cleanTextForSpeech(rawContent) {
    if (!rawContent) return '';
    return rawContent
      // Remove HTML tags
      .replace(/<[^>]*>/g, ' ')
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, ' Snippet de codigo omitido para la lectura. ')
      // Remove inline code
      .replace(/`([^`]+)`/g, '$1')
      // Remove markdown links [text](url) -> text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove markdown headers #, ##, ###
      .replace(/#{1,6}\s+/g, '')
      // Remove bold/italics markers
      .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')
      // Remove markdown blockquotes
      .replace(/^\s*>\s+/gm, '')
      // Remove table formatting pipes
      .replace(/\|/g, ' ')
      // Remove dashes/bullets
      .replace(/^\s*[-*+]\s+/gm, '')
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      .trim();
  }

  speak(text, onEnd) {
    if (!this.synth) return;
    this.stop();

    const cleanText = this.cleanTextForSpeech(text);
    if (!cleanText) return;

    this.currentUtterance = new SpeechSynthesisUtterance(cleanText);
    this.currentUtterance.rate = this.rate;
    this.currentUtterance.pitch = 1.0;
    this.currentUtterance.lang = this.selectedVoice ? this.selectedVoice.lang : 'es-ES';

    if (this.selectedVoice) {
      this.currentUtterance.voice = this.selectedVoice;
    }

    this.currentUtterance.onstart = () => {
      this.isPlaying = true;
      this.isPaused = false;
      this.notifyState();
    };

    this.currentUtterance.onpause = () => {
      this.isPlaying = true;
      this.isPaused = true;
      this.notifyState();
    };

    this.currentUtterance.onresume = () => {
      this.isPlaying = true;
      this.isPaused = false;
      this.notifyState();
    };

    this.currentUtterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.notifyState();
      if (typeof onEnd === 'function') onEnd();
    };

    this.currentUtterance.onerror = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.notifyState();
    };

    this.synth.speak(this.currentUtterance);
  }

  pause() {
    if (!this.synth) return;
    if (this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.isPaused = true;
      this.notifyState();
    }
  }

  resume() {
    if (!this.synth) return;
    if (this.synth.paused) {
      this.synth.resume();
      this.isPaused = false;
      this.notifyState();
    }
  }

  stop() {
    if (!this.synth) return;
    this.synth.cancel();
    this.isPlaying = false;
    this.isPaused = false;
    this.notifyState();
  }

  setRate(rateValue) {
    this.rate = parseFloat(rateValue) || 1.0;
    if (this.isPlaying && !this.isPaused && this.currentUtterance) {
      // Re-trigger speech from current position if needed or adjust for next
    }
  }

  setVoice(voiceName) {
    const v = this.voices.find(x => x.name === voiceName);
    if (v) this.selectedVoice = v;
  }

  onStateChange(cb) {
    this.onStateChangeCallback = cb;
  }

  notifyState() {
    if (typeof this.onStateChangeCallback === 'function') {
      this.onStateChangeCallback({
        isPlaying: this.isPlaying,
        isPaused: this.isPaused,
        rate: this.rate,
        voice: this.selectedVoice ? this.selectedVoice.name : 'Predeterminada'
      });
    }
  }

  renderControlBar(mountElementId, textProvider) {
    const mount = document.getElementById(mountElementId);
    if (!mount) return;

    if (!this.isSupported()) {
      mount.innerHTML = `
        <div class="audiobot-toolbar disabled">
          <span class="audiobot-status">Sintesis de voz no disponible en este navegador</span>
        </div>
      `;
      return;
    }

    mount.innerHTML = `
      <div class="audiobot-toolbar" id="audiobot-panel">
        <div class="audiobot-left">
          <div class="audiobot-badge">
            <i class="fas fa-headphones"></i>
            <span>Audio Lectura</span>
          </div>
          <div class="audiobot-indicator ${this.isPlaying && !this.isPaused ? 'active' : ''}" id="audiobot-wave">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
        </div>

        <div class="audiobot-center">
          <button class="audiobot-btn primary" id="btn-audiobot-toggle" title="Reproducir / Pausar lectura (Alt + P)">
            <i class="fas ${this.isPlaying && !this.isPaused ? 'fa-pause' : 'fa-play'}"></i>
            <span id="audiobot-play-label">${this.isPlaying && !this.isPaused ? 'Pausar' : (this.isPaused ? 'Reanudar' : 'Escuchar Sesion')}</span>
          </button>
          <button class="audiobot-btn secondary" id="btn-audiobot-stop" title="Detener audio" ${!this.isPlaying ? 'disabled' : ''}>
            <i class="fas fa-stop"></i>
            <span>Detener</span>
          </button>
        </div>

        <div class="audiobot-right">
          <div class="audiobot-select-wrap">
            <i class="fas fa-gauge-high"></i>
            <select id="audiobot-rate-select" class="audiobot-select" title="Velocidad de reproduccion">
              <option value="0.8" ${this.rate === 0.8 ? 'selected' : ''}>0.8x</option>
              <option value="1.0" ${this.rate === 1.0 ? 'selected' : ''}>1.0x (Normal)</option>
              <option value="1.25" ${this.rate === 1.25 ? 'selected' : ''}>1.25x</option>
              <option value="1.5" ${this.rate === 1.5 ? 'selected' : ''}>1.5x</option>
            </select>
          </div>

          ${this.voices.length > 0 ? `
            <div class="audiobot-select-wrap voice-selector-wrap">
              <i class="fas fa-volume-high"></i>
              <select id="audiobot-voice-select" class="audiobot-select" title="Voz del lector">
                ${this.voices.map(v => `
                  <option value="${v.name}" ${this.selectedVoice && this.selectedVoice.name === v.name ? 'selected' : ''}>
                    ${v.name.length > 25 ? v.name.substring(0, 25) + '...' : v.name}
                  </option>
                `).join('')}
              </select>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    // Event Bindings
    const toggleBtn = mount.querySelector('#btn-audiobot-toggle');
    const stopBtn = mount.querySelector('#btn-audiobot-stop');
    const rateSelect = mount.querySelector('#audiobot-rate-select');
    const voiceSelect = mount.querySelector('#audiobot-voice-select');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (!this.isPlaying) {
          const text = typeof textProvider === 'function' ? textProvider() : textProvider;
          this.speak(text);
        } else if (this.isPaused) {
          this.resume();
        } else {
          this.pause();
        }
      });
    }

    if (stopBtn) {
      stopBtn.addEventListener('click', () => {
        this.stop();
      });
    }

    if (rateSelect) {
      rateSelect.addEventListener('change', (e) => {
        this.setRate(e.target.value);
        if (this.isPlaying) {
          const text = typeof textProvider === 'function' ? textProvider() : textProvider;
          this.speak(text);
        }
      });
    }

    if (voiceSelect) {
      voiceSelect.addEventListener('change', (e) => {
        this.setVoice(e.target.value);
        if (this.isPlaying) {
          const text = typeof textProvider === 'function' ? textProvider() : textProvider;
          this.speak(text);
        }
      });
    }

    this.onStateChange((state) => {
      const pLabel = document.getElementById('audiobot-play-label');
      const wave = document.getElementById('audiobot-wave');
      const playIcon = toggleBtn ? toggleBtn.querySelector('i') : null;

      if (playIcon) {
        playIcon.className = state.isPlaying && !state.isPaused ? 'fas fa-pause' : 'fas fa-play';
      }
      if (pLabel) {
        pLabel.textContent = state.isPlaying && !state.isPaused ? 'Pausar' : (state.isPaused ? 'Reanudar' : 'Escuchar Sesion');
      }
      if (wave) {
        if (state.isPlaying && !state.isPaused) wave.classList.add('active');
        else wave.classList.remove('active');
      }
      if (stopBtn) {
        stopBtn.disabled = !state.isPlaying;
      }
    });
  }
}

window.AudioBot = AudioBot;
