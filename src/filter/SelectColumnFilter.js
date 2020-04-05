/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

function SelectColumnFilter({
  column,
  optionAllText = 'ALL',
}) {
  const {
    filterValue,
    setFilter,
    preFilteredRows = [],
    id,
    Header,
    xFormat,
  } = column;

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
            .id || ''
        }
        onChange={event => {
          setFilter(event.target.value || undefined);
        }}
      >
        <MenuItem value='' css={css`color: gray`}>
          {optionAllText}
        </MenuItem>

        {options.map(({id, name}, i) =>
          <MenuItem key={i} value={id}>
            {xFormat(name)}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}

export default withStyles(
  {},
  {name: 'reactkit-table.SelectColumnFilter'}
)(SelectColumnFilter);
