import actionCell from './actionCell';
import buildColumn from './buildColumn';
import rowSelectColumn from './rowSelectColumn';
import rowNumColumn from './rowNumColumn';
import rowExpandColumn from './rowExpandColumn';

export default function adaptColumns(columns, actions = [], rest) {
  const {rowExpandEnabled, recordNameKey} = rest;
  return [
    rowSelectColumn,
    rowNumColumn,

    rowExpandEnabled && rowExpandColumn(recordNameKey),

    ...columns,

    actions.length > 0 && {
      id: '_actions',
      label: '操作',
      name: row => row,         // TODO actionCol
      render: actionCell(actions),
    },
  ]
    .filter(c => c)
    .map(c => buildColumn(c, rest));
}
