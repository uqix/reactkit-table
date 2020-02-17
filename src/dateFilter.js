import { isSameDay, isBefore, isAfter, toDate } from 'date-fns';
import _ from  'lodash';

export default function dateFilter(rows, ids, filterValue) {
  let compare;
  if (_.isArray(filterValue)) {
    const [fromDate, toDate] = filterValue;
    const fromDay = fromDate && dayOf(fromDate);
    const toDay = toDate && dayOf(toDate);
    compare = value => isWithinRange(value, fromDay, toDay);
  } else {
    compare = value => isSameDay(value, filterValue);
  }

  return rows.filter(r =>
    ids.some(id => {
      const value = r.values[id];
      return value && compare(value);
    })
  );
}

function isWithinRange(value, fromDay, toDay) {
  const valueDay = dayOf(value);
  if (fromDay && isBefore(valueDay, fromDay)) {
    return false;
  }
  if (toDay && isAfter(valueDay, toDay)) {
    return false;
  }
  return true;
}

export function dayOf(date) {
  return toDate(date).setHours(0, 0, 0, 0);
}
