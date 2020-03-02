/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Checkbox } from '@material-ui/core';

export default function RowSelectCheckbox(props) {
  return (
    <Checkbox
      css={css`padding: 4px;`}
      size='small'
      {...props}
    />
  );
}
