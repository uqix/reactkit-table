import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { format, isAfter, isValid } from 'date-fns';
import zhCnLocale from "date-fns/locale/zh-CN";
import _ from 'lodash';
import React, { Fragment, useState } from 'react';
import { dayOf } from './dateFilter';

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
               setFilter(rangeOf(value, toDate))
             }
             error={rangeInvalid}
           />
           <DatePicker
             label={`${Header}(到)`}
             value={toDate || null}
             onChange={value =>
               setFilter(rangeOf(fromDate, value))
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
             setFilter(value || undefined)
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
  const [error, setError] = useState();
  return (
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="yyyy-MM-dd"
      autoOk
      {...props}
      onChange={value => {
        const valueInvalid = value && !isValid(value);
        setError(valueInvalid);
        if (!valueInvalid) {
          if (value) {
            value.toJSON = function() {
              return format(this, "yyyy-MM-dd");
            };
          }
          props.onChange(value);
        }
      }}
      error={error || props.error}
    />
  );
}
