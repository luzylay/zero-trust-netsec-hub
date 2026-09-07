/**
 * AudioBot - Accessible Client-Side Voice Reader Engine
 * Zero-Cost, Zero-Dependency Text-to-Speech using W3C Web Speech API
 * Features: Sentence chunking queue, Chromium keepalive heartbeat,
 * multi-listener event bus with cleanup, natural voice auto-discovery,
 * and comprehensive session playback controls.
 */

class AudioBot {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.chunks = [];
    this.currentChunkIdx = 0;
    this.isPlaying = false;
    this.isPaused = false;
    this.rate = 1.0;
    this.voices = [];
    this.selectedVoice = null;
    this.listeners = [];
    this.keepAliveTimer = null;
    this.currentTextProvider = null;
    this.activeMountCleanup = null;

    if (this.synth) {
      this.loadVoices();
      if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = () => {
          this.loadVoices();
          this.updateVoiceDropdowns();
        };
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    const allVoices = this.synth.getVoices();
    // Prioritize Spanish voices
    this.voices = allVoices.filter(v => v.lang.startsWith('es') || v.lang.startsWith('ES'));
    if (this.voices.length === 0) {
      this.voices = allVoices;
    }
    if (!this.selectedVoice && this.voices.length > 0) {
      this.selectedVoice = this.voices.find(v => 
        v.name.includes('Natural') || 
        v.name.includes('Neural') || 
        v.name.includes('Google') || 
        v.name.includes('Sabina') || 
        v.name.includes('Jorge') || 
        v.name.includes('Helena') ||
        v.name.includes('Monica') ||
        v.name.includes('Paulina')
      ) || this.voices[0];
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
      // Replace code blocks with descriptive spoken summary
      .replace(/```[\s\S]*?```/g, ' . Bloque de comandos omitido de la narracion. ')
      // Remove inline code backticks
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

  splitIntoSentences(text) {
    const clean = this.cleanTextForSpeech(text);
    if (!clean) return [];
    // Split by sentence terminators
    const rawMatches = clean.match(/[^.!?\n]+[.!?\n]+/g);
    if (!rawMatches || rawMatches.length === 0) {
      return [clean];
    }
    return rawMatches.map(s => s.trim()).filter(s => s.length > 0);
  }

  speak(text) {
    if (!this.synth) return;
    this.stop();

    this.chunks = this.splitIntoSentences(text);
    if (this.chunks.length === 0) return;

    this.currentChunkIdx = 0;
    this.isPlaying = true;
    this.isPaused = false;
    this.notifyState();
    this.startKeepAlive();
    this.playNextChunk();
  }

  playNextChunk() {
    if (!this.synth || !this.isPlaying || this.isPaused) return;

    if (this.currentChunkIdx >= this.chunks.length) {
      this.stop();
      return;
    }

    const chunkText = this.chunks[this.currentChunkIdx];
    const utterance = new SpeechSynthesisUtterance(chunkText);
    utterance.rate = this.rate;
    utterance.pitch = 1.0;
    utterance.lang = this.selectedVoice ? this.selectedVoice.lang : 'es-ES';

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    utterance.onend = () => {
      if (this.isPlaying && !this.isPaused) {
        this.currentChunkIdx++;
        this.playNextChunk();
      }
    };

    utterance.onerror = (e) => {
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      this.currentChunkIdx++;
      this.playNextChunk();
    };

    this.synth.speak(utterance);
  }

  pause() {
    if (!this.synth) return;
    if (this.isPlaying && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
      this.stopKeepAlive();
      this.notifyState();
    }
  }

  resume() {
    if (!this.synth) return;
    if (this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      this.startKeepAlive();
      this.notifyState();
    }
  }

  stop() {
    if (!this.synth) return;
    this.stopKeepAlive();
    this.synth.cancel();
    this.chunks = [];
    this.currentChunkIdx = 0;
    this.isPlaying = false;
    this.isPaused = false;
    this.notifyState();
  }

  setRate(rateValue) {
    this.rate = parseFloat(rateValue) || 1.0;
    if (this.isPlaying && !this.isPaused) {
      this.synth.cancel();
      this.playNextChunk();
    }
  }

  setVoice(voiceName) {
    const v = this.voices.find(x => x.name === voiceName);
    if (v) {
      this.selectedVoice = v;
      if (this.isPlaying && !this.isPaused) {
        this.synth.cancel();
        this.playNextChunk();
      }
    }
  }

  startKeepAlive() {
    this.stopKeepAlive();
    // Chromium bugfix: SpeechSynthesis pauses after ~15 seconds on long text
    this.keepAliveTimer = setInterval(() => {
      if (this.synth && this.isPlaying && !this.isPaused) {
        this.synth.pause();
        this.synth.resume();
      }
    }, 10000);
  }

  stopKeepAlive() {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }

  onStateChange(cb) {
    if (typeof cb === 'function') {
      this.listeners.push(cb);
      // Return unregister callback for clean component lifecycle
      return () => {
        this.listeners = this.listeners.filter(l => l !== cb);
      };
    }
    return () => {};
  }

  notifyState() {
    const state = {
      isPlaying: this.isPlaying,
      isPaused: this.isPaused,
      rate: this.rate,
      voice: this.selectedVoice ? this.selectedVoice.name : 'Predeterminada',
      progress: this.chunks.length > 0 ? Math.round((this.currentChunkIdx / this.chunks.length) * 100) : 0
    };
    this.listeners.forEach(cb => {
      try { cb(state); } catch (e) {}
    });
  }

  updateVoiceDropdowns() {
    document.querySelectorAll('.audiobot-voice-select').forEach(select => {
      const currentVal = select.value;
      select.innerHTML = this.voices.map(v => `
        <option value="${v.name}" ${this.selectedVoice && this.selectedVoice.name === v.name ? 'selected' : ''}>
          ${v.name.length > 25 ? v.name.substring(0, 25) + '...' : v.name}
        </option>
      `).join('');
      if (currentVal) select.value = currentVal;
    });
  }

  renderControlBar(mountElementId, textProvider) {
    const mount = document.getElementById(mountElementId);
    if (!mount) return;

    this.currentTextProvider = textProvider;

    // Clean up previous active mount listener
    if (typeof this.activeMountCleanup === 'function') {
      this.activeMountCleanup();
      this.activeMountCleanup = null;
    }

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
          <button class="audiobot-btn primary" id="btn-audiobot-toggle" title="Reproducir / Pausar lectura de la sesion (Alt + P)">
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
              <select id="audiobot-voice-select" class="audiobot-select audiobot-voice-select" title="Voz del lector">
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
      });
    }

    if (voiceSelect) {
      voiceSelect.addEventListener('change', (e) => {
        this.setVoice(e.target.value);
      });
    }

    this.activeMountCleanup = this.onStateChange((state) => {
      const pLabel = mount.querySelector('#audiobot-play-label');
      const wave = mount.querySelector('#audiobot-wave');
      const playIcon = toggleBtn ? toggleBtn.querySelector('i') : null;
      const sBtn = mount.querySelector('#btn-audiobot-stop');

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
      if (sBtn) {
        sBtn.disabled = !state.isPlaying;
      }
    });
  }
}

window.AudioBot = AudioBot;
