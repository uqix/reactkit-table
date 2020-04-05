export const zhCN = {
  props: {
    'reactkit-table.Table': {
      dataLoadingText: '数据加载中...',
    },

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

    'reactkit-table.FilterBar': {
      openAdvancedModeText: '打开高级模式',
      closeAdvancedModeText: '关闭高级模式',
    },
  }
};
