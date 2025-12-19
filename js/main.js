import { fetchHeroes } from "./api.js";
import { applyFilters } from "./filters.js";
import { paginate, totalPages } from "./pagination.js";
import { renderCard, showDetails } from "./ui.js";
import { initTheme } from "./theme.js";

const $searchInput = document.getElementById("hero-search");
const $raceFilter = document.getElementById("race-filter");
const $genderFilter = document.getElementById("gender-filter");
const $sortOrder = document.getElementById("sort-order");
const $searchBtn = document.getElementById("search-button");
const $themeBtn = document.getElementById("theme-toggle");

const $grid = document.getElementById("heroes-grid");
const $details = document.getElementById("details");

const $prevBtn = document.getElementById("prev-btn");
const $nextBtn = document.getElementById("next-btn");
const $pageNum = document.getElementById("page-num");

let heroes = [];
let filteredHeroes = [];
let page = 1;
const ITEMS_PER_PAGE = 20;

initTheme($themeBtn);

async function init() {
  $grid.innerHTML = `<p class="col-span-full text-center">Cargando héroes...</p>`;
  try {
    heroes = await fetchHeroes();
    filteredHeroes = [...heroes];
    renderCurrentPage();
  } catch {
    $grid.innerHTML = `<p class="col-span-full text-center text-red-600">Error al cargar héroes</p>`;
  }
}

function renderCurrentPage() {
  const heroesToShow = paginate(filteredHeroes, page, ITEMS_PER_PAGE);
  $grid.innerHTML = "";
  if (heroesToShow.length === 0) {
    $grid.innerHTML = `<p class="col-span-full text-center">No se encontraron héroes</p>`;
  }
  heroesToShow.forEach((hero) =>
    renderCard(hero, $grid, (hero) => showDetails(hero, $details, closeModal))
  );
  $pageNum.textContent = page;
  const pages = totalPages(filteredHeroes, ITEMS_PER_PAGE);
  $prevBtn.disabled = page === 1;
  $nextBtn.disabled = page === pages || pages === 0;
}

function closeModal() {
  $details.classList.add("hidden");
  $details.innerHTML = "";
}

/* =========================
   EVENTOS
========================= */
$searchBtn.addEventListener("click", () => {
  page = 1;
  filteredHeroes = applyFilters(heroes, {
    search: $searchInput.value,
    race: $raceFilter.value,
    gender: $genderFilter.value,
    order: $sortOrder.value,
  });
  renderCurrentPage();
});

$prevBtn.addEventListener("click", () => {
  if (page > 1) {
    page--;
    renderCurrentPage();
  }
});
$nextBtn.addEventListener("click", () => {
  if (page < totalPages(filteredHeroes, ITEMS_PER_PAGE)) {
    page++;
    renderCurrentPage();
  }
});

init();
