/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import _ from 'lodash';

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
    const buttonOverrides = _.assign(
      {},
      ...button
        .map(b => _.isFunction(b) ? b(props) : b)
        .filter(b => b)
    );

    return (
      <Button
        css={css`min-width: 32px;`}
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
