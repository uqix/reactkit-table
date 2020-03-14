/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const rowNumColumn = {
  id: '_rowNum',
  label: '#',
  render: ({_rtCellProps: {cell, xDragRef}}) => (
    <span
      css={css`
color: gray;
cursor: ${xDragRef ? 'move' : 'auto'};
          `}
      ref={xDragRef}
    >
      {cell.row.index + 1}
    </span>
  ),
  css: (css`
width: 20px;
padding: 8px 0 !important;
       `),
};

export default rowNumColumn;
