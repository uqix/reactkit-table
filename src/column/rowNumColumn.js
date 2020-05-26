import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
  root: {
    color: 'gray',
    cursor: ({xDragRef}) => xDragRef ? 'move' : 'auto'
  },
  cell: {
    width: 20,
    padding: '8px 0 !important'
  },
});

const rowNumColumn = {
  id: '_rowNum',
  label: '#',
  render: ({_rtCellProps: {cell, xDragRef}}) => {
    const classes = useStyles({xDragRef});
    return (
      <span className={classes.root} ref={xDragRef}>
        {cell.row.index + 1}
      </span>
    );
  },
  // TODO
  // css: classes.cell
};

export default rowNumColumn;
