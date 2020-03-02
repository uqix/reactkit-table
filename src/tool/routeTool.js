/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function routeTool(
  // 显示内容
  content,

  // 目标路径: match => <Link>.to
  // Link: https://reacttraining.com/react-router/web/api/Link
  to,

  // 其他Button props
  button
) {
  return function RouteTool({match}) {
    return (
      <Button
        {...button}
        component={Link}
        to={to(match)}
      >
        {content}
      </Button>
    );
  };
}
