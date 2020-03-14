/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Checkbox } from '@material-ui/core';

const rowSelectColumn = {
  id: '_rowSelect',
  label: ({
    _rtHeaderProps: {
      getToggleAllRowsSelectedProps,
    }
  }) => (
    <RowSelectCheckbox
      {...getToggleAllRowsSelectedProps()}
    />
  ),
  render: ({
    _rtCellProps: {
      row: {
        getToggleRowSelectedProps
      }
    }
  }) => (
    <RowSelectCheckbox
      {...getToggleRowSelectedProps()}
    />
  ),
  css: (css`
width: 40px;
padding: 4px !important;
      `),
};

function RowSelectCheckbox(props) {
  return (
    <Checkbox
      css={css`padding: 4px;`}
      size='small'
      {...props}
    />
  );
}

export default rowSelectColumn;
