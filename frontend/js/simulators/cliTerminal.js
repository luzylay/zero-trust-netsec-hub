/**
 * Interactive Cisco IOS AAA Terminal Simulator
 * Emulates Cisco IOS Command Line Interface with stateful AAA configuration engine
 */

class CiscoCLISimulator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.mode = "unprivileged"; // unprivileged, privileged, global_config, config_line, config_radius, config_tacacs
    this.hostname = "Router";
    this.history = [];
    this.historyIndex = 0;
    this.configState = {
      aaaNewModel: false,
      radiusServers: [],
      tacacsServers: [],
      authLists: [],
      users: [{ username: "admin", privilege: 15, secret: "cisco123" }],
      vtyAuth: null,
      consoleAuth: null
    };
    this.init();
  }

  init() {
    if (!this.container) return;
    this.renderTerminal();
    this.bindEvents();
    this.printWelcome();
  }

  getPrompt() {
    switch (this.mode) {
      case "unprivileged":
        return `${this.hostname}>`;
      case "privileged":
        return `${this.hostname}#`;
      case "global_config":
        return `${this.hostname}(config)#`;
      case "config_line":
        return `${this.hostname}(config-line)#`;
      case "config_radius":
        return `${this.hostname}(config-radius-server)#`;
      case "config_tacacs":
        return `${this.hostname}(config-server-tacacs)#`;
      case "config_sg_radius":
        return `${this.hostname}(config-sg-radius)#`;
      case "config_sg_tacacs":
        return `${this.hostname}(config-sg-tacacs+)#`;
      default:
        return `${this.hostname}#`;
    }
  }

  renderTerminal() {
    this.container.innerHTML = `
      <div class="cli-terminal-window">
        <div class="cli-terminal-header">
          <div class="cli-window-dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <div class="cli-terminal-title">Cisco IOS v15.7(4)M - Interactive AAA Console</div>
          <div class="cli-terminal-actions">
            <button class="cli-btn" id="btn-load-aaa-scenario" title="Cargar plantilla AAA recomendada">Cargar Script AAA</button>
            <button class="cli-btn" id="btn-clear-terminal" title="Limpiar pantalla">Limpiar</button>
            <button class="cli-btn" id="btn-reset-terminal" title="Reiniciar Router">Recargar</button>
          </div>
        </div>
        <div class="cli-terminal-body" id="cli-output-area"></div>
        <div class="cli-terminal-input-row">
          <span class="cli-prompt" id="cli-prompt-label">${this.getPrompt()}</span>
          <input type="text" id="cli-cmd-input" class="cli-input" autocomplete="off" spellcheck="false" placeholder="Escribe un comando de Cisco IOS (ej: 'enable', 'conf t', 'help')...">
          <button class="cli-send-btn" id="cli-send-btn">Ejecutar</button>
        </div>
        <div class="cli-quick-commands">
          <span class="quick-cmd-label">Sugerencias rápidas:</span>
          <button class="quick-cmd-tag" data-cmd="enable">enable</button>
          <button class="quick-cmd-tag" data-cmd="configure terminal">conf t</button>
          <button class="quick-cmd-tag" data-cmd="aaa new-model">aaa new-model</button>
          <button class="quick-cmd-tag" data-cmd="radius-server host 192.168.1.100 auth-port 1812 acct-port 1813 key SecretKey2026!">radius-server...</button>
          <button class="quick-cmd-tag" data-cmd="aaa authentication login default group radius local">aaa auth login...</button>
          <button class="quick-cmd-tag" data-cmd="show running-config">show run</button>
          <button class="quick-cmd-tag" data-cmd="show aaa servers">show aaa servers</button>
          <button class="quick-cmd-tag" data-cmd="test aaa group radius admin cisco123 legacy">test aaa...</button>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const input = this.container.querySelector("#cli-cmd-input");
    const sendBtn = this.container.querySelector("#cli-send-btn");
    const clearBtn = this.container.querySelector("#btn-clear-terminal");
    const resetBtn = this.container.querySelector("#btn-reset-terminal");
    const scenarioBtn = this.container.querySelector("#btn-load-aaa-scenario");

    const submitCommand = () => {
      const val = input.value.trim();
      if (val) {
        this.history.push(val);
        this.historyIndex = this.history.length;
        this.execute(val);
      }
      input.value = "";
      input.focus();
    };

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        submitCommand();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          input.value = this.history[this.historyIndex] || "";
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          input.value = this.history[this.historyIndex] || "";
        } else {
          this.historyIndex = this.history.length;
          input.value = "";
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        this.autocomplete(input);
      }
    });

    sendBtn.addEventListener("click", submitCommand);
    clearBtn.addEventListener("click", () => this.clear());
    resetBtn.addEventListener("click", () => this.resetRouter());
    scenarioBtn.addEventListener("click", () => this.loadAaaScenario());

    this.container.querySelectorAll(".quick-cmd-tag").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cmd = btn.getAttribute("data-cmd");
        input.value = cmd;
        input.focus();
      });
    });
  }

  printWelcome() {
    this.printLine(`
   ______ _____ _____ _____ ____    _____ ____   _____ 
  / _____|_   _/ ____/ ____/ __ \\  |_   _/ __ \\ / ____|
 | |       | || (___| |   | |  | |   | || |  | | (___  
 | |       | | \\___ \\| |   | |  | |   | || |  | |\\___ \\ 
 | |_____ _| |_____) | |___| |__| |  _| || |__| |____) |
  \\______|_____|_____/ \\_____\\____/  |_____\\____/|_____/ 
                                                        
 Cisco IOS Software, C2900 Software (C2900-UNIVERSALK9-M), Version 15.7(4)M, RELEASE SOFTWARE (fc2)
 * Router Security Engine initialized. Type 'help' or '?' for guidance.
`);
    this.updatePrompt();
  }

  printLine(text, cssClass = "") {
    const outputArea = this.container.querySelector("#cli-output-area");
    if (!outputArea) return;
    const line = document.createElement("div");
    line.className = `cli-line ${cssClass}`;
    line.innerHTML = text;
    outputArea.appendChild(line);
    outputArea.scrollTop = outputArea.scrollHeight;
  }

  updatePrompt() {
    const promptLabel = this.container.querySelector("#cli-prompt-label");
    if (promptLabel) {
      promptLabel.textContent = this.getPrompt();
    }
  }

  clear() {
    const outputArea = this.container.querySelector("#cli-output-area");
    if (outputArea) outputArea.innerHTML = "";
  }

  resetRouter() {
    this.mode = "unprivileged";
    this.hostname = "Router";
    this.configState = {
      aaaNewModel: false,
      radiusServers: [],
      tacacsServers: [],
      authLists: [],
      users: [{ username: "admin", privilege: 15, secret: "cisco123" }],
      vtyAuth: null,
      consoleAuth: null
    };
    this.clear();
    this.printLine("<span class='text-warning'>System restarting... System Bootstrap, Version 15.1(4)M4, RELEASE SOFTWARE</span>");
    setTimeout(() => {
      this.printWelcome();
    }, 400);
  }

  loadAaaScenario() {
    this.execute("enable");
    this.execute("configure terminal");
    this.execute("hostname R1-ENTERPRISE-CORE");
    this.execute("username netsec privilege 15 secret CyberAdmin2026!");
    this.execute("aaa new-model");
    this.execute("radius-server host 192.168.10.50 auth-port 1812 acct-port 1813 key RadiusMasterKey2026!");
    this.execute("tacacs-server host 192.168.10.60 key TacacsAdminSecret2026!");
    this.execute("aaa authentication login default group tacacs+ group radius local");
    this.execute("aaa authorization exec default group tacacs+ local");
    this.execute("line vty 0 4");
    this.execute("transport input ssh");
    this.execute("login authentication default");
    this.execute("exit");
    this.execute("exit");
    this.printLine("<span class='text-success'>[OK] Escenario AAA Corporativo completo cargado exitosamente. Ejecuta 'show run' para inspeccionar.</span>", "cli-success");
  }

  execute(cmdLine) {
    this.printLine(`<span class="cli-history-prompt">${this.getPrompt()}</span> <span class="cli-history-cmd">${this.escapeHtml(cmdLine)}</span>`);
    const parts = cmdLine.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (cmd === "?" || cmd === "help") {
      this.showHelp();
      return;
    }

    // Navigation & General Commands
    if (cmd === "enable" || cmd === "en") {
      this.mode = "privileged";
      this.updatePrompt();
      return;
    }

    if (cmd === "disable") {
      this.mode = "unprivileged";
      this.updatePrompt();
      return;
    }

    if (cmd === "configure" || cmd === "conf") {
      if (this.mode === "unprivileged") {
        this.printLine("% Error: Privileged mode required. Type 'enable' first.", "cli-error");
        return;
      }
      if (args[0] === "terminal" || args[0] === "t" || !args[0]) {
        this.mode = "global_config";
        this.printLine("Enter configuration commands, one per line. End with CNTL/Z.");
        this.updatePrompt();
        return;
      }
    }

    if (cmd === "exit") {
      if (this.mode === "config_line" || this.mode === "config_radius" || this.mode === "config_tacacs" || this.mode === "config_sg_radius" || this.mode === "config_sg_tacacs") {
        this.mode = "global_config";
      } else if (this.mode === "global_config") {
        this.mode = "privileged";
      } else if (this.mode === "privileged") {
        this.mode = "unprivileged";
      }
      this.updatePrompt();
      return;
    }

    if (cmd === "end") {
      this.mode = "privileged";
      this.updatePrompt();
      return;
    }

    if (cmd === "hostname") {
      if (this.mode !== "global_config") {
        this.printLine("% Error: Command only available in configuration mode.", "cli-error");
        return;
      }
      if (args[0]) {
        this.hostname = args[0];
        this.updatePrompt();
      }
      return;
    }

    // AAA Core Commands
    if (cmd === "aaa") {
      if (this.mode !== "global_config") {
        this.printLine("% Error: Must be in global configuration mode (conf t).", "cli-error");
        return;
      }
      if (args[0] === "new-model") {
        this.configState.aaaNewModel = true;
        this.printLine("<span class='text-success'>% AAA security model activated globally on system.</span>");
        return;
      }
      if (args[0] === "authentication" && args[1] === "login") {
        const listName = args[2];
        const methods = args.slice(3).join(" ");
        this.configState.authLists.push({ type: "login", name: listName, methods });
        this.printLine(`% AAA Authentication login list '${listName}' configured: [${methods}]`);
        return;
      }
      if (args[0] === "authorization" && args[1] === "exec") {
        const listName = args[2];
        const methods = args.slice(3).join(" ");
        this.configState.authLists.push({ type: "authz_exec", name: listName, methods });
        this.printLine(`% AAA Authorization exec list '${listName}' configured: [${methods}]`);
        return;
      }
    }

    if (cmd === "radius-server" || cmd === "radius") {
      if (this.mode !== "global_config") {
        this.printLine("% Error: Must be in global configuration mode.", "cli-error");
        return;
      }
      if (args[0] === "host") {
        const ip = args[1];
        let key = "default";
        const keyIdx = args.indexOf("key");
        if (keyIdx !== -1 && args[keyIdx + 1]) {
          key = args[keyIdx + 1];
        }
        this.configState.radiusServers.push({ ip, key, authPort: 1812, acctPort: 1813 });
        this.printLine(`% RADIUS server ${ip} configured with authentication port 1812 and accounting port 1813.`);
        return;
      }
    }

    if (cmd === "tacacs-server" || cmd === "tacacs") {
      if (this.mode !== "global_config") {
        this.printLine("% Error: Must be in global configuration mode.", "cli-error");
        return;
      }
      if (args[0] === "host") {
        const ip = args[1];
        let key = "default";
        const keyIdx = args.indexOf("key");
        if (keyIdx !== -1 && args[keyIdx + 1]) {
          key = args[keyIdx + 1];
        }
        this.configState.tacacsServers.push({ ip, key, port: 49 });
        this.printLine(`% TACACS+ server ${ip} configured on TCP port 49.`);
        return;
      }
    }

    if (cmd === "username") {
      if (this.mode !== "global_config") {
        this.printLine("% Error: Must be in global configuration mode.", "cli-error");
        return;
      }
      const uName = args[0];
      const privIdx = args.indexOf("privilege");
      const priv = privIdx !== -1 ? parseInt(args[privIdx + 1]) : 1;
      const secIdx = args.indexOf("secret");
      const secret = secIdx !== -1 ? args[secIdx + 1] : "secret";
      this.configState.users.push({ username: uName, privilege: priv, secret });
      this.printLine(`% Local user '${uName}' created (Privilege level: ${priv}).`);
      return;
    }

    if (cmd === "line") {
      if (this.mode !== "global_config") {
        this.printLine("% Error: Must be in global configuration mode.", "cli-error");
        return;
      }
      if (args[0] === "vty" || args[0] === "console" || args[0] === "con") {
        this.mode = "config_line";
        this.updatePrompt();
        return;
      }
    }

    if (this.mode === "config_line" && (cmd === "login" || cmd === "transport")) {
      this.printLine(`% Line parameter updated: ${cmdLine}`);
      return;
    }

    // Show Commands
    if (cmd === "show" || cmd === "sh") {
      if (this.mode === "unprivileged") {
        this.printLine("% Error: Privileged EXEC mode required ('enable').", "cli-error");
        return;
      }
      const sub = args[0] ? args[0].toLowerCase() : "";
      if (sub === "run" || sub === "running-config") {
        this.showRunningConfig();
        return;
      }
      if (sub === "aaa") {
        if (args[1] === "servers") {
          this.showAaaServers();
          return;
        }
      }
      if (sub === "version" || sub === "ver") {
        this.printLine(`Cisco IOS Software, C2900 Software (C2900-UNIVERSALK9-M), Version 15.7(4)M, RELEASE SOFTWARE (fc2)
ROM: System Bootstrap, Version 15.1(4)M4
System uptime is 4 hours, 28 minutes
System returned to ROM by power-on
Cisco CISCO2911/K9 with 512MB of processor memory.`);
        return;
      }
      if (sub === "users") {
        this.printLine(`Line       User       Host(s)              Idle       Location
*  0 con 0   admin      idle                 00:00:00   192.168.1.10`);
        return;
      }
    }

    // Test Command
    if (cmd === "test") {
      if (args[0] === "aaa") {
        this.testAaa(args);
        return;
      }
    }

    this.printLine(`% Invalid input or unrecognized command: "${this.escapeHtml(cmdLine)}". Type 'help' for command list.`, "cli-error");
  }

  showHelp() {
    this.printLine(`
Available Cisco IOS Commands in current mode (${this.mode}):
----------------------------------------------------------------------
• enable / en                          : Ingresar a modo privilegiado (#)
• disable                              : Salir a modo no privilegiado (>)
• configure terminal / conf t          : Ingresar a modo de configuración global
• hostname <name>                      : Cambiar nombre del router
• username <user> privilege <0-15> secret <pass> : Crear usuario local
• aaa new-model                        : Activar el framework de seguridad AAA
• radius-server host <ip> auth-port 1812 acct-port 1813 key <key>
• tacacs-server host <ip> key <key>    : Configurar servidor TACACS+ (TCP 49)
• aaa authentication login default group <radius|tacacs+> local
• aaa authorization exec default group <radius|tacacs+> local
• line vty 0 4 / line con 0            : Configurar acceso por terminal
• show running-config / show run       : Ver configuración activa
• show aaa servers                     : Ver estado y estadísticas de servidores AAA
• test aaa group <radius|tacacs+> <user> <pass> legacy : Probar credenciales AAA
• exit / end                           : Retroceder o salir de modo
• clear / reload                       : Limpiar pantalla o reiniciar router
`);
  }

  showRunningConfig() {
    let output = `
Building configuration...
Current configuration : 1845 bytes
!
version 15.7
service timestamps debug datetime msec
service timestamps log datetime msec
no service password-encryption
!
hostname ${this.hostname}
!
boot-start-marker
boot-end-marker
!
${this.configState.aaaNewModel ? "aaa new-model" : "! aaa new-model is not configured"}`;

    this.configState.authLists.forEach((l) => {
      output += `\naaa ${l.type === "login" ? "authentication login" : "authorization exec"} ${l.name} ${l.methods}`;
    });

    this.configState.users.forEach((u) => {
      output += `\nusername ${u.username} privilege ${u.privilege} secret ${u.secret}`;
    });

    this.configState.radiusServers.forEach((r) => {
      output += `\nradius-server host ${r.ip} auth-port ${r.authPort} acct-port ${r.acctPort} key ${r.key}`;
    });

    this.configState.tacacsServers.forEach((t) => {
      output += `\ntacacs-server host ${t.ip} port 49 key ${t.key}`;
    });

    output += `
!
interface GigabitEthernet0/0
 ip address 192.168.1.1 255.255.255.0
 duplex auto
 speed auto
!
line con 0
 login authentication default
line vty 0 4
 transport input ssh
 login authentication default
!
end`;

    this.printLine(output);
  }

  showAaaServers() {
    if (this.configState.radiusServers.length === 0 && this.configState.tacacsServers.length === 0) {
      this.printLine("% No AAA servers configured on this device.");
      return;
    }

    let out = "\nRADIUS Server Group Status:\n";
    this.configState.radiusServers.forEach((r, idx) => {
      out += `  [RADIUS Server #${idx + 1}] IP: ${r.ip}, Auth-Port: ${r.authPort}, Acct-Port: ${r.acctPort}, Status: ALIVE, Requests: 14, Accepts: 14, Rejects: 0, Timeouts: 0\n`;
    });

    out += "\nTACACS+ Server Group Status:\n";
    this.configState.tacacsServers.forEach((t, idx) => {
      out += `  [TACACS+ Server #${idx + 1}] IP: ${t.ip}, Port: ${t.port} (TCP), Status: UP/CONNECTED, Requests: 8, Successes: 8, Errors: 0\n`;
    });

    this.printLine(out);
  }

  testAaa(args) {
    // format: test aaa group <grp> <user> <pass> legacy
    const grpIdx = args.indexOf("group");
    const grp = grpIdx !== -1 ? args[grpIdx + 1] : "radius";
    const user = args[grpIdx + 2] || "admin";
    const pass = args[grpIdx + 3] || "cisco123";

    this.printLine(`Sending AAA Access-Request to server group '${grp}' for user '${user}'...`);
    setTimeout(() => {
      if (this.configState.radiusServers.length > 0 || this.configState.tacacsServers.length > 0) {
        this.printLine(`<span class='text-success'>% User '${user}' successfully authenticated against AAA Server Group '${grp}'. Response: ACCESS-ACCEPT. Authorization attributes received: [Privilege-Level=15, Service-Type=Administrative]</span>`, "cli-success");
      } else {
        this.printLine(`<span class='text-warning'>% AAA Server group '${grp}' unreachable (No servers configured in pool). Falling back to LOCAL database authentication... User '${user}' authenticated locally.</span>`);
      }
    }, 300);
  }

  autocomplete(input) {
    const val = input.value.toLowerCase();
    const common = [
      "enable", "configure terminal", "aaa new-model", "radius-server host",
      "tacacs-server host", "aaa authentication login", "aaa authorization exec",
      "show running-config", "show aaa servers", "test aaa group", "username", "exit"
    ];
    const match = common.find((c) => c.startsWith(val));
    if (match) {
      input.value = match;
    }
  }

  escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}

window.CiscoCLISimulator = CiscoCLISimulator;
