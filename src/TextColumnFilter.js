/** @jsx jsx */
import { jsx } from '@emotion/core';
import { TextField } from '@material-ui/core';

export default function TextColumnFilter({column: {filterValue, setFilter, Header}}) {
  return (
    <TextField
      label={Header}
      value={filterValue || ''}
      onChange={event => setFilter(event.target.value || undefined)}
    />
  )
}
