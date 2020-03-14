/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { useRouteMatch } from 'react-router-dom';

const actionColumn = actions => ({
  id: '_actions',
  label: '操作',
  name: row => row,
  render: actionCell(actions),
});

function actionCell(actions) {
  return function ActionCell({value: record}) {
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

export default actionColumn;
