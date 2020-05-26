import { TablePagination } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';

function Pagination({
  totalRowCount,
  pageSize,
  pageIndex,
  gotoPage,
  setPageSize,
  currentPageText = ({page, pageCount, rowFrom, rowTo, rowCount}) => (
    `Page ${page} (${pageCount} pages, ${rowCount} rows)`
  ),
  noDataText = 'No data',
}) {
  const pageCount = Math.ceil(totalRowCount / pageSize);
  pageIndex = pageIndex < pageCount ? pageIndex : 0;

  return (
    <TablePagination
      count={totalRowCount}
      rowsPerPage={pageSize}
      page={pageIndex}
      onChangePage={(_, page) => gotoPage(page)}
      labelDisplayedRows={({from, to, count}) =>
        totalRowCount > 0
          ? currentPageText({
            page: pageIndex + 1,
            pageCount,
            rowFrom: from,
            rowTo: to,
            rowCount: count,
          })
          : noDataText
      }
      onChangeRowsPerPage={event => {
        setPageSize(event.target.value);
      }}
      rowsPerPageOptions={[
        // 3,
        10, 25, 50, 100,
        1000, 5000, 10000
      ]}
    />
  );
}

export default withStyles(
  {},
  {name: 'reactkit-table.Pagination'}
)(Pagination);
