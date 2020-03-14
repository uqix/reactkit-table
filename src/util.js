import _ from 'lodash';

export function getColumnFilters(headerGroups) {
  return _.flatMap(headerGroups, g =>
    g.headers.filter(h => !h.disableFilters)
  );
}
