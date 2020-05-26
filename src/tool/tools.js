import { Add } from '@material-ui/icons';
import React from 'react';
import buttonTool from './buttonTool';
import routeTool from './routeTool';

// -------- util tools --------

export const AddTool = routeTool(
  '新增',
  match =>  `${match.url}/add`,
  {startIcon: <Add />}
);

export function saveRowDndSortTool(
  // 保存事件回调
  // sorted record ids => any
  save
) {
  return buttonTool(
    '保存次序',
    ({records}) => {
      if (records) {
        save(records.map(r => r.id));
      }
    }
  );
}
