/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Button as MrButton } from '@material-ui/core';

export default function Button(props) {
  return (
    <MrButton
      {...props}
      variant='outlined'
      size='small'
    />
  );
}
