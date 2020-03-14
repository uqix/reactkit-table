/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import RowSelectCheckbox from './RowSelectCheckbox';
import actionCell from './actionCell';
import { IconButton } from '@material-ui/core';
import { Fragment } from 'react';
import buildColumn from './buildColumn';

export default function adaptColumns(columns, actions = [], rest) {
  const {rowExpandEnabled, recordNameKey} = rest;
  return [
    {
      id: '_rowSelect',
      label: ({_rtHeaderProps: {getToggleAllRowsSelectedProps}}) => (
        <RowSelectCheckbox {...getToggleAllRowsSelectedProps()} />
      ),
      render: ({_rtCellProps: {row: {getToggleRowSelectedProps}}}) => (
        <RowSelectCheckbox {...getToggleRowSelectedProps()} />
      ),
      css: (css`
width: 40px;
padding: 4px !important;
      `),
    },

    {
      id: '_rowNum',
      label: '#',
      render: ({_rtCellProps: {cell, xDragRef}}) => (
        <span
          css={css`
color: gray;
cursor: ${xDragRef ? 'move' : 'auto'};
              `}
          ref={xDragRef}
        >
          {cell.row.index + 1}
        </span>
      ),
      css: (css`
width: 20px;
padding: 8px 0 !important;
            `),
    },

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
