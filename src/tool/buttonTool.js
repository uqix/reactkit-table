/** @jsx jsx */
import { jsx } from '@emotion/core';
import Button from './Button';

export default function buttonTool (
  // 显示内容
  content,

  // 点击事件回调
  // Tool props => any
  handle,

  // 其他Button props
  button
) {
  return function ButtonTool(props) {
    return (
      <Button
        {...button}
        onClick={() => {
          handle(props);
        }}
      >
        {content}
      </Button>
    );
  }
}
