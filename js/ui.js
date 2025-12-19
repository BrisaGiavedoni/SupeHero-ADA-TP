export function renderCard(hero, container, showDetails) {
  const card = document.createElement("article");
  card.className = `
    bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg
    flex flex-col items-center text-center
    transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl
  `;

  card.innerHTML = `
    <img src="${hero.images.sm}" alt="${hero.name}"
      class="w-28 h-28 rounded-full object-cover mb-4 transition-transform duration-500 hover:scale-110"/>
    <h3 class="text-xl font-black text-sky-950 dark:text-white">${
      hero.name
    }</h3>
    <p class="text-sm text-slate-600 dark:text-slate-300">${
      hero.appearance.race || "Desconocido"
    }</p>
    <button class="cursor-pointer mt-4 bg-red-600 hover:bg-black text-white font-black py-2 px-6 rounded-full transition duration-300">
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
    "fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-opacity duration-500";

  detailsContainer.innerHTML = `
    <div class="bg-slate-900 text-white rounded-2xl max-w-4xl w-full mx-4 p-8 relative shadow-2xl transform scale-95 transition-transform duration-500">
      <button class="cursor-pointer absolute top-4 right-4 text-red-500 text-3xl font-black hover:scale-110 transition" id="close-modal">✕</button>
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <img src="${hero.images.lg}" alt="${
    hero.name
  }" class="rounded-xl w-full max-h-[500px] object-cover transition-transform duration-500 hover:scale-105"/>
        <div>
          <h2 class="text-4xl font-black text-red-500 mb-4">${hero.name}</h2>
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
    if (e.target === detailsContainer.firstElementChild) closeModal();
  });
}
