export const initDarkMode = () => {
  const html = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const circle = document.getElementById("switch-circle");
  const icon = document.getElementById("theme-icon");

  const updateUI = (isDark) => {
    const translate = isDark ? "translateX(24px)" : "translateX(0)";
    circle.style.transform = translate;
    icon.style.transform = translate;
    icon.textContent = isDark ? "☀️" : "🌙";
  };

  const savedTheme = localStorage.getItem("theme");
  const isDark =
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);

  html.classList.toggle("dark", isDark);
  updateUI(isDark);

  toggle.addEventListener("click", () => {
    const nowDark = !html.classList.contains("dark");
    html.classList.toggle("dark", nowDark);
    localStorage.setItem("theme", nowDark ? "dark" : "light");
    updateUI(nowDark);
  });
};
