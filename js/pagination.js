export function paginate(items, page, itemsPerPage) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return items.slice(start, end);
}

export function totalPages(items, itemsPerPage) {
  return Math.ceil(items.length / itemsPerPage);
}
