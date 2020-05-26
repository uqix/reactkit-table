import { Button as MrButton } from '@material-ui/core';
import React from 'react';

export default function Button(props) {
  return (
    <MrButton
      {...props}
      variant='outlined'
      size='small'
    />
  );
}
