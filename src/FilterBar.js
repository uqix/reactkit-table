/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Tooltip, IconButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useState } from 'react';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

function FilterBar({filters}) {
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

export default withStyles(
  {},
  {name: 'reactkit-table.FilterBar'}
)(FilterBar);
