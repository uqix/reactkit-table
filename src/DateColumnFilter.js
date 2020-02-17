/** @jsx jsx */
import { jsx } from '@emotion/core';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import {Fragment} from 'react';
import _ from 'lodash';
import { isAfter, format } from 'date-fns';
import { dayOf } from './dateFilter';
import zhCnLocale from "date-fns/locale/zh-CN";

export default function DateColumnFilter({column, advancedModeEnabled}) {
  const {filterValue, setFilter, Header} = column;
  const [fromDate, toDate] = _.castArray(filterValue);
  const rangeInvalid =
        fromDate
        && toDate
        && isAfter(dayOf(fromDate), dayOf(toDate));

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhCnLocale}>
      {advancedModeEnabled
       ?
       (
         <Fragment>
           <DatePicker
             label={`${Header}(从)`}
             value={fromDate || null}
             onChange={value =>
               setFilter(rangeOf(patchValue(value), toDate))
             }
             error={rangeInvalid}
           />
           <DatePicker
             label={`${Header}(到)`}
             value={toDate || null}
             onChange={value =>
               setFilter(rangeOf(fromDate, patchValue(value)))
             }
             error={rangeInvalid}
           />
         </Fragment>
       )
       :
       (
         <DatePicker
           label={Header}
           value={fromDate || null}
           onChange={value =>
             setFilter(patchValue(value) || undefined)
           }
         />
       )
      }
    </MuiPickersUtilsProvider>
  );
}

function rangeOf(from, to) {
  from = from || undefined;
  to = to || undefined;
  return from === undefined && to === undefined
    ?  undefined
    : [from, to];
}

function DatePicker(props) {
  return (
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="yyyy-MM-dd"
      autoOk
      {...props}
    />
  );
}

function patchValue(value) {
  if (value) {
    value.toJSON = function() {
      return format(this, "yyyy-MM-dd");
    };
  }
  return value;
}
