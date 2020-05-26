import { TextField } from '@material-ui/core';
import _ from 'lodash';
import React, { Fragment } from 'react';

export default function NumberColumnFilter({column, advancedModeEnabled}) {
  const {filterValue, setFilter, Header} = column;
  const [fromNum, toNum] = _.castArray(filterValue);
  const rangeInvalid =
        (fromNum !== undefined)
        && (toNum !== undefined)
        && (fromNum > toNum);

  return advancedModeEnabled
    ?
    (
      <Fragment>
        <TextField
          label={`${Header}(从)`}
          type='number'
          value={fromNum === undefined ? '' : fromNum}
          onChange={({target: {value}}) =>
            setFilter(rangeOf(value, toNum))
          }
          error={rangeInvalid}
        />
        <TextField
          label={`${Header}(到)`}
          type='number'
          value={toNum === undefined ? '' : toNum}
          onChange={({target: {value}}) =>
            setFilter(rangeOf(fromNum, value))
          }
          error={rangeInvalid}
        />
      </Fragment>
    )
    :
    (
      <TextField
        label={Header}
        type='number'
        value={fromNum === undefined ? '' : fromNum}
        onChange={({target: {value}}) =>
          setFilter(value ? Number(value) : undefined)
        }
      />
    );
}

function rangeOf(from, to) {
  from = from ? Number(from) : undefined;
  to = to ? Number(to) : undefined;
  return from === undefined && to === undefined
    ?  undefined
    : [from, to];
}
