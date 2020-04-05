/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import UserList from './UserList';
import { Route } from 'react-router-dom';

export default function Main() {
  return (
    <main
      css={css`
h2 {
  margin-top: 0;
}
          `}
    >
      <Route exact path='/' component={UserList} />
    </main>
  );
}
