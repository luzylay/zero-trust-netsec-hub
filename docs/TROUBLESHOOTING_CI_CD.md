# GUIA DE RESOLUCION DE ERRORES Y DIAGNOSTICO CI/CD (TROUBLESHOOTING)
## Despliegue en GitHub Pages y GitHub Actions Runners

> **Objetivo:** Este documento documenta y explica con rigor tecnico y didactico los errores mas comunes de integracion continua (CI/CD) y despliegue en GitHub Pages, sus causas raiz en la arquitectura de permisos de GitHub y como resolverlos paso a paso para desarrolladores nuevos y futuros mantenedores.

---

## INDICE DE ERRORES FRECUENTES

1. [Error 1: Get Pages site failed - 404 Not Found](#error-1)
2. [Error 2: Create Pages site failed - 403 Resource not accessible by integration](#error-2)
3. [Advertencia 3: Node 20 is being deprecated / Running with Node 24](#advertencia-3)
4. [Diagrama del Ciclo de Despliegue Seguro de GitHub Pages](#ciclo-despliegue)
5. [Checklist de Verificacion Rapida](#checklist)

---

<a name="error-1"></a>
## ERROR 1: `Get Pages site failed. Error: Not Found - 404`

### Mensaje de Error en el Log:
```text
Run actions/configure-pages@v5
Warning: Get Pages site failed. Error: Not Found - https://docs.github.com/rest/pages/pages#get-a-apiname-pages-site
Error: HttpError: Not Found
```

### Por que ocurre? (Causa Raiz Arquitectonica)
- Por defecto, en todo nuevo repositorio de GitHub, **el servicio de GitHub Pages se encuentra desactivado** o configurado en el modo tradicional *"Deploy from a branch"*.
- Cuando la accion `actions/configure-pages@v5` se ejecuta por primera vez, realiza una peticion `GET /repos/{owner}/{repo}/pages` a la API REST de GitHub para consultar la URL y estado del sitio.
- Al no haber sido inicializado el entorno de Pages por el administrador del repositorio, la API de GitHub responde con el codigo de estado HTTP `404 Not Found`.

### Solucion Paso a Paso (1 Solo Clic en GitHub UI):
1. Ingresa a tu repositorio en GitHub.
2. Ve a la pestana **Settings** (Configuracion superior).
3. En el menu lateral izquierdo, haz clic en **Pages** (en la seccion *Code and automation*).
4. En **Build and deployment**:
   - En el menu desplegable **Source**, cambia de *"Deploy from a branch"* a:  
     **GitHub Actions**
5. Al hacer este cambio, GitHub registra internamente el entorno `github-pages` en su base de datos.
6. En la pestana **Actions**, haz clic en **Re-run all jobs** (o realiza un nuevo push). El workflow avanzara sin errores.

---

<a name="error-2"></a>
## ERROR 2: `Create Pages site failed - 403 Resource not accessible by integration`

### Mensaje de Error en el Log:
```text
Error: Create Pages site failed. Error: Resource not accessible by integration - https://docs.github.com/rest/pages/pages#create-a-apiname-pages-site
Error: HttpError: Resource not accessible by integration
```

### Por que ocurre? (Causa Raiz de Seguridad)
- Ocurre cuando se anade el parametro `enablement: true` dentro del workflow de GitHub Actions.
- El token estandar provisto por GitHub a los flujos de trabajo (`GITHUB_TOKEN`), por directivas de seguridad de minimo privilegio (*Least Privilege Principle*), **NO tiene permisos de administracion para crear o reconfigurar repositorios via API**.
- Cuando el runner intenta ejecutar un `POST /repos/{owner}/{repo}/pages` para forzar la creacion del sitio sin autorizacion de administrador, GitHub bloquea la peticion con un error `403 Forbidden: Resource not accessible by integration`.

### Solucion Tecnica:
1. En el archivo de workflow `.github/workflows/deploy-pages.yml`, **NO se debe forzar el parametro `enablement: true`**:
   ```yaml
   # Configuracion Limpia y Correcta
   - name: Configure GitHub Pages
     uses: actions/configure-pages@v5
   ```
2. La activacion inicial del servicio debe hacerse directamente en la interfaz web de GitHub en **Settings > Pages > Source: GitHub Actions** como se indico en el Error 1.

---

<a name="advertencia-3"></a>
## ADVERTENCIA 3: `Node 20 is being deprecated. This workflow is running with Node 24 by default`

### Mensaje Informativo en el Runner:
```text
Node 20 is being deprecated. This workflow is running with Node 24 by default.
For more information see: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions/
```

### Explicacion Tecnica:
- **Esto NO es un error**, sino un aviso de advertencia informativa (*Warning/Deprecation Notice*) emitido por GitHub anunciando la transicion progresiva de los ejecutores de GitHub Actions hacia Node.js 24 LTS.
- Las acciones oficiales de GitHub (`actions/checkout@v4`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`) continuan funcionando normalmente bajo Node 24.
- No se requiere ninguna intervencion manual ni bloquea el despliegue exitoso.

---

<a name="ciclo-despliegue"></a>
## DIAGRAMA DEL CICLO DE DESPLIEGUE SEGURO

```text
[ Desarrollador ]
       │
       ▼ (git push origin main)
[ GitHub Repository ]
       │
       ▼ (Dispara Evento de Workflow)
[ Runner Ubuntu-Latest ]
       │
       ├─► 1. actions/checkout@v4               (Descarga el codigo)
       ├─► 2. actions/configure-pages@v5        (Consulta estado en GitHub Pages)
       ├─► 3. actions/upload-pages-artifact@v3  (Empaqueta la carpeta frontend/)
       └─► 4. actions/deploy-pages@v4           (Publica en https://luzylay.github.io/zero-trust-netsec-hub/)
```

---

<a name="checklist"></a>
## CHECKLIST DE VERIFICACION PARA NUEVOS REPOSITORIOS

- [ ] Repositorio creado en GitHub (`zero-trust-netsec-hub`).
- [ ] Codigo fuente subido a la rama `main` mediante `git push -u origin main`.
- [ ] Opcion **Settings > Pages > Source** configurada en **GitHub Actions**.
- [ ] Workflow `.github/workflows/deploy-pages.yml` ejecutado en verde.
- [ ] URL de produccion accesible y funcional.
