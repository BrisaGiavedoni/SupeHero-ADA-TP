export function applyFilters(heroes, { search, race, gender, order }) {
  let filtered = heroes.filter((hero) => {
    const matchName = hero.name
      .toLowerCase()
      .includes(search.toLowerCase().trim());
    const matchRace = race ? hero.appearance.race === race : true;
    const matchGender = gender ? hero.appearance.gender === gender : true;
    return matchName && matchRace && matchGender;
  });

  filtered.sort((a, b) =>
    order === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  return filtered;
}
