import PropTypes from 'prop-types';

const {arrayOf, oneOfType, shape, oneOf, string, func, object, bool, number, exact} = PropTypes;

const TablePropTypes = {
  columns: arrayOf(exact({
    // 列id
    // 默认为: name[is String] || label, 有冲突时才需要指定
    id: string,

    // 列名
    label: string.isRequired,

    // 列取值的data数组元素字段名
    // 或指定深路径, 参考 https://lodash.com/docs/4.17.15#get
    // 或函数: row => value
    name: oneOfType([string, func]).isRequired,

    // 列数据类型
    // 注意: bool一般自定义name函数转为业务string配合select filter使用
    type: oneOf(['string', 'number', 'date']),

    // 通过name取值后需要进一步转换为目标type吗?
    // true为使用该类型的默认格式转换
    // 或指定格式串, 需符合 https://date-fns.org/v2.9.0/docs/parse
    // 或格式函数: value[string] => value[type]
    // 典型场景: date
    parse: oneOfType([bool, string, func]),

    // 显示值时需要进一步格式化吗?
    // true为使用该类型的默认格式
    // 或指定格式串, 需符合 https://date-fns.org/v2.9.0/docs/format
    // 或格式函数: value => string/<Component>
    // 典型场景: date, 加样式
    format: oneOfType([bool, string, func]),

    // 启用工具栏(右)过滤器吗?
    // true为使用该类型默认的过滤器
    // 或指定要使用的过滤器名
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

    // 当filter为select时指定选项, 一般在async模式下使用, 本地模式会自动生成
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
  })).isRequired,

  // 开启async模式, 即服务端过滤和分页
  // 获取数据函数: query => 调API
  // query结构:
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
  fetchData: func,

  // 表格数据
  // 注意: 不论async模式还是本地模式, 都通过data传数据
  // 在async模式下, data数组需新增属性fromQuery:
  // data.fromQuery = {...query, foundRowCount: 过滤后分页前的匹配行数}
  data: arrayOf(object).isRequired,

  // 操作列组件数组, (row, match) => <Component>
  // match: https://reacttraining.com/react-router/web/api/match
  actions: arrayOf(func),

  // 工具栏(左)组件数组, (match) => <Component>
  tools: arrayOf(func),

  // 默认日期解析格式串
  defaultDateParsePattern: string,
  // 默认日期显示格式串
  defaultDateFormatPattern: string,
};

export default TablePropTypes;
