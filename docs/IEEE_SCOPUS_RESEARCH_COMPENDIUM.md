# COMPENDIO CIENTÍFICO Y ACADÉMICO DE INVESTIGACIÓN
## Zero-Trust Network Security, Identity Assurance & Protocol Cryptanalysis
### Fuentes Indexadas: IEEE Xplore, Scopus, ACM Digital Library, IETF RFCs & NIST Guidelines

---

## 1. FUNDAMENTOS MATEMÁTICOS Y MODELADO CRIPTOGRÁFICO

### 1.1 Entropía de Información y Fuerza de Contraseñas (NIST SP 800-63B)

La entropía de Shannon $H(X)$ cuantifica la incertidumbre y resistencia contra ataques de fuerza bruta:

$$H(X) = -\sum_{i=1}^{n} P(x_i) \log_2 P(x_i)$$

Para un espacio de caracteres de tamaño $|V|$ y una longitud de contraseña $L$, el número total de combinaciones posibles en un ataque exhaustivo es:

$$\Omega = |V|^L \implies H \approx L \log_2(|V|)$$

> **Hallazgo Académico (ACM CSUR 2024):** Aumentar la longitud $L$ genera un crecimiento exponencial en la entropía que supera con creces la complejidad arbitraria forzada de 8 caracteres con símbolos. Una frase de 16 caracteres alfabéticos ($26^{16} \approx 4.36 \times 10^{22}$) posee mayor entropía que una contraseña compleja de 8 caracteres ($94^8 \approx 6.09 \times 10^{15}$).

---

### 1.2 Intercambio de Claves Diffie-Hellman en Curvas Elípticas (ECDH - RFC 7748 / RFC 7296)

El protocolo IKEv2 en IPSec utiliza ECDH sobre la curva Montgomery **Curve25519** (Grupo Diffie-Hellman 19/20) definida sobre el cuerpo primo $\mathbb{F}_{2^{255}-19}$:

$$y^2 = x^3 + 486662x^2 + x$$

1. Alicia genera su clave privada $a \in [1, 2^{252})$ y calcula su clave pública $A = a \cdot G$.
2. Bob genera su clave privada $b \in [1, 2^{252})$ y calcula su clave pública $B = b \cdot G$.
3. Ambos derivan el secreto compartido idéntico $K = a \cdot B = b \cdot A = (ab) \cdot G$.
4. **Propiedad de Seguridad:** El atacante pasivo solo observa $A$ y $B$, y no puede derivar $K$ debido a la intratabilidad computacional del Problema del Logaritmo Discreto en Curvas Elípticas (ECDLP).

---

## 2. REVISIÓN DE LITERATURA CIENTÍFICA (IEEE & SCOPUS)

### 2.1 Microsegmentación y Zero Trust (IEEE Communications Surveys & Tutorials, 2024)
- **DOI:** `10.1109/COMST.2023.3298712`
- **Tesis Central:** El modelo perimetral tradicional ("confianza implícita en la LAN") es obsoleto ante amenazas persistentes avanzadas (APTs). La arquitectura Zero Trust (ZTA) formalizada por el NIST SP 800-207 desacopla el plano de control (Policy Decision Point - PDP) del plano de datos (Policy Enforcement Point - PEP), forzando autenticación mutua criptográfica y autorización continua para cada flujo L3-L7.

### 2.2 Seguridad en Capa 2: IEEE 802.1X-2020 y MACsec (IEEE TIFS, 2023)
- **DOI:** `10.1109/TIFS.2023.3276541`
- **Análisis de Vulnerabilidades Mitigadas:**
  - *ARP Poisoning:* Neutralizado en el origen mediante el control de acceso a puertos EAPoL (Extensible Authentication Protocol over LAN) y autenticación RADIUS 802.1X.
  - *Eavesdropping L2:* MACsec (IEEE 802.1AE) cifra las tramas Ethernet completas con AES-GCM-128/256 de enlace a enlace (hop-by-hop), haciendo inútil cualquier ataque de sniffing o TAP no autorizado en el cableado físico.

### 2.3 Criptoanálisis Formal de Kerberos v5 (ACM TOPS, 2022)
- **DOI:** `10.1145/3498210`
- **Modelo de Amenazas Dolev-Yao:**
  - El protocolo Kerberos v5 (RFC 4120) es seguro ante interceptación, modificación e inyección de paquetes siempre que se garantice que el secreto maestro del Key Distribution Center ($K_{\text{KDC}}$) no sea expuesto y que la desviación de tiempo $\Delta t$ entre clientes y servidores no exceda la ventana de sincronización NTP ($\Delta t \le 300\text{s}$).

---

## 3. MAPEO FORMAL AL FRAMEWORK MITRE ATT&CK® FOR ENTERPRISE

| Técnica MITRE | ID | Vector de Ataque Analizado | Contramedida de Estándar Oficial |
| :--- | :--- | :--- | :--- |
| **Adversary-in-the-Middle** | `T1557` | ARP Spoofing / DHCP Starvation en LAN | **IEEE 802.1X / DAI / DHCP Snooping** |
| **Brute Force (Password Spraying)** | `T1110` | Ataques masivos de credenciales contra AAA | **NIST SP 800-63B / Blacklists / Rate-Limiting** |
| **Pass the Ticket / Kerberoasting** | `T1558` | Extracción y reutilización de tickets TGT/TGS | **Kerberos AES Ciphers / PAM / Rotación de cuentas de servicio** |
| **Command and Control Protocol** | `T1071` | Balizas C2 encubiertas vía HTTPS / DNS DGA | **DNS Sinkholing / NGFW App-ID & DPI (NIST SP 800-94)** |
| **Network Denial of Service** | `T1499` | Inundación de conexiones TCP SYN Flood | **TCP SYN Cookies (RFC 4987) / Anti-DDoS BGP Flowspec** |
| **Exploitation of Remote Services** | `T1210` | Propagación de Gusanos por puertos abiertos | **Segmentación Zero Trust / IPSec IKEv2 (RFC 7296)** |
