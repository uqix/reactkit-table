import { TextField } from '@material-ui/core';
import React from 'react';

export default function TextColumnFilter({column: {filterValue, setFilter, Header}}) {
  return (
    <TextField
      label={Header}
      value={filterValue || ''}
      onChange={event => setFilter(event.target.value || undefined)}
    />
  )
}
