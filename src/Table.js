/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Table as MrTable, TableHead, TableRow as MrTableRow, TableCell, TableBody, TableFooter } from '@material-ui/core';
import { useTable, usePagination, useFilters, useGlobalFilter, useRowSelect, useExpanded } from 'react-table';
import _ from 'lodash';
import { Fragment, useMemo, useCallback } from 'react';
import TableToolbar from './TableToolbar';
import GlobalFilter from './filter/GlobalFilter';
import TablePropTypes from './TablePropTypes';
import TablePagination from './TablePagination';
import TableRow from './TableRow';
import flattenGlobalFilter from './filter/flattenGlobalFilter';
import adaptColumns from './column/adaptColumns';
import useAsyncModeIfSo from './useAsyncModeIfSo';
import {getColumnFilters} from './util';

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
    () => _columns
      .filter(c => c.xFormat)
      .reduce(
        (pre, cur) => ({...pre,  [cur.id]: cur.xFormat}),
        {}
      ),
    [_columns]
  );

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
      <TableToolbar
        tools={tools}
        filters={buildFilters(headerGroups, globalFilterProps)}
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
            `}
        {...getTableProps()}
      >
        <TableHead>
          {headerGroups.map(g => (
            <MrTableRow {...g.getHeaderGroupProps()}>
              {g.headers.map(h => (
                <TableCell
                  css={h.xCss}
                  {...h.getHeaderProps()}
                >
                  {h.render('Header')}
                </TableCell>
              ))}
            </MrTableRow>
          ))}
        </TableHead>

        <TableBody {...getTableBodyProps()}>
          {pageRows.map(r => {
            prepareRow(r);
            return (
              <TableRow
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
          <MrTableRow>
            {paginationProps.loading
             ? <TableCell colSpan={3}>加载中...</TableCell>
             : <TablePagination {...paginationProps} />
            }
          </MrTableRow>
        </TableFooter>
      </MrTable>
    </Fragment>
  );
}

function buildFilters(headerGroups, globalFilterProps) {
  return [
    ...getColumnFilters(headerGroups)
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
