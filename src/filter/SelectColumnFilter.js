/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

export default function SelectColumnFilter({column}) {
  const {filterValue, setFilter, preFilteredRows = [], id, Header} = column;
  let options = column.xOptions;

  options = React.useMemo(
    () => {
      if (options) {
        return options;
      }

      const set = new Set();

      preFilteredRows.forEach(r => {
        set.add(r.values[id]);
      });

      return [...set.values()]
        .map(v => ({
          id: v,
          name: v
        }));
    },
    [id, preFilteredRows, options]
  );

  return (
    <FormControl>
      <InputLabel>{Header}</InputLabel>
      <Select
        value={
          (options.find(o => o.id === filterValue) || {})
            .id
            || ''
        }
        onChange={event =>
          setFilter(event.target.value || undefined)
        }
      >
        <MenuItem value='' css={css`color: gray`}>
          不限
        </MenuItem>

        {options.map(({id, name}, i) =>
          <MenuItem key={i} value={id}>
            {column.Cell({cell: {value: name}})}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
