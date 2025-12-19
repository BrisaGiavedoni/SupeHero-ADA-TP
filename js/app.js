/* =========================
   REFERENCIAS DOM
========================= */
const $searchInput = document.getElementById("hero-search");
const $raceFilter = document.getElementById("race-filter");
const $genderFilter = document.getElementById("gender-filter");
const $sortOrder = document.getElementById("sort-order");
const $searchBtn = document.getElementById("search-button");

const $grid = document.getElementById("heroes-grid");
const $details = document.getElementById("details");

const $prevBtn = document.getElementById("prev-btn");
const $nextBtn = document.getElementById("next-btn");
const $pageNum = document.getElementById("page-num");

/* =========================
   ESTADO
========================= */
let heroes = [];
let filteredHeroes = [];
let page = 1;
const ITEMS_PER_PAGE = 20;

/* =========================
   FETCH HEROES
========================= */
async function fetchHeroes() {
  try {
    $grid.innerHTML = `<p class="col-span-full text-center">Cargando héroes...</p>`;

    const res = await fetch(
      "https://akabab.github.io/superhero-api/api/all.json"
    );
    heroes = await res.json();
    filteredHeroes = [...heroes];

    applyFilters();
  } catch (error) {
    $grid.innerHTML = `<p class="col-span-full text-center text-red-600">
      Error al cargar héroes
    </p>`;
  }
}

/* =========================
   FILTROS
========================= */
$searchBtn.addEventListener("click", () => {
  page = 1;
  applyFilters();
});

function applyFilters() {
  const search = $searchInput.value.toLowerCase().trim();
  const race = $raceFilter.value;
  const gender = $genderFilter.value;
  const order = $sortOrder.value;

  filteredHeroes = heroes.filter((hero) => {
    const matchName = hero.name.toLowerCase().includes(search);
    const matchRace = race ? hero.appearance.race === race : true;
    const matchGender = gender ? hero.appearance.gender === gender : true;
    return matchName && matchRace && matchGender;
  });

  filteredHeroes.sort((a, b) =>
    order === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  renderPage();
}

/* =========================
   PAGINADO
========================= */
$prevBtn.addEventListener("click", () => {
  if (page > 1) {
    page--;
    renderPage();
  }
});

$nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredHeroes.length / ITEMS_PER_PAGE);
  if (page < totalPages) {
    page++;
    renderPage();
  }
});

/* =========================
   RENDER PAGINA
========================= */
function renderPage() {
  $grid.innerHTML = "";

  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const heroesToShow = filteredHeroes.slice(start, end);

  if (heroesToShow.length === 0) {
    $grid.innerHTML = `<p class="col-span-full text-center">
      No se encontraron héroes
    </p>`;
  }

  heroesToShow.forEach(renderCard);

  $pageNum.textContent = page;

  const totalPages = Math.ceil(filteredHeroes.length / ITEMS_PER_PAGE);
  $prevBtn.disabled = page === 1;
  $nextBtn.disabled = page === totalPages || totalPages === 0;
}

/* =========================
   CARD
========================= */
function renderCard(hero) {
  const card = document.createElement("article");

  card.className =
    "bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg flex flex-col items-center text-center hover:scale-105 transition";

  card.innerHTML = `
    <img
      src="${hero.images.sm}"
      alt="${hero.name}"
      class="w-28 h-28 rounded-full object-cover mb-4"
    />
    <h3 class="text-xl font-black text-sky-950 dark:text-white">
      ${hero.name}
    </h3>
    <p class="text-sm text-slate-600 dark:text-slate-300">
      ${hero.appearance.race || "Desconocido"}
    </p>
    <button
      class="cursor-pointer  mt-4 bg-red-600 hover:bg-black text-white font-black py-2 px-6 rounded-full transition"
    >
      Ver detalles
    </button>
  `;

  card
    .querySelector("button")
    .addEventListener("click", () => showDetails(hero));

  $grid.appendChild(card);
}

/* =========================
   MODAL
========================= */
function showDetails(hero) {
  $details.className =
    "fixed inset-0 z-50 flex items-center justify-center bg-black/70";

  $details.innerHTML = `
    <div class="bg-slate-900 text-white rounded-2xl max-w-4xl w-full mx-4 p-8 relative shadow-2xl">

      <!-- BOTÓN CERRAR -->
      <button
        class="cursor-pointer absolute top-4 right-4 text-red-500 text-3xl font-black hover:scale-110 transition"
        id="close-modal"
      >
        ✕
      </button>

      <div class="grid md:grid-cols-2 gap-8 items-center">

        <!-- IMAGEN -->
        <img
          src="${hero.images.lg}"
          alt="${hero.name}"
          class="rounded-xl w-full max-h-[500px] object-cover"
        />

        <!-- INFO -->
        <div>
          <h2 class="text-4xl font-black text-red-500 mb-4">
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

  $details.addEventListener("click", (e) => {
    if (e.target === $details.firstElementChild) closeModal();
  });
}

function closeModal() {
  $details.classList.add("hidden");
  $details.innerHTML = "";
}

/* =========================
   INIT
========================= */
fetchHeroes();
