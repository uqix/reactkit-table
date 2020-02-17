/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { useRouteMatch } from 'react-router-dom';

const ActionCell = actions => function ActionCell({cell: {value: row}}) {
  const match = useRouteMatch();
  return (
    <Fragment>
      {actions.map((Action, i) =>
        <Action key={i} row={row} match={match} />
      )}
    </Fragment>
  );
}

export default ActionCell;
