export async function fetchHeroes() {
  try {
    const res = await fetch(
      "https://akabab.github.io/superhero-api/api/all.json"
    );
    const heroes = await res.json();
    return heroes;
  } catch (error) {
    console.error("Error al cargar héroes", error);
    throw error;
  }
}
