import { TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
  root: ({isParent}) => ({
    ...(isParent ? {
      backgroundColor: '#f5f8fa',
      '&:not(:last-child)': {
        borderRight: '1px solid #e1e8ed'
      }
    } : {})
  })
});

export default function HeadCell({header}) {
  const isParent = !!header.headers;
  const classes = useStyles({isParent});
  // TODO
  // h.xCss
  return (
    <TableCell
      className={classes.root}
      {...header.getHeaderProps()}
      align={isParent ? 'center' : 'left'}
    >
      {header.render('Header')}
    </TableCell>
  );
}
