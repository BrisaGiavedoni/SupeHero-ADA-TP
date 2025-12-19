tailwind.config = {
  darkMode: "class", // activa dark mode usando la clase "dark" en <html>
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        fondo: "var(--bg-main)", // Fondo general
        superficie: "var(--bg-card)", // Cards, header, buscador
        texto: "var(--text-main)", // Color de texto
        acento: "var(--accent)", // Elementos destacados
        primary: "var(--primary)", // Color de marca
        borde: "var(--border-color)", // Bordes y líneas
        btn: "var(--btn-bg)", // Botones
        "btn-hover": "var(--btn-hover)", // Hover de botones
      },
      boxShadow: {
        card: "6px 6px 0 var(--border-color)", // sombra de las cards
        cardHover: "10px 10px 0 var(--border-color)", // hover
      },
      transitionProperty: {
        "bg-color": "background-color",
        "text-color": "color",
      },
    },
  },
};
