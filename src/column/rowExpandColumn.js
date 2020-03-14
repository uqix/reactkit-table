/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { Fragment } from 'react';

export default function rowExpandColumn(recordNameKey) {
  return {
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
  }
}
