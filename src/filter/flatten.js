export default function flatten(filter) {
  return function(rows, ids, filterValue) {
    const flatRows = treeToFlat(rows)
          .map(r => ({
            ...r,
            // or useFilters would recursively filter subRows
            subRows: [],
            depth: 0,
            xFlat: true,
          }));
    return filter(flatRows, ids, filterValue);
  };
}

function treeToFlat(rows) {
  return [
    ...rows,
    ...rows
      .map(r =>
        treeToFlat(r.subRows || [])
      )
      .reduce(
        (pre, cur) => [...pre, ...cur],
        []
      )
  ];
}
