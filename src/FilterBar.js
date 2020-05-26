import { IconButton, Tooltip } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      marginRight: theme.spacing(1),
      width: 150
    }
  },
}));

function FilterBar({
  filters,
  openAdvancedModeText = 'Open advanced mode',
  closeAdvancedModeText = 'Close advanced mode',
}) {
  const classes = useStyles();
  const [advancedModeEnabled, setAdvancedModeEnabled] = useState();

  return (
    <div className={classes.root}>
      <Tooltip
        title={advancedModeEnabled
               ? closeAdvancedModeText
               : openAdvancedModeText
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
