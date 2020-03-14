import buildColumn from './buildColumn';
import rowSelectColumn from './rowSelectColumn';
import rowNumColumn from './rowNumColumn';
import rowExpandColumn from './rowExpandColumn';
import actionColumn from './actionColumn';

export default function adaptColumns(columns, actions = [], rest) {
  const {rowExpandEnabled, recordNameKey} = rest;
  return [
    rowSelectColumn,
    rowNumColumn,
    rowExpandEnabled && rowExpandColumn(recordNameKey),
    ...columns,
    actions.length > 0 && actionColumn(actions),
  ]
    .filter(c => c)
    .map(c => buildColumn(c, rest));
}
