/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Toolbar as MuiToolbar } from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
import FilterBar from './FilterBar';

// TODO memo
export default function Toolbar({
  tools = [],
  filters,
  selectedRecords,
  records,
}) {
  const match = useRouteMatch();

  return (
    <MuiToolbar>
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
      <FilterBar filters={filters} />
    </MuiToolbar>
  );
}
