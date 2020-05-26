import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 32
  },
});

export default function routeAction(
  // 显示内容
  content,

  // 目标路径: <Action>.props => <Link>.to
  // Link: https://reacttraining.com/react-router/web/api/Link
  to,

  // 其他<Button>.props
  // 或函数: <Action>.props => 其他<Button>.props
  ...button
) {
  return function(props) {
    const classes = useStyles();

    const buttonOverrides = _.assign(
      {},
      ...button
        .map(b => _.isFunction(b) ? b(props) : b)
        .filter(b => b)
    );

    return (
      <Button
        className={classes.root}
        to={to(props)}
        {...buttonOverrides}
        size='small'
        component={Link}
      >
        {content}
      </Button>
    );
  }
}
