/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
  optionAll: {
    color: 'gray'
  }
});

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

  const classes = useStyles();

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
        <MenuItem value='' className={classes.optionAll}>
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
