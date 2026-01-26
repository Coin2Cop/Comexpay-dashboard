# 🏢 Plataforma Web Administrativa – Comexpay

Plataforma web administrativa de nivel profesional diseñada para la **gestión, visualización y control de información** en entornos de comercio exterior. Este dashboard permite administrar operaciones, usuarios y procesos de verificación de identidad (KYC) de manera eficiente.

---

## 📌 Descripción general

Este proyecto es una interfaz administrativa avanzada para **Comexpay**, diseñada para centralizar las operaciones logísticas y financieras. Aunque el desarrollo está en curso, la plataforma ya integra componentes clave para un entorno empresarial escalable.

### Características principales:
- **Gestión Operativa**: Módulos dedicados a la administración de Importaciones, Exportaciones y OCE (Operadores de Comercio Exterior).
- **Sistema KYC (Know Your Customer)**: Flujo de trabajo para la verificación de identidad, incluyendo:
  - **Aprobación Manual**: Panel para que administradores revisen documentos de identidad y selfies.
  - **Detección de Vida (AI)**: Integración con modelos de IA para validar movimientos faciales en tiempo real y prevenir fraudes.
- **Visualización de Datos**: Dashboards interactivos con estadísticas de registros, importaciones y otros indicadores clave de rendimiento (KPIs).
- **Generación de Reportes**: Capacidad para exportar estadísticas detalladas en formato PDF.
- **Gestión de Usuarios**: Control total sobre los perfiles y roles dentro de la plataforma.

---

## 🖼️ Capturas de pantalla

| Tema Claro | Tema Oscuro |
| :---: | :---: |
| ![Light Theme](assets/images/screenshots/light.jpg) | ![Dark Theme](assets/images/screenshots/dark.jpg) |

---

## 🛠️ Tecnologías utilizadas

### Frontend
- **Bootstrap 5**: Framework base para el diseño responsivo.
- **NobleUI**: Template administrativo de alta calidad.
- **JavaScript (ES6+)**: Lógica de cliente y manipulación del DOM.
- **ApexCharts & Chart.js**: Bibliotecas para la creación de gráficos interactivos.
- **Axios**: Cliente HTTP para la integración con APIs backend.
- **jsPDF**: Generación de documentos PDF desde el navegador.
- **Feather Icons & Material Design Icons**: Iconografía profesional.

### Inteligencia Artificial (KYC)
- **TensorFlow.js**: Motor para ejecutar modelos de IA en el navegador.
- **BlazeFace**: Modelo ligero para la detección de rostros y puntos de referencia faciales.

### Backend (Requerido para funcionalidad completa)
El frontend está diseñado para comunicarse con una API REST (Node.js/Express recomendados). Actualmente, los endpoints apuntan a: `https://api.comexpay.co/api/v1/`.

---

## 📂 Estructura del proyecto

```text
📁 comexpay-dashboard
│
├── 📄 home.html                 # Panel principal con estadísticas
├── 📄 dashboardAdmin.html       # Vista administrativa de operaciones
├── 📄 dashboard.html            # Dashboard general
│
├── 📁 assets/                   # Recursos estáticos
│   ├── 📁 css/                  # Estilos (Bootstrap, NobleUI, personalizados)
│   ├── 📁 js/                   # Lógica de negocio y dashboards
│   ├── 📁 vendors/              # Librerías externas (ApexCharts, Axios, etc.)
│   └── 📁 images/               # Imágenes y recursos gráficos
│
├── 📁 pages/                    # Módulos funcionales
│   ├── 📁 auth/                 # Login, registro y recuperación de cuenta
│   ├── 📁 kyc/                  # Administración y detalles de KYC
│   ├── 📁 importacion/          # Gestión de importaciones
│   └── 📁 usuarios/             # Control de usuarios
│
├── 📁 partials/                 # Componentes reutilizables (Sidebar, Navbar, Footer)
│
└── 📄 README.md                 # Documentación del proyecto
```

---

## 🚀 Configuración y despliegue

### Requisitos previos
- Un servidor HTTP local (puedes usar extensiones de VS Code como *Live Server* o herramientas de línea de comandos como `serve` de npm).

### Instalación local
1. Clona este repositorio:
   ```bash
   git clone <url-del-repositorio>
   ```
2. Navega al directorio del proyecto y abre los archivos `.html` a través de tu servidor local.
   - Ejemplo con `serve`:
     ```bash
     npx serve .
     ```

### Configuración de la API
Para conectar el dashboard con tu propio backend, busca y reemplaza la URL base de la API en los archivos JavaScript dentro de `assets/js/` y `assets/vendors/core/`.
- Busca la cadena: `https://api.comexpay.co/api/v1/`
- Reemplázala con tu endpoint local o de producción.

### Despliegue
Al ser un proyecto de frontend estático, puede ser desplegado fácilmente en:
- **GitHub Pages**
- **Vercel**
- **Netlify**
- **Amazon S3 / CloudFront**

*Nota: Asegúrate de configurar correctamente los encabezados CORS en tu servidor backend para permitir peticiones desde el dominio donde despliegues el frontend.*

---

## 📈 Estado del proyecto
El proyecto se encuentra en una fase funcional pero con módulos en desarrollo ("Incomplete/Paused"). Las áreas que requieren atención futura incluyen:
- Completar la lógica para los módulos de **Exportaciones** y **OCE**.
- Refinar la integración con el backend para manejo de sesiones persistentes.
- Mejorar la responsividad en dispositivos móviles muy pequeños.

---

## 🤝 Contribución
Si deseas contribuir al proyecto, por favor sigue estos pasos:
1. Haz un Fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/NuevaFuncionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Haz Push a la rama (`git push origin feature/NuevaFuncionalidad`).
5. Abre un Pull Request.

---

Hecho con ❤️ para **Comexpay**.
