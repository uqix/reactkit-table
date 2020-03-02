/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Toolbar, Tooltip, IconButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useRouteMatch } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';

// TODO memo
export default function TableToolbar({
  tools = [],
  filters,
  selectedRecords,
  records,
}) {
  const match = useRouteMatch();

  return (
    <Toolbar>
      <div
        css={theme => css`
.MuiButton-root {
    margin-right: ${theme.spacing(2)}px;
}
            `}
      >
        {tools.map((Tool, i) =>
          <Tool
            key={i}
            match={match}
            selectedRecords={selectedRecords}
            records={records}
          />
        )}
      </div>
      <div css={css`flex-grow: 1;`} />
      <SearchBar filters={filters} />
    </Toolbar>
  );
}

function SearchBar({filters}) {
  const [advancedModeEnabled, setAdvancedModeEnabled] = useState();
  return (
    <div
      css={theme => css`
.MuiFormControl-root {
  margin-right: ${theme.spacing(1)}px;
  width: 150px;
}
          `}
    >
      <Tooltip
        title={advancedModeEnabled
               ? '关闭高级模式'
               : '打开高级模式(区间)'
              }
      >
        <IconButton
          onClick={() => setAdvancedModeEnabled(!advancedModeEnabled)}
          color={advancedModeEnabled ? 'primary' : 'default'}
        >
          <Search />
        </IconButton>
      </Tooltip>
      {filters.map(f =>
        React.cloneElement(f, {advancedModeEnabled})
      )}
    </div>
  );
}
