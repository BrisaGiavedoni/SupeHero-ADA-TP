export function renderCard(hero, container, showDetails) {
  const card = document.createElement("article");

  card.className = `
    rounded-xl p-6 shadow-lg
    flex flex-col items-center text-center
    transform transition-all duration-500
    hover:scale-105 hover:shadow-2xl
  `;

  // estilos por variables
  card.style.backgroundColor = "var(--bg-card)";
  card.style.color = "var(--text-main)";
  card.style.border = "4px solid var(--border-color)";

  card.innerHTML = `
    <img 
      src="${hero.images.sm}" 
      alt="${hero.name}"
      class="w-28 h-28 rounded-full object-cover mb-4 transition-transform duration-500 hover:scale-110"
    />

    <h3 class="text-xl font-black mb-1">
      ${hero.name}
    </h3>

    <p class="text-sm opacity-80">
      ${hero.appearance.race || "Desconocido"}
    </p>

    <button
  class="cursor-pointer mt-5 font-black py-2.5 px-7 rounded-full
         transition-all duration-300 uppercase tracking-wider
         shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
         active:translate-y-1 active:shadow-none"
  style="
    background: var(--btn-bg);
    color: var(--text-main);
  "
>
  Ver detalles
</button>
  `;

  card
    .querySelector("button")
    .addEventListener("click", () => showDetails(hero));

  container.appendChild(card);
}

export function showDetails(hero, detailsContainer, closeModal) {
  detailsContainer.className =
    "fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500";

  detailsContainer.style.backgroundColor = "rgba(0,0,0,0.75)";

  detailsContainer.innerHTML = `
    <div
      class="rounded-2xl max-w-4xl w-full mx-4 p-8 relative shadow-2xl
             transform scale-95 transition-transform duration-500"
      style="background: var(--bg-card); color: var(--text-main);"
    >
      <button
        id="close-modal"
        class="cursor-pointer absolute top-4 right-4 text-3xl font-black transition"
        style="color: var(--accent);"
      >
        ✕
      </button>

      <div class="grid md:grid-cols-2 gap-8 items-center">
        <img
          src="${hero.images.lg}"
          alt="${hero.name}"
          class="rounded-xl w-full max-h-[500px] object-cover transition-transform duration-500 hover:scale-105"
        />

        <div>
          <h2 class="text-4xl font-black mb-4" style="color: var(--accent)">
            ${hero.name}
          </h2>

          <p><strong>Nombre real:</strong> ${
            hero.biography.fullName || "N/A"
          }</p>
          <p><strong>Editorial:</strong> ${
            hero.biography.publisher || "N/A"
          }</p>
          <p><strong>Raza:</strong> ${hero.appearance.race || "Desconocido"}</p>
          <p><strong>Género:</strong> ${hero.appearance.gender}</p>
          <p><strong>Altura:</strong> ${hero.appearance.height[1]}</p>
          <p><strong>Peso:</strong> ${hero.appearance.weight[1]}</p>

          <h3 class="mt-6 font-black text-xl">Estadísticas</h3>
          <ul class="grid grid-cols-2 gap-3 mt-3 text-sm">
            <li>🧠 Inteligencia: ${hero.powerstats.intelligence}</li>
            <li>💪 Fuerza: ${hero.powerstats.strength}</li>
            <li>⚡ Velocidad: ${hero.powerstats.speed}</li>
            <li>🔥 Combate: ${hero.powerstats.combat}</li>
          </ul>
        </div>
      </div>
    </div>
  `;

  document.getElementById("close-modal").addEventListener("click", closeModal);

  detailsContainer.addEventListener("click", (e) => {
    if (e.target === detailsContainer) closeModal();
  });
}
