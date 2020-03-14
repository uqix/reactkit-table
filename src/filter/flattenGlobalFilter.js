import flatten from './flatten';

export default function flattenGlobalFilter(columnFormats) {
  return flatten(function globalFilter(rows, ids, filterValue) {
    return rows.filter(r =>
      ids.some(id => {
        const format = columnFormats[id];
        if (!format) {
          return false;
        }
        const value = format(r.values[id]);
        return value !== undefined
          && value !== null
          && String(value).toLowerCase().includes(String(filterValue).toLowerCase());
      })
    );
  });
}
