import DateColumnFilter from './DateColumnFilter';
import SelectColumnFilter from './SelectColumnFilter';
import NumberColumnFilter from './NumberColumnFilter';
import TextColumnFilter from './TextColumnFilter';
import dateFilter from './dateFilter';
import numberFilter from './numberFilter';

export const select = {
  Filter: SelectColumnFilter,
  filter: 'exactTextCase'
};

export const date = {
  Filter: DateColumnFilter,
  filter: dateFilter
};

export const number = {
  Filter: NumberColumnFilter,
  filter: numberFilter
};

export const text = {
  Filter: TextColumnFilter,
  filter: 'text'
};
