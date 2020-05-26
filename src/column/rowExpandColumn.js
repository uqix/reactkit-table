import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import React, { Fragment } from 'react';

const useStyles = makeStyles({
  icon: {
    marginLeft: ({depth}) => depth * 16,
    visibility: ({canExpand}) => canExpand ? 'visible' : 'hidden',
  },
  text: {
    verticalAlign: 'middle',
  },
});

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
      const classes = useStyles({depth, canExpand});
      const ToggleIcon = isExpanded ? ExpandLess : ExpandMore;

      return (
        <Fragment>
          {!xFlat && (
            <IconButton
              className={classes.icon}
              size='small'
              {...getToggleRowExpandedProps()}
            >
              <ToggleIcon />
            </IconButton>
          )}

          <span className={classes.text}>
            {value}
          </span>
        </Fragment>
      );
    },
  }
}
