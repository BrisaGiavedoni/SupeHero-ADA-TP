// main.js
import { fetchHeroes } from "./api.js";
import { applyFilters } from "./filters.js";
import { paginate, totalPages } from "./pagination.js";
import { renderCard, showDetails } from "./ui.js";
import { initDarkMode } from "./theme.js";

document.addEventListener("DOMContentLoaded", async () => {
  initDarkMode();

  // Elementos DOM
  const heroesGrid = document.getElementById("heroes-grid");
  const searchInput = document.getElementById("hero-search");
  const raceFilter = document.getElementById("race-filter");
  const genderFilter = document.getElementById("gender-filter");
  const sortOrder = document.getElementById("sort-order");
  const searchBtn = document.getElementById("search-button");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const pageNum = document.getElementById("page-num");
  const detailsSection = document.getElementById("details");

  let heroesData = [];
  let currentPage = 1;
  const heroesPerPage = 20;

  const closeModal = () => {
    detailsSection.classList.add("hidden");
    detailsSection.innerHTML = "";
  };

  // Cargar héroes desde la API
  try {
    heroesData = await fetchHeroes();
    renderHeroes();
  } catch (error) {
    heroesGrid.innerHTML = '<p class="text-red-600">Error al cargar héroes</p>';
    console.error(error);
  }

  function renderHeroes() {
    heroesGrid.innerHTML = "";
    const filters = {
      search: searchInput.value,
      race: raceFilter.value,
      gender: genderFilter.value,
      order: sortOrder.value,
    };

    const filtered = applyFilters(heroesData, filters);
    const pages = totalPages(filtered, heroesPerPage);
    const heroesToShow = paginate(filtered, currentPage, heroesPerPage);

    heroesToShow.forEach((hero) =>
      renderCard(hero, heroesGrid, (h) =>
        showDetails(h, detailsSection, closeModal)
      )
    );

    pageNum.textContent = currentPage;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === pages || pages === 0;
  }

  // Eventos
  searchBtn.addEventListener("click", () => {
    currentPage = 1;
    renderHeroes();
  });

  [searchInput, raceFilter, genderFilter, sortOrder].forEach((el) => {
    el.addEventListener("change", () => {
      currentPage = 1;
      renderHeroes();
    });
  });

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderHeroes();
    }
  });

  nextBtn.addEventListener("click", () => {
    currentPage++;
    renderHeroes();
  });
});
