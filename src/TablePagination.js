/** @jsx jsx */
import { jsx } from '@emotion/core';
import { TablePagination as MrTablePagination } from '@material-ui/core';

export default function TablePagination({
  totalRowCount,
  pageSize,
  pageIndex,
  gotoPage,
  setPageSize,
}) {
  const pageCount = Math.ceil(totalRowCount / pageSize);
  return (
    <MrTablePagination
      count={totalRowCount}
      rowsPerPage={pageSize}
      page={pageIndex}
      onChangePage={(_, page) => gotoPage(page)}
      labelDisplayedRows={({from, to, count}) =>
        totalRowCount > 0
          ? `${pageIndex+1}/${pageCount}页 · ${from}-${to}/${count}行`
          : '无数据'
      }
      onChangeRowsPerPage={event =>
        setPageSize(event.target.value)
      }
      rowsPerPageOptions={[
        // 3,
        10, 25, 50, 100,
        1000, 5000, 10000
      ]}
    />
  );
}
