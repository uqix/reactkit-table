import { Toolbar as MuiToolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import FilterBar from './FilterBar';

const useStyles = makeStyles(theme => ({
  tools: {
    '& .MuiButton-root': {
      marginRight: theme.spacing(2)
    }
  },
  separator: {
    flexGrow: 1
  }
}));

// TODO memo
export default function Toolbar({
  tools = [],
  filters,
  selectedRecords,
  records,
}) {
  const match = useRouteMatch();
  const classes = useStyles();

  return (
    <MuiToolbar>
      <div className={classes.tools}>
        {tools.map((Tool, i) =>
          <Tool
            key={i}
            match={match}
            selectedRecords={selectedRecords}
            records={records}
          />
        )}
      </div>
      <div className={classes.separator} />
      <FilterBar filters={filters} />
    </MuiToolbar>
  );
}
