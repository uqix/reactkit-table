export default function exactTextCaseFilter(rows, ids, filterValue) {
  return rows.filter(r =>
    ids.some(id => {
      const value = r.values[id];
      return value !== undefined
        && value !== null
        && String(value) === String(filterValue);
    })
  );
}
