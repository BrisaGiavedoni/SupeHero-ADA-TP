/* =========================
   THEME.JS - Modo oscuro/claro
========================= */

export function initTheme(toggleBtnId = "theme-toggle", circleId = "switch-circle", iconId = "theme-icon") {
  const themeToggle = document.getElementById(toggleBtnId);
  const switchCircle = document.getElementById(circleId);
  const themeIcon = document.getElementById(iconId);

  if (!themeToggle || !switchCircle || !themeIcon) return;

  // Detecta preferencia inicial del sistema
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    document.documentElement.classList.add("dark");
    switchCircle.classList.add("translate-x-7"); // mueve el círculo al final
    themeIcon.textContent = "☀️"; // icono para modo oscuro
  }

  // Transición global de colores
  document.documentElement.style.transition = "background-color 0.5s, color 0.5s";

  // Evento click para toggle
  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {
      switchCircle.classList.add("translate-x-7");
      themeIcon.textContent = "☀️";
    } else {
      switchCircle.classList.remove("translate-x-7");
      themeIcon.textContent = "🌙";
    }
  });

  // Opcional: escuchar cambios en la preferencia del sistema en tiempo real
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    if (!document.documentElement.classList.contains("dark")) {
      if (e.matches) { // sistema cambió a oscuro
        document.documentElement.classList.add("dark");
        switchCircle.classList.add("translate-x-7");
        themeIcon.textContent = "☀️";
      } else { // sistema cambió a claro
        document.documentElement.classList.remove("dark");
        switchCircle.classList.remove("translate-x-7");
        themeIcon.textContent = "🌙";
      }
    }
  });
}
