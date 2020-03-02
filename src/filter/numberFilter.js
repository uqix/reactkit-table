import _ from  'lodash';

export default function numberFilter(rows, ids, filterValue) {
  let compare;
  if (_.isArray(filterValue)) {
    compare = value => isWithinRange(value, filterValue);
  } else {
    compare = value => value === filterValue;
  }

  return rows.filter(r =>
    ids.some(id => {
      const value = r.values[id];
      return compare(value);
    })
  );
}

function isWithinRange(value, [fromNum, toNum]) {
  if ((fromNum !== undefined) && (value < fromNum)) {
    return false;
  }
  if ((toNum !== undefined) && (value > toNum)) {
    return false;
  }
  return true;
}
