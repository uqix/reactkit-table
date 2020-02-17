/** @jsx jsx */
import { jsx } from '@emotion/core';
import { TextField } from '@material-ui/core';

export default function GlobalFilter({
  preGlobalFilteredRows,
  setGlobalFilter,
  globalFilter,
}) {
  const preFilteredRowCount =
        preGlobalFilteredRows
        ? `(${preGlobalFilteredRows.length}行)`
        : '';

  return (
    <TextField
      label={`全局搜${preFilteredRowCount}`}
      value={globalFilter || ''}
      onChange={event =>
        setGlobalFilter(event.target.value || undefined)
      }
    />
  );
}
