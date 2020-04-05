/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Table as MrTable, TableHead, TableRow, TableCell, TableBody, TableFooter } from '@material-ui/core';
import { useTable, usePagination, useFilters, useGlobalFilter, useRowSelect, useExpanded } from 'react-table';
import _ from 'lodash';
import { Fragment, useMemo, useCallback } from 'react';
import Toolbar from './Toolbar';
import GlobalFilter from './filter/GlobalFilter';
import TablePropTypes from './TablePropTypes';
import Pagination from './Pagination';
import Row from './Row';
import flattenGlobalFilter from './filter/flattenGlobalFilter';
import adaptColumns from './column/adaptColumns';
import useAsyncModeIfSo from './useAsyncModeIfSo';

Table.propTypes = TablePropTypes;

export default function Table(props) {
  const {
    columns,

    queryRecords,
    records,

    recordIdKey = 'id',
    recordNameKey = 'name',
    recordParentIdKey,
    recordChildrenKey,

    actions,
    tools,

    defaultDateParsePattern = 'yyyy-MM-dd HH:mm:SS',
    defaultDateFormatPattern = defaultDateParsePattern,

    rowDnd,

    disableGlobalFilter,
  } = props;

  if (queryRecords && rowDnd) {
    throw new Error('Must not useRowDnd in async mode(queryRecords)');
  }

  const rowExpandEnabled = !!(recordParentIdKey || recordChildrenKey);
  const globalFilterEnabled = !disableGlobalFilter;

  const _columns = useMemo(
    () => adaptColumns(
      columns,
      actions,
      {
        rowExpandEnabled,
        recordNameKey,
        defaultDateParsePattern,
        defaultDateFormatPattern,
      },
    ),
    [
      columns, actions,
      rowExpandEnabled, recordNameKey,
      defaultDateParsePattern, defaultDateFormatPattern
    ]
  );

  const getRowId = useCallback(
    record => (
      typeof recordIdKey === 'string'
        ? record[recordIdKey]
        : recordIdKey(record)
    ),
    [recordIdKey]
  );

  const getSubRows = useCallback(
    record => record[recordChildrenKey],
    [recordChildrenKey]
  );

  const data = useMemo(
    () => (
      rowExpandEnabled && !recordChildrenKey && records
        ? flatToTree(records, getRowId, recordParentIdKey)
        : records
    ) || [],
    [rowExpandEnabled, recordParentIdKey, records, getRowId, recordChildrenKey]
  );

  const columnFormats = useMemo(
    () => buildColumnFormats(_columns),
    [_columns]
  );

  console.debug('useTable with columns', _columns);

  const table = useTable(
    {
      columns: _columns,
      data,
      getRowId,
      getSubRows: recordChildrenKey && getSubRows,
      ...buildManualOptions(Boolean(queryRecords)),
      globalFilter: flattenGlobalFilter(columnFormats),
    },
    ...[
      useFilters,
      globalFilterEnabled && useGlobalFilter,
      rowExpandEnabled && useExpanded,
      usePagination,
      useRowSelect,
    ].filter(h => h)
  );

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,

    rows: totalRows,
    prepareRow,

    visibleColumns,

    preGlobalFilteredRows,
    setGlobalFilter,
    state: {globalFilter},

    page: pageRows,
    gotoPage,
    state: {pageIndex, pageSize},
    setPageSize,

    selectedFlatRows,
  } = table;

  const globalFilterProps = globalFilterEnabled && {
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
  };

  const paginationProps = {
    totalRowCount: totalRows.length,
    pageSize,
    pageIndex,
    gotoPage,
    setPageSize,
    loading: !records,
  };

  useAsyncModeIfSo(
    queryRecords,
    records || [],
    table,
    globalFilterProps,
    paginationProps
  );

  console.debug('Render Table, loading', paginationProps.loading);

  return (
    <Fragment>
      <Toolbar
        tools={tools}
        filters={buildFilters(visibleColumns, globalFilterProps)}
        selectedRecords={selectedFlatRows.map(r => r.original)}
        records={records}
        rowDnd={rowDnd}
      />
      <MrTable
        css={css`
.MuiTableCell-root {
  padding: 8px;
}
.MuiTableCell-head {
  font-weight: bold;
}
tbody tr:hover {
  background-color: #f5f8fa;
}
            `}
        {...getTableProps()}
      >
        <TableHead>
          {headerGroups.map(g => (
            <TableRow {...g.getHeaderGroupProps()}>
              {g.headers.map(h => {
                const isParent = !!h.headers;
                return (
                  <TableCell
                    css={isParent
                         ? css`
background-color: #f5f8fa;
&:not(:last-child) {
  border-right: 1px solid #e1e8ed;
}
                           `
                         : h.xCss
                        }
                    {...h.getHeaderProps()}
                    align={isParent ? 'center' : 'left'}
                  >
                    {h.render('Header')}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>

        <TableBody {...getTableBodyProps()}>
          {pageRows.map(r => {
            prepareRow(r);
            return (
              <Row
                {...r.getRowProps()}
                row={r}
                rowDnd={rowDnd}
                records={records}
                key={r.id}
              />
            );
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            {paginationProps.loading
             ? <TableCell colSpan={3}>加载中...</TableCell>
             : <Pagination {...paginationProps} />
            }
          </TableRow>
        </TableFooter>
      </MrTable>
    </Fragment>
  );
}

function buildFilters(visibleColumns, globalFilterProps) {
  return [
    ...visibleColumns.filter(c => !c.disableFilters)
      .map(h => h.render('Filter'))
      .map((f, i) => (
        <f.type key={i} {...f.props} />
      )),

    globalFilterProps && <GlobalFilter key='G' {...globalFilterProps} />
  ].filter(f => f);
}

function buildManualOptions(asyncMode) {
  return asyncMode
    ? {
      manualPagination: true,
      manualFilters: true,
      manualGlobalFilter: true,
    } : null;
}

function flatToTree(records, getRowId, parentIdKey) {
  if (!_.isArray(records)) {
    throw new Error('records must be array');
  }

  const nodes = JSON.parse(JSON.stringify(records));

  nodes.forEach(n => {
    const children = nodes.filter(n2 =>
      n2[parentIdKey] === getRowId(n)
    );
    n.subRows = children;
  });

  const roots = nodes.filter(n => !n[parentIdKey]);
  return roots;
}

function buildColumnFormats(_columns) {
  return collectLeafColumns(_columns)
    .reduce(
      (pre, cur) => ({...pre,  [cur.id]: cur.xFormat}),
      {}
    );
}

function collectLeafColumns(_columns) {
  return _columns
    .map(c =>
      c.columns
        ? collectLeafColumns(c.columns)
        : [c]
    )
    .reduce(
      (pre, cur) => [...pre, ...cur],
      []
    );
}
