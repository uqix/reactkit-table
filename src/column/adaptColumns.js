import rowSelectColumn from './rowSelectColumn';
import rowNumColumn from './rowNumColumn';
import rowExpandColumn from './rowExpandColumn';
import actionColumn from './actionColumn';
import * as availableColumnFilters from '../filter/columnFilters';
import { parse as parseDate, format as formatDate } from 'date-fns';
import _ from 'lodash';

export default function adaptColumns(columns, actions = [], rest) {
  const {rowExpandEnabled, recordNameKey} = rest;
  return [
    rowSelectColumn,
    rowNumColumn,
    rowExpandEnabled && rowExpandColumn(recordNameKey),
    ...columns,
    actions.length > 0 && actionColumn(actions),
  ]
    .filter(c => c)
    .map(c => adaptColumn(c, rest));
}

function adaptColumn(column, rest) {
  const {id, label, children} = column;
  if (children) {
    return {
      id: idOrDefault(id, undefined, label),
      Header: labelToHeader(label),
      columns: children.map(c => adaptColumn(c, rest)),
    };
  }
  return adaptLeafColumn(column, rest);
}

function idOrDefault(id, name, label) {
  return id || (
    _.isString(name)
      ? name
      : (typeof label === 'string' ? label : undefined)
  );
}

function labelToHeader(label) {
  return typeof label === 'string'
    ? label
    : _rtHeaderProps => label({_rtHeaderProps});
}

function adaptLeafColumn(
  {
    id, label, name,
    type = 'string', parse,
    format, render,
    filter, options,
    css,
  },
  {
    defaultDateParsePattern,
    defaultDateFormatPattern,
  }
) {
  if (type === 'date') {
    if (parse === true) {
      parse = value => value && parseDate(value, defaultDateParsePattern, new Date());
    } else if (typeof parse === 'string') {
      const pattern = parse;
      parse = value => value && parseDate(value, pattern, new Date());
    }

    if (typeof format === 'string') {
      const pattern = format;
      format = value => value && formatDate(value, pattern);
    } else if (!format) {
      format = value => value && formatDate(value, defaultDateFormatPattern);
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

  parse = parse || (value => value);
  format = format || (value => value);
  render = render || (({value}) => value);

  const accessor = name && (
    typeof name === 'string'
      ? record => parse(record[name])
      : record => parse(name(record))
  );

  const Cell = _rtCellProps => {
    const {
      cell: {value},
      row: {original: record},
    } = _rtCellProps;

    return render({
      value: format(value),
      record,
      _rtCellProps,
    })
  };

  return _.omitBy(
    {
      id: idOrDefault(id, name, label),
      Header: labelToHeader(label),
      accessor,
      Cell,
      disableFilters: !filter,
      ...availableColumnFilters[filter],
      xFilter: filter,
      xOptions: options,
      xCss: css,
      xFormat: format,
    },
    _.isUndefined
  );
}
