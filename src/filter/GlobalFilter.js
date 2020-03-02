/** @jsx jsx */
import { jsx } from '@emotion/core';
import { TextField } from '@material-ui/core';

export default function GlobalFilter({
  preGlobalFilteredRows,
  setGlobalFilter,
  globalFilter,
}) {
  return (
    <TextField
      label={`搜全局`}
      value={globalFilter || ''}
      onChange={event =>
        setGlobalFilter(event.target.value || undefined)
      }
    />
  );
}
