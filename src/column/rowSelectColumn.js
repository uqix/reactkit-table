import { Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
  root: {
    padding: 4
  },
});

const rowSelectColumn = {
  id: '_rowSelect',
  label: ({
    _rtHeaderProps: {
      getToggleAllRowsSelectedProps,
    }
  }) => (
    <RowSelectCheckbox
      {...getToggleAllRowsSelectedProps()}
    />
  ),
  render: ({
    _rtCellProps: {
      row: {
        getToggleRowSelectedProps
      }
    }
  }) => (
    <RowSelectCheckbox
      {...getToggleRowSelectedProps()}
    />
  ),
  // TODO
//   css: (css`
// width: 40px;
// padding: 4px !important;
//       `),
};

function RowSelectCheckbox(props) {
  const classes = useStyles();

  return (
    <Checkbox
      className={classes.root}
      size='small'
      {...props}
    />
  );
}

export default rowSelectColumn;
