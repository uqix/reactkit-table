import PropTypes from 'prop-types';

const {arrayOf, oneOfType, shape, oneOf, string, func, object, bool, number, exact} = PropTypes;

const id = string;
const label = oneOfType([string, func]).isRequired;

const leafColumn = exact({
  // 列id, 默认值造成冲突时才需要指定
  // 默认值: string name || label
  id,

  // 列名
  // 或组件: {_rtHeaderProps} => node
  label,

  // 列value的record字段名
  // 或函数: record => value
  name: oneOfType([string, func]),

  // 列数据类型
  // 注意: bool一般自定义name函数转为业务string配合select filter使用
  // 默认值: 'string'
  // TODO bool
  type: oneOf(['string', 'number', 'date']),

  // 通过name取值后需要进一步解析为目标type吗?
  // true为使用该类型的默认格式解析
  // 或格式串, date需符合 https://date-fns.org/v2.9.0/docs/parse
  // 或解析函数: value => new value
  // 默认值: value => value
  // 典型场景: date
  parse: oneOfType([bool, string, func]),

  // 显示值时需要进一步格式化吗?
  // 格式串
  // 或格式函数: value => string
  // 默认值:
  // date: value => yyyy-MM-dd HH:mm:SS
  // bool: TODO
  // number: TODO
  // 其他: value => value
  // 典型场景: date bool
  format: oneOfType([string, func]),

  // 显示值时需要进一步组件化吗?
  // {value, record, _rtCellProps} => node
  // 默认值: {value} => value
  // 典型场景: 加样式
  render: func,

  /*
    Cell render pipeline:
    [
    record
    - <name> ->
    value in record
    - [parse] ->

    value in row
    - [format] ->
    value to render
    ]

    - [render] ->
    display in UI
  */

  // 启用工具栏(右)过滤器吗?
  // true为使用该类型默认的过滤器
  // 或要使用的过滤器名
  filter: oneOf([
    true,

    // 匹配规则: String(value) 包含[忽略大小写] 目标文本, 为string类型的默认过滤器
    // 适用类型: string, 适用但不推荐: number
    'text',

    // 匹配规则: value === 目标数值, 为number类型的默认过滤器
    // 适用类型: number
    'number',

    // 匹配规则: value 在同一天 目标日期, 为date类型的默认过滤器
    // 适用类型: date
    'date',

    // 匹配规则: String(value) === 目标选项
    // 适用类型: string, 适用但不推荐: number
    'select',
  ]),

  // 当filter为select时指定选项, 一般在async模式下使用, local模式将自动生成
  options: oneOfType([
    arrayOf(shape({
      // 作为option的提交value
      id: number.isRequired,
      // 作为option的显示内容
      name: string.isRequired
    })),
    arrayOf(shape({
      id: string.isRequired,
      name: string.isRequired
    })),
  ]),
});

const _parentColumn = {
  id,
  label,
};

const parentColumn = exact(_parentColumn);

_parentColumn.
  children = oneOfType([
    arrayOf(parentColumn),
    arrayOf(leafColumn),
  ]).isRequired;

const TablePropTypes = {
  // 列定义数组, 需要memoized
  columns: arrayOf(oneOfType([
    parentColumn,
    leafColumn
  ])).isRequired,

  // 查询数据函数, 将开启async模式(即服务端过滤和分页)
  // query => 调API
  // query:
/*
{
  "id": number, // 组件分配的查询id, 自增, 用于忽略掉不符合当前查询参数的响应数据
  "pageIndex": number, // 页码, 从0开始
  "pageSize": number, // 每页行数
  "globalFilter": string|null, // 全局过滤器值
  "columnFilters": [ // 列过滤器数组
    {
      "id": string, // 列id, 即 columns[].id
      "type": string, // 过滤器名, 即 columns[].filter
      "value": any|null // 过滤器值
    },
  ]
}
*/
  queryRecords: func,

  // 表格数据, 需要memoized
  // 注意: async和local模式都是通过该prop传数据
  // 在async模式下, 数组需要加属性fromQuery:
  // records.fromQuery = {...query, foundRowCount: 过滤后分页前的匹配行数}
  records: arrayOf(object),

  // record id字段名
  // 或函数: record => id, 需要memoized
  // 默认值: 'id'
  recordIdKey: oneOfType([string, func]),

  // record name字段名
  // 或函数: record => name, 需要memoized
  // 默认值: 'name'
  // 注意: 当启用rowExpand时name将拼接在toggle icon之后, 可以充当name列
  recordNameKey: oneOfType([string, func]),

  // record parent id字段名, 用于flat形式的树状数据
  // 注意: 指定后将启用rowExpand
  recordParentIdKey: string,

  // record children字段名, 用于nested形式的树状数据
  // 注意: 指定后将启用rowExpand
  recordChildrenKey: string,

  // 操作列组件数组, 需要memoized
  // <Action>.props: {record, match}
  // match: https://reacttraining.com/react-router/web/api/match
  actions: arrayOf(func),

  // 工具栏(左)组件数组
  // <Tool>.props: {match, selectedRecords, records}
  tools: arrayOf(func),

  // 默认日期解析格式串
  defaultDateParsePattern: string,
  // 默认日期显示格式串
  defaultDateFormatPattern: string,

  // TODO rowDnd

  // 禁用globalFilter吗?
  disableGlobalFilter: bool,
};

export default TablePropTypes;
