// TODO inline
export function getColumnFilters(visibleColumns) {
  return visibleColumns.filter(c => !c.disableFilters);
}
