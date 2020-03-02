/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import UserList from './UserList';

export default function Main() {
  return (
    <main
      css={theme => css`
flex-grow: 1;
background-color: ${theme.palette.background.default};
padding: ${theme.spacing(3)}px;

h2 {
    margin-top: 0;
}
          `}
    >
      <UserList />
    </main>
  );
}
