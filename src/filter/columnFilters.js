import DateColumnFilter from './DateColumnFilter';
import SelectColumnFilter from './SelectColumnFilter';
import NumberColumnFilter from './NumberColumnFilter';
import TextColumnFilter from './TextColumnFilter';
import dateFilter from './dateFilter';
import numberFilter from './numberFilter';
import textFilter from './textFilter';
import flatten from './flatten';
import exactTextCaseFilter from './exactTextCaseFilter';

export const select = {
  Filter: SelectColumnFilter,
  filter: flatten(exactTextCaseFilter)
};

export const date = {
  Filter: DateColumnFilter,
  filter: flatten(dateFilter)
};

export const number = {
  Filter: NumberColumnFilter,
  filter: flatten(numberFilter)
};

export const text = {
  Filter: TextColumnFilter,
  filter: flatten(textFilter)
};
