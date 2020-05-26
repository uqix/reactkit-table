import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';

function GlobalFilter({
  preGlobalFilteredRows,
  setGlobalFilter,
  globalFilter,
  searchText = 'Search',
}) {
  return (
    <TextField
      label={searchText}
      value={globalFilter || ''}
      onChange={event =>
        setGlobalFilter(event.target.value || undefined)
      }
    />
  );
}

export default withStyles(
  {},
  {name: 'reactkit-table.GlobalFilter'}
)(GlobalFilter);
