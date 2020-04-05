/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { useRouteMatch } from 'react-router-dom';

export default function actionColumn(actions) {
  return {
    id: '_actions',
    label: '',
    render: actionCell(actions),
  };
}

function actionCell(actions) {
  return function ActionCell({record}) {
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
  };
}
