export default function exactTextCaseFilter(rows, ids, filterValue) {
  return rows.filter(r =>
    ids.some(id => {
      const value = r.values[id];
      // TODO value null or undefined?
      return String(value) === String(filterValue);
    })
  );
}
