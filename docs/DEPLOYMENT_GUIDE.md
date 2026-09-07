# GUÍA COMPLETA DE PUBLICACIÓN EN GITHUB Y GITHUB PAGES
## Network Security & Digital Identity Enterprise Hub

> Esta guía describe paso a paso cómo subir este repositorio a tu cuenta de **GitHub** y habilitar **GitHub Pages** para que tu plataforma interactiva quede publicada y funcional en Internet de forma pública o privada.

---

## 📋 Requisitos Previos
1. Tener instalado [Git](https://git-scm.com/) en tu equipo.
2. Tener una cuenta activa en [GitHub](https://github.com/).

---

## 🚀 PASO 1: Inicializar y Confirmar los Archivos en Git

Abre tu terminal en la carpeta del proyecto (`c:\Users\Loayza\Downloads\network-security`) y ejecuta los siguientes comandos:

```bash
# 1. Inicializar el repositorio Git local en la rama 'main'
git init -b main

# 2. Agregar todos los archivos estructurados al área de preparación (Staging)
git add .

# 3. Realizar el commit inicial de producción
git commit -m "feat: initial commit - NetSec Enterprise Hub with Polyglot Suite and CI/CD Quality Gates"
```

---

## 🌐 PASO 2: Crear el Repositorio en GitHub

1. Ingresa a tu cuenta de GitHub y dirígete a: **https://github.com/new**
2. Configura tu nuevo repositorio:
   - **Repository name:** `network-security` (o el nombre de tu preferencia).
   - **Description:** `Espacio de estudio y laboratorio interactivo de seguridad en redes, protocolos AAA y normativas oficiales (NIST SP 800-63 y SBS 504-2021).`
   - **Visibility:** Selecciona **Public** (o **Private** si cuentas con GitHub Pro/Enterprise para Pages).
   - **Initialize this repository with:** *Deja desmarcadas todas las casillas* (NO agregar README, .gitignore ni licencia, ya que el proyecto ya los incluye).
3. Haz clic en el botón verde **"Create repository"**.

---

## 📤 PASO 3: Vincular y Subir el Código a GitHub

```bash
# 1. Vincular el repositorio remoto de GitHub
git remote add origin https://github.com/luzylay/zero-trust-netsec-hub.git

# 2. Subir todo el código a la rama main
git push -u origin main
```

---

## ⚙️ PASO 4: Activar GitHub Pages (Despliegue Automático)

El repositorio incluye un flujo de trabajo automatizado en `.github/workflows/deploy-pages.yml` que compila y publica la carpeta `frontend/` de inmediato.

### Para activarlo en GitHub:
1. En tu repositorio de GitHub, haz clic en la pestaña **Settings** (Configuración).
2. En el menú lateral izquierdo, haz clic en **Pages** (bajo la sección *Code and automation*).
3. En la sección **Build and deployment**:
   - En el desplegable **Source**, selecciona: **GitHub Actions**.
4. ¡Listo! El workflow `.github/workflows/deploy-pages.yml` se ejecutará automáticamente en cada push a la rama `main`.

> 💡 **¿Problemas con el despliegue?** Consulta la [Guía de Diagnóstico y Resolución de Errores CI/CD (TROUBLESHOOTING)](TROUBLESHOOTING_CI_CD.md) para ver la explicación detallada de errores comunes de permisos de API (404/403) y advertencias de Node.js.

---

## 🔗 PASO 5: Acceder a tu Sitio Web en Vivo

Una vez completado el despliegue (toma entre 30 y 60 segundos), GitHub Pages te proporcionará tu URL pública:

$$\text{https://TU\_USUARIO.github.io/network-security/}$$

### Lo que encontrarás operativo en vivo:
- 🖥️ **Consola Terminal Cisco IOS AAA Interactiva** con autocompletado y validación de comandos.
- 📡 **Visualizador de Flujos de Protocolos** (RADIUS UDP 1812, TACACS+ TCP 49, Kerberos v5).
- 🛡️ **Calculadora de Niveles NIST SP 800-63-3** (IAL, AAL, FAL).
- ⚖️ **Auditor de Cumplimiento Regulatorio SBS Res. N° 504-2021**.
- ⚡ **Simulador de Ataques LAN y Defensas** (ARP Spoofing vs DAI, DHCP Starvation vs DHCP Snooping).
- 💻 **Enterprise Polyglot Code Hub** con implementaciones en **TypeScript**, **Python** y **Go**.
- 🔍 **Buscador Universal Instantáneo (`Ctrl + K`)**.
- 📥 **Exportador de Guía de Estudio Oficial en Markdown**.

---

## 🧪 Verificación de Calidad y Tests Automatizados (CI)

En la pestaña **Actions** de tu repositorio en GitHub, verás el flujo **"Continuous Integration & Enterprise Quality Gates"** que valida automáticamente:
1. Tests unitarios en Python 3.12+ ([test_cisco_aaa.py](file:///c:/Users/Loayza/Downloads/network-security/tests/python/test_cisco_aaa.py)).
2. Tests de protocolo en TypeScript / Node.js 22+ ([test_radius_client.mjs](file:///c:/Users/Loayza/Downloads/network-security/tests/typescript/test_radius_client.mjs)).
3. Auditoría de integridad de datos y categorización de carpetas ([test_data_integrity.py](file:///c:/Users/Loayza/Downloads/network-security/tests/integration/test_data_integrity.py)).
