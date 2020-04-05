export const zhCN = {
  props: {
    'reactkit-table.SelectColumnFilter': {
      optionAllText: '所有',
    },

    'reactkit-table.GlobalFilter': {
      searchText: '搜索',
    },

    'reactkit-table.Pagination': {
      currentPageText: ({page, pageCount, rowFrom, rowTo, rowCount}) => (
        `第${page}页 (${pageCount}页, ${rowCount}行)`
      ),
      noDataText: '无数据',
    },
  }
};
