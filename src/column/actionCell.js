/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { useRouteMatch } from 'react-router-dom';

const actionCell = actions => function ActionCell({value: record}) {
  const match = useRouteMatch();
  return (
    <Fragment>
      {actions.map((Action, i) =>
        <Action
          key={i}
          match={match}
          record={record}
        />
      )}
    </Fragment>
  );
}

export default actionCell;
