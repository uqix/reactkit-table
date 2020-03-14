/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import actionCell from './actionCell';
import { IconButton } from '@material-ui/core';
import { Fragment } from 'react';
import buildColumn from './buildColumn';
import rowSelectColumn from './rowSelectColumn';
import rowNumColumn from './rowNumColumn';

export default function adaptColumns(columns, actions = [], rest) {
  const {rowExpandEnabled, recordNameKey} = rest;
  return [
    rowSelectColumn,
    rowNumColumn,

    rowExpandEnabled && {
      id: '_rowExpand',
      name: recordNameKey,
      label: ({
        _rtHeaderProps: {
          getToggleAllRowsExpandedProps,
          isAllRowsExpanded
        }
      }) => {
        const ToggleIcon = isAllRowsExpanded ? ExpandLess : ExpandMore;
        return (
          <IconButton
            size='small'
            {...getToggleAllRowsExpandedProps()}
          >
            <ToggleIcon />
          </IconButton>
        );
      },
      render: ({
        _rtCellProps: {
          cell: {value},
          row: {
            canExpand,
            getToggleRowExpandedProps,
            depth,
            isExpanded,
            xFlat,
          }
        }
      }) => {
        const ToggleIcon = isExpanded ? ExpandLess : ExpandMore;
        return (
          <Fragment>
            {!xFlat && (
              <IconButton
                css={css`
margin-left: ${depth * 16}px;
visibility: ${canExpand ? 'visible' : 'hidden'};
                    `}
                size='small'
                {...getToggleRowExpandedProps()}
              >
                <ToggleIcon />
              </IconButton>
            )}

            <span css={css`vertical-align: middle;`}>
              {value}
            </span>
          </Fragment>
        );
      },
    },

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
