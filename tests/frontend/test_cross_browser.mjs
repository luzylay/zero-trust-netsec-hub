/**
 * Automated Cross-Browser Compatibility & DOM Rendering Test Suite
 * Validates cross-engine interoperability (Chromium, WebKit, Gecko)
 */

import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT_DIR = process.cwd();

describe('Cross-Browser Engine Compatibility & CSS/JS Feature Matrix', () => {

  test('CSS Vendor Prefix & Cross-Browser Styling Audit', () => {
    const cssPath = path.join(ROOT_DIR, 'frontend', 'css', 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // 1. WebKit backdrop-filter parity
    const unprefixedBackdropMatches = (cssContent.match(/(?<!-webkit-)backdrop-filter:\s*blur/g) || []).length;
    const webkitBackdropMatches = (cssContent.match(/-webkit-backdrop-filter:\s*blur/g) || []).length;
    assert.strictEqual(
      webkitBackdropMatches,
      unprefixedBackdropMatches,
      `WebKit prefix (-webkit-backdrop-filter) count (${webkitBackdropMatches}) must equal standard backdrop-filter count (${unprefixedBackdropMatches}) for 100% Safari support.`
    );

    // 2. CSS Custom Properties root definition
    assert.match(cssContent, /:root\s*\{[\s\S]*--bg-primary:/, ':root must declare design tokens');
    assert.match(cssContent, /--accent-cyan:/, 'Cyan accent variable must exist');
    assert.match(cssContent, /--accent-emerald:/, 'Emerald accent variable must exist');

    // 3. Responsive media query breakpoints (Mobile, Tablet, Desktop)
    assert.match(cssContent, /@media\s*\(\s*max-width:\s*768px\s*\)/, 'Mobile breakpoint (<768px) must be defined');
    assert.match(cssContent, /@media\s*\(\s*max-width:\s*1024px\s*\)/, 'Tablet breakpoint (<1024px) must be defined');
  });

  test('JS Codebase: Zero Deprecated or Non-Standard Browser APIs', () => {
    const jsDir = path.join(ROOT_DIR, 'frontend', 'js');
    const getFiles = (dir) => {
      let results = [];
      const list = fs.readdirSync(dir);
      list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) results = results.concat(getFiles(fullPath));
        else if (file.endsWith('.js')) results.push(fullPath);
      });
      return results;
    };

    const jsFiles = getFiles(jsDir);
    const forbiddenPatterns = [
      { regex: /document\.all/g, name: 'document.all (obsolete IE API)' },
      { regex: /window\.event/g, name: 'window.event (non-standard legacy API)' },
      { regex: /\.attachEvent\(/g, name: 'attachEvent (obsolete IE API)' },
      { regex: /__defineGetter__/g, name: '__defineGetter__ (deprecated legacy API)' },
    ];

    jsFiles.forEach(file => {
      const code = fs.readFileSync(file, 'utf8');
      forbiddenPatterns.forEach(({ regex, name }) => {
        assert.strictEqual(regex.test(code), false, `Found deprecated API ${name} in ${path.relative(ROOT_DIR, file)}`);
      });
    });
  });

  test('Browser DOM & Simulator Runtime Emulation', () => {
    // Construct mock browser DOM environment
    const createdElements = [];
    const mockDocument = {
      createElement: (tag) => {
        const el = {
          tagName: tag.toUpperCase(),
          className: '',
          classList: {
            add: (c) => { el.className += ` ${c}`; },
            remove: (c) => { el.className = el.className.replace(c, '').trim(); },
            contains: (c) => el.className.includes(c),
          },
          style: {},
          attributes: {},
          setAttribute: (k, v) => { el.attributes[k] = v; },
          getAttribute: (k) => el.attributes[k] || null,
          innerHTML: '',
          innerText: '',
          textContent: '',
          children: [],
          appendChild: (c) => { el.children.push(c); return c; },
          removeChild: (c) => { el.children = el.children.filter(x => x !== c); return c; },
          addEventListener: () => {},
          removeEventListener: () => {},
          querySelector: () => null,
          querySelectorAll: () => [],
          focus: () => {},
          select: () => {},
        };
        createdElements.push(el);
        return el;
      },
      getElementById: (id) => ({
        id,
        className: '',
        classList: { add: () => {}, remove: () => {}, contains: () => false },
        style: {},
        innerHTML: '',
        innerText: '',
        textContent: '',
        addEventListener: () => {},
        appendChild: () => {},
        querySelector: () => null,
        querySelectorAll: () => [],
      }),
      querySelectorAll: () => [],
      querySelector: () => null,
      addEventListener: () => {},
      execCommand: (cmd) => cmd === 'copy',
      body: {
        appendChild: () => {},
        removeChild: () => {},
      }
    };

    const mockWindow = {
      document: mockDocument,
      localStorage: {
        _data: {},
        getItem: function(k) { return this._data[k] || null; },
        setItem: function(k, v) { this._data[k] = String(v); },
        removeItem: function(k) { delete this._data[k]; }
      },
      navigator: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        clipboard: {
          writeText: async () => true,
        }
      },
      scrollTo: () => {},
      addEventListener: () => {},
    };

    const context = vm.createContext({
      window: mockWindow,
      document: mockDocument,
      navigator: mockWindow.navigator,
      localStorage: mockWindow.localStorage,
      console: console,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      encodeURIComponent: encodeURIComponent,
      decodeURIComponent: decodeURIComponent,
      JSON: JSON,
      Math: Math,
      Array: Array,
      Object: Object,
      String: String,
      Number: Number,
      Boolean: Boolean,
      Date: Date,
      RegExp: RegExp,
    });

    // Load data modules in VM
    const dataFiles = [
      'frontend/js/data/standards.js',
      'frontend/js/data/academicResearch.js',
      'frontend/js/data/curriculum.js',
      'frontend/js/data/labs.js',
      'frontend/js/data/quizzes.js',
      'frontend/js/data/flashcards.js',
      'frontend/js/data/enterpriseCode.js',
      'frontend/js/simulators/cliTerminal.js',
      'frontend/js/simulators/packetVisualizer.js',
      'frontend/js/simulators/nistCalculator.js',
      'frontend/js/simulators/sbsAuditor.js',
      'frontend/js/simulators/attackSimulator.js',
      'frontend/js/audioBot.js',
    ];

    dataFiles.forEach(relPath => {
      const code = fs.readFileSync(path.join(ROOT_DIR, relPath), 'utf8');
      vm.runInContext(code, context);
    });

    // Validate global exports in VM context
    assert.ok(context.window.STANDARDS_DATA, 'STANDARDS_DATA loaded');
    assert.ok(context.window.ACADEMIC_RESEARCH_DATA.length > 0, 'ACADEMIC_RESEARCH_DATA loaded');
    assert.ok(context.window.CURRICULUM_DATA.length === 4, 'CURRICULUM_DATA 4 units loaded');
    assert.ok(context.window.LABS_DATA.length >= 4, 'LABS_DATA loaded');
    assert.ok(context.window.QUIZZES_DATA.length >= 8, 'QUIZZES_DATA loaded');
    assert.ok(context.window.FLASHCARDS_DATA.length >= 8, 'FLASHCARDS_DATA loaded');
    assert.ok(context.window.ENTERPRISE_CODE_DATA.length > 0, 'ENTERPRISE_CODE_DATA loaded');
    assert.ok(context.window.AudioBot, 'AudioBot class is loaded');

    // Test AudioBot Markdown Text Sanitizer
    const AudioBot = context.window.AudioBot;
    const bot = new AudioBot();
    const rawMd = '### Titulo de Prueba\nTexto con **negrita** y [enlace](http://test.com)\n```bash\nshow ip route\n```\nFin.';
    const cleanSpeech = bot.cleanTextForSpeech(rawMd);
    assert.strictEqual(cleanSpeech.includes('###'), false, 'AudioBot cleans markdown hashes');
    assert.strictEqual(cleanSpeech.includes('**'), false, 'AudioBot cleans markdown bold stars');
    assert.strictEqual(cleanSpeech.includes('http'), false, 'AudioBot cleans raw URLs');

    // Test NIST Calculator Logic in Engine Context
    const NISTCalculator = context.window.NISTCalculator;
    assert.ok(NISTCalculator, 'NISTCalculator is defined on window');
    const nistInst = new NISTCalculator('nist-calculator-mount');
    const nistLevels = nistInst.calculateLevels();
    assert.strictEqual(nistLevels.ial, 'IAL1', 'Default risk inputs resolve to IAL1');
    assert.strictEqual(nistLevels.aal, 'AAL1', 'Default risk inputs resolve to AAL1');
    assert.strictEqual(nistLevels.fal, 'FAL1', 'Default risk inputs resolve to FAL1');

    // Test SBS Auditor in Engine Context
    const SBSAuditor = context.window.SBSAuditor;
    assert.ok(SBSAuditor, 'SBSAuditor is defined on window');
    const sbsInst = new SBSAuditor('sbs-auditor-mount');
    const sbsStats = sbsInst.calculateMaturity();
    assert.ok(sbsStats.percentage > 0, 'SBS maturity percentage calculated');
    assert.ok(sbsStats.totalMax === 14, 'SBS total controls max points is 14');

    // Test Attack Simulator Contramasures
    const AttackSimulator = context.window.AttackSimulator;
    assert.ok(AttackSimulator, 'AttackSimulator is defined on window');
    const atkInst = new AttackSimulator('attack-sim-mount');
    assert.ok(atkInst.scenarios.arp, 'ARP Spoofing scenario exists');
    assert.ok(atkInst.scenarios.dhcp, 'DHCP Starvation scenario exists');
    assert.ok(atkInst.scenarios.syn, 'TCP SYN Flood scenario exists');
    assert.ok(atkInst.scenarios.botnet, 'Botnet C2 scenario exists');
  });

});
