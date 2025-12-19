 # 🦸‍♀️ SuperHero Page

### Aplicación web interactiva para explorar un catálogo de superhéroes, desarrollada como **Trabajo Práctico Integrador**.  
### Permite buscar, filtrar, ordenar y visualizar detalles de héroes consumiendo una API externa, con diseño responsive y modo oscuro.

  🌐 **Deploy:**  
* 👉 https://superheropage.netlify.app

---

## 🚀 Funcionalidades

- 🔍 **Búsqueda por nombre**
- 🧬 **Filtros por raza y género**
- 🔤 **Orden alfabético A–Z / Z–A**
- 📄 **Paginación**
- 🦸 **Cards dinámicas de héroes**
- 🪟 **Modal con detalles completos**
- 🌙 **Modo claro / modo oscuro**
- 💾 Persistencia del tema con `localStorage`
- 📱 Diseño **responsive**

---

## 🛠️ Tecnologías utilizadas

- **HTML5**
- **CSS3**
- **Tailwind CSS (CDN)**
- **JavaScript ES Modules**
- **Fetch API**
- **SuperHero API**  
  https://akabab.github.io/superhero-api/

---

## 🧠 Arquitectura del proyecto

El código está organizado de forma modular:

```txt
js/
├── api.js          # Llamada a la API
├── filters.js      # Lógica de filtros y orden
├── pagination.js   # Paginado
├── ui.js           # Render de cards y modal
├── theme.js        # Dark / Light mode
└── main.js         # Orquestador principal
```
---

## 🎨 Diseño y UX
- Estilo cómic / superhéroes

- Uso de CSS variables para manejo de temas

- Animaciones suaves y efectos hover

- Banner destacado con overlay

- Contraste optimizado en modo claro y oscuro

## 🌙 Modo oscuro
- El modo oscuro se activa: Manualmente desde el switch

- Automáticamente según la preferencia del sistema

   **La elección se guarda en localStorage.**

## 📦 Instalación local (opcional)

```bash
git clone https://github.com/BrisaGiavedoni/SupeHero-ADA-TP.git
cd SupeHero-ADA-TP
```
  **Abrir index.html con Live Server o similar.**

## 👩‍💻 Autora Brisa Giavedoni
*GitHub:* https://github.com/BrisaGiavedoni

***📌 Estado del proyecto:***
*✅ Finalizado*

***📚 Entregado como Trabajo Práctico Integrador***