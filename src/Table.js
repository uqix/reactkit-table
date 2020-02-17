/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Table as MrTable, TableHead, TableRow, TableCell, TableBody, TableFooter } from '@material-ui/core';
import { useTable, usePagination, useFilters, useGlobalFilter } from 'react-table';
import _ from 'lodash';
import ActionCell from './ActionCell';
import { Fragment, useEffect, useRef } from 'react';
import TableToolbar from './TableToolbar';
import React from 'react';
import GlobalFilter from './GlobalFilter';
import { parse as parseDate, format as formatDate } from 'date-fns'
import * as availableColumnFilters from './columnFilters';
import TablePropTypes from './TablePropTypes';
import TablePagination from './TablePagination';

Table.propTypes = TablePropTypes;

// TODO columns and data Must be memoized, doc in PropTypes
export default function Table(props) {
  const {
    fetchData, // TODO propTypes
    data,
    tools,
  } = props;

  const asyncMode = Boolean(fetchData);

  const defaultColumn = React.useMemo(
    () => ({
      disableFilters: true, // to #id and action columns
    }),
    []
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
  } = useTable(
    {
      columns: adaptColumns(props),
      data,
      defaultColumn,
      ...buildManualOptions(asyncMode),
    },
    useFilters,
    useGlobalFilter,
    usePagination,
  );

  const queryColumnFilters = JSON.stringify(buildQueryColumnFilters(headerGroups));

  const filteringState = useRef(queryColumnFilters + globalFilter);
  const nextFilteringState = queryColumnFilters + globalFilter;
  const filteringStateChanged = filteringState.current !== nextFilteringState;
  if (filteringStateChanged) {
    filteringState.current = nextFilteringState;
  }

  const paginationState = useRef({pageIndex, pageSize});
  const paginationStateChanged =
        pageIndex !== paginationState.current.pageIndex
        || pageSize !== paginationState.current.pageSize;
  if (paginationStateChanged) {
    paginationState.current = {pageIndex, pageSize};
  }

  const nextQueryId = useRef(1);
  if (filteringStateChanged || paginationStateChanged) {
    nextQueryId.current++;
  }

  useEffect(
    () => {
      if (asyncMode) {
        if (filteringStateChanged && pageIndex !== 0) {
          gotoPage(0);
        } else {
          fetchData({
            id: nextQueryId.current,
            pageIndex,
            pageSize,
            globalFilter: globalFilter || null,
            columnFilters: JSON.parse(queryColumnFilters),
          });
        }
      }
    },
    [asyncMode, fetchData, pageIndex, pageSize, globalFilter, queryColumnFilters, filteringStateChanged, gotoPage]
  );

  const globalFilterProps = {
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter
  };

  const paginationProps = {
    totalRowCount: totalRows.length,
    pageSize,
    pageIndex,
    gotoPage,
    setPageSize,
  };

  if (asyncMode) {
    globalFilterProps.preGlobalFilteredRows = null;

    const expectedQueryId = nextQueryId.current;
    const query = data.fromQuery;

    if (query && query.id === expectedQueryId) {
      paginationProps.totalRowCount = query.foundRowCount;
      paginationProps.pageIndex = query.pageIndex;
    } else {
      paginationProps.asyncLoading = true;
    }
  }

  return (
    <Fragment>
      <TableToolbar
        tools={tools}
        filters={buildFilters(headerGroups, globalFilterProps)}
      />
      <MrTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(g => (
            <TableRow {...g.getHeaderGroupProps()}>
              {g.headers.map(h => (
                <TableCell {...h.getHeaderProps()} css={css`font-weight: bold;`}>
                  {h.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody {...getTableBodyProps()}>
          {pageRows.map(r => {
            prepareRow(r);
            return (
              <TableRow {...r.getRowProps()}>
                {r.cells.map(c => (
                  <TableCell {...c.getCellProps()}>
                    {c.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            {paginationProps.asyncLoading
             ? <TableCell colSpan={2}>加载中...</TableCell>
             : <TablePagination {...paginationProps} />
            }
          </TableRow>
        </TableFooter>
      </MrTable>
    </Fragment>
  );
}

function adaptColumns(props) {
  const {columns, actions = []} = props;
  return [
    {
      Header: '#',
      accessor: 'id',
      Cell: ({cell: {value}}) => (
        <span css={css`color: gray;`}>#{value}</span>
      ),
    },

    ...columns.map(c => buildColumn(c, props)),

    ...(actions.length > 0 ? [
      {
        Header: '操作',
        accessor: row => row,
        id: 'ActionCell',
        Cell: ActionCell(actions),
      }
    ] : []),
  ];
}

function buildColumn(
  {id, label, name, type = 'string', parse, format, filter, options},
  {
    defaultDateParsePattern = 'yyyy-MM-dd HH:mm:SS',
    defaultDateFormatPattern = defaultDateParsePattern,
  }
) {
  let resultName = name;
  let resultFormat = format;

  if (type === 'date') {
    const parsePattern = _.isString(parse) ? parse : defaultDateParsePattern;
    const formatPattern = _.isString(format) ? format : defaultDateFormatPattern;

    if (parse) {
      resultName = row => {
        const str = _.isString(name) ? _.get(row, name) : name(row);
        return parseDate(str, parsePattern, new Date());
      };
    }
    if (!format || _.isString(format)) {
      resultFormat = value => (
        (value || null) && formatDate(value, formatPattern)
      )
    }

    if (filter ===  true) {
      filter = 'date'; // default filter for type
    }
  } else if (type === 'number') {
    if (filter ===  true) {
      filter = 'number';
    }
  } else if (type === 'string') {
    if (filter ===  true) {
      filter = 'text';
    }
  } else {
    throw new Error(`Unknown column type: ${type}`);
    // why no bool? just 'name' it to biz-meaningful string with 'filter' select
  }

  return _.omitBy(
    {
      // TODO sub columns recursively
      Header: label,
      id: id || (_.isString(name) ? name : label),
      accessor: resultName,
      Cell: resultFormat && (({cell: {value}}) => resultFormat(value)),
      disableFilters: !filter,
      ...availableColumnFilters[filter],
      xFilterType: filter,
      xOptions: options,
    },
    _.isUndefined
  );
}

function buildFilters(headerGroups, globalFilterProps) {
  return [
    ...getColumnFilters(headerGroups)
      .map(h => h.render('Filter'))
      .map((f, i) => (
        <f.type key={i} {...f.props} />
      )),

    <GlobalFilter key='filterG' {...globalFilterProps} />
  ]
}

function buildManualOptions(asyncMode) {
  return asyncMode
    ? {
      manualPagination: true,
      manualFilters: true,
      manualGlobalFilter: true,
    } : null;
}

function buildQueryColumnFilters(headerGroups) {
  return _.sortBy(
    getColumnFilters(headerGroups)
      .map(({id, filterValue, xFilterType}) => (
        {
          id,
          type: xFilterType,
          value: filterValue === undefined ? null : filterValue,
        }
      )),
    'id'
  );
}

function getColumnFilters(headerGroups) {
  return _.flatMap(headerGroups, g =>
    g.headers.filter(h => h.canFilter)
  );
}
