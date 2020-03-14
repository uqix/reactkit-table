import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';

export default function useAsyncModeIfSo(
  queryRecords,
  records,
  {
    visibleColumns,
    state: {globalFilter},
    state: {pageIndex, pageSize},
    gotoPage,
  },
  globalFilterProps,
  paginationProps
) {
  const asyncMode = Boolean(queryRecords);
  const queryColumnFilters = JSON.stringify(buildQueryColumnFilters(visibleColumns));
  const [expectedQueryId, setExpectedQueryId] = useState(0);

  if (asyncMode) {
    if (globalFilterProps) {
      globalFilterProps.preGlobalFilteredRows = null;
    }

    const query = records.fromQuery || {};
    console.debug('Query id: current', query.id, ', expected', expectedQueryId);
    if (query.id === expectedQueryId) {
      paginationProps.totalRowCount = query.foundRowCount;
      paginationProps.pageIndex = query.pageIndex;
    } else {
      paginationProps.loading = true;
    }
  }

  const expectedQueryIdRef = useRef();
  expectedQueryIdRef.current = expectedQueryId;

  const doQuery = () => {
    const id = expectedQueryIdRef.current + 1;
    setExpectedQueryId(id);
    const query = {
      id,
      pageIndex,
      pageSize,
      globalFilter: globalFilter || null,
      columnFilters: JSON.parse(queryColumnFilters),
    };
    console.debug('Query records with query id', id);
    queryRecords(query);
  };

  const doQueryRef = useRef();
  doQueryRef.current = doQuery;
  const pageIndexRef = useRef();
  pageIndexRef.current = pageIndex;

  // render from inside
  const isInitialRender = useRef(true);
  useEffect(
    () => {
      if (asyncMode) {
        if (isInitialRender.current) {
          return;
        }
        if (pageIndexRef.current === 0) {
          console.debug('Filters changed, query');
          doQueryRef.current();
        } else {
          console.debug('Filters changed, but go to page 1 first');
          gotoPage(0);
        }
      }
    },
    [asyncMode, gotoPage, queryColumnFilters, globalFilter]
  );
  useEffect(
    () => {
      if (asyncMode) {
        if (isInitialRender.current) {
          return;
        }
        console.debug('Pagination changed, query');
        doQueryRef.current();
      }
    },
    [asyncMode, pageIndex, pageSize]
  );

  // render from outside
  useEffect(
    () => {
      if (asyncMode) {
        if (isInitialRender.current) {
          isInitialRender.current = false;
          console.debug('Initial render, query');
          doQueryRef.current();
        } else if (!records.fromQuery) {
          console.debug('Records gone, query');
          doQueryRef.current();
        }
      }
    },
    [asyncMode, records]
  );
}

function buildQueryColumnFilters(visibleColumns) {
  return _.sortBy(
    visibleColumns.filter(c => !c.disableFilters)
      .map(({id, filterValue, xFilter}) => (
        {
          id,
          type: xFilter,
          value: filterValue === undefined ? null : filterValue,
        }
      )),
    'id'
  );
}
