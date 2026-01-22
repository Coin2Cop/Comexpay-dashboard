# 🏢 Plataforma Web Administrativa – Comexpay

Plataforma web administrativa de nivel profesional, desarrollada para entornos productivos, orientada a la **gestión, visualización y control de información** mediante un **panel administrativo avanzado** desarrollo incompleto y pausado.

El sistema está diseñado para funcionar **con servidor**, integrarse con **APIs backend**, manejar **roles, módulos y procesos complejos**, y ser escalable en un entorno empresarial.

---

## 📌 Descripción general

Este proyecto corresponde a un **dashboard administrativo Comexpay**, pensado para:

- Gestión operativa y administrativa
- Visualización de datos
- Manejo de múltiples módulos funcionales
- Integración con servicios backend
- Uso en entorno laboral / empresarial
- KYC con modelo IA facial de ajuste fino

⚠️ **Este proyecto NO es una web estática simple**.  
La mayoría de sus funcionalidades **requieren un servidor activo**, APIs y lógica backend.

---

## 🧱 Arquitectura general

El sistema sigue una arquitectura **frontend + backend desacoplada**:

- **Frontend**: Interfaz administrativa (HTML, CSS, JS)
- **Backend**: API REST / servicios (no incluidos en este repositorio)
- **Servidor**: Requerido para autenticación, datos, procesos y persistencia

---

## 🛠️ Tecnologías utilizadas

### Frontend
- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**
- **Framework de dashboard administrativo**
- **Feather Icons**
- **DataTables**
- **Gráficas y componentes UI avanzados**
- **IA facil**

### Backend (requerido)
- API REST (Node.js)
- Autenticación y autorización
- Persistencia de datos
- Lógica de negocio
- Manejo de usuarios y roles

---

## 📂 Estructura del proyecto (Frontend)

```text
📁 proyecto
│
├── home.html                     # Vista principal / dashboard
│
├── pages/**                     # Todo el conjunto de paginas
|
├── assets/
│   ├── css/
│   │   ├── componentes/          # Estilos de componentes reutilizables
│   │   ├── kycAdmin/             # Módulos administrativos específicos
│   │   └── maps/                 # Estilos para mapas y visualización
│   │
│   ├── fonts/                    # Tipografías e iconografía
│   │   └── feather-font/
│   │
│   ├── images/                   # Recursos gráficos
│   └── vendors/                  # Librerías externas
│
└── README.md
