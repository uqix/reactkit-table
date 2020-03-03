import * as availableColumnFilters from '../filter/columnFilters';
import { parse as parseDate, format as formatDate } from 'date-fns';
import _ from 'lodash';

export default function buildColumn(
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
      parse = value => parseDate(value, defaultDateParsePattern, new Date());
    } else if (typeof parse === 'string') {
      const pattern = parse;
      parse = value => parseDate(value, pattern, new Date());
    }

    if (typeof format === 'string') {
      const pattern = format;
      format = value => formatDate(value, pattern);
    } else if (!format) {
      format = value => formatDate(value, defaultDateFormatPattern);
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

  const accessor = (
    typeof name === 'string'
      ? record => parse(record[name])
      : record => parse(name(record))
  );

  const Cell = ({cell: {value}}) => (
    render({value: format(value)})
  );

  return _.omitBy(
    {
      // TODO sub columns recursively
      Header: label,
      id: id || (_.isString(name) ? name : label),
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
