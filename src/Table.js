import { Table as MrTable, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React, { Fragment, useCallback, useMemo } from 'react';
import { useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useTable } from 'react-table';
import adaptColumns from './column/adaptColumns';
import flattenGlobalFilter from './filter/flattenGlobalFilter';
import GlobalFilter from './filter/GlobalFilter';
import Pagination from './Pagination';
import Row from './Row';
import TablePropTypes from './TablePropTypes';
import Toolbar from './Toolbar';
import useAsyncModeIfSo from './useAsyncModeIfSo';
import HeadCell from './HeadCell';

Table.propTypes = TablePropTypes;

const useStyles = makeStyles({
  root: {
    '& .MuiTableCell-root': {
      padding: 8,
    },
    '& .MuiTableCell-head': {
      fontWeight: 'bold'
    },
    '& tbody tr:hover': {
      backgroundColor: '#f5f8fa'
    },
  }
});

function Table(props) {
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

    dataLoadingText = 'Data loading...',
    searchText,
  } = props;

  const classes = useStyles();

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
    searchText,
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
        className={classes.root}
        {...getTableProps()}
      >
        <TableHead>
          {headerGroups.map(g => (
            <TableRow {...g.getHeaderGroupProps()}>
              {g.headers.map(h =>
                <HeadCell {...h.getHeaderProps()} header={h} />
              )}
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
             ? <TableCell colSpan={3}>{dataLoadingText}</TableCell>
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

export default withStyles(
  {},
  {name: 'reactkit-table.Table'}
)(Table);
