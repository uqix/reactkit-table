# reactkit-table

> A model based Table component using react-table and material-ui

[![NPM](https://img.shields.io/npm/v/reactkit-table.svg)](https://www.npmjs.com/package/reactkit-table)

## Install

```bash
npm install reactkit-table
```

## Usage

[Open example in codesandbox](https://codesandbox.io/s/github/uqix/reactkit-table/tree/master/example)

```jsx
import React from 'react';
import Table from 'reactkit-table';

export default function SomeList() {
  const records = useMemo(() => [...], []);
  const columns = useMemo(() => [...], []);
  const actions = useMemo(() => [...], []);
  const tools = useMemo(() => [...], []);

  return (
    <Table
      columns={columns}
      records={records}
      actions={actions}
      tools={tools}
    />
  );
}
```

## Props

### columns
* Columns model
* Type: array of `Column`
* Required
* Memoized

### queryRecords
* Callback to fetch records in ___async mode___(i.e. server side filtering and pagination), `Table` works in ___local mode___ if not specified
* Type: function, `query` => _
* `query`:
```javascript
{
  "id": number, // query id, auto increment to ignore outdated response
  "pageIndex": number, // 0 based
  "pageSize": number, // max rows per page
  "globalFilter": string, // global filter value, null in clear state
  "columnFilters": [
    {
      "id": string, // column id(i.e. Column.id)
      "type": string, // column filter type(i.e. Column.filter)
      "value": any // column filter value, null in clear state
    },
  ]
}
```

### records
* Data to display, needs another property `fromQuery` in ___async mode___:
```javascript
records.fromQuery = {
  ...query,
  "foundRowCount": number // matched rows after filtering and before pagination
}
```

* Type: array of object
* Memoized

### recordIdKey
* Id property key of record
* Type: string | function, record => id
* Memoized if function specified
* Default: `'id'`

### recordNameKey
* Name property key of record, used in cases: appended to toggle icon when ___row expand___ enabled
* Type: string | function, record => name
* Memoized if function specified
* Default: `'name'`

### recordParentIdKey
* Parent id property key of record, used for flat tree data, ___row expand___ will be enabled if specified
* Type: string

### recordChildrenKey
* Children property key of record, used for nested tree data, ___row expand___ will be enabled if specified
* Type: string

### actions
* A column will be added as the last one containing specified actions(like Details, Edit, Delete)
* Type: array of `Action` components, props: {record, [match](https://reacttraining.com/react-router/web/api/match)}
* Memoized

### tools
* Tools placed at the left of toolbar(like Add, Export)
* Type: array of `Tool` components, props: {selectedRecords, records, [match](https://reacttraining.com/react-router/web/api/match)}
* Memoized

### defaultDateParsePattern
* Type: string
* Default: `'yyyy-MM-dd HH:mm:SS'`

### defaultDateFormatPattern
* Type: string
* Default: `'yyyy-MM-dd HH:mm:SS'`

### rowDnd
TODO

### disableGlobalFilter
* Type: boolean

### dataLoadingText
* Type: string
* Default: `'Data loading...'`

### searchText
* The label of global filter search box
* Type: string
* Default: `'Search'`

## Models

### Column

#### Leaf Column

##### id
* Specify it if default results in conflict
* Type: string
* Default: `Column.name` with string type || `Column.label`

##### label
* Column header
* Type: string | component, props: {_rtHeaderProps}
* Required

##### name
* Cell value property key of record
* Type: string | function, record => value

##### type
* Cell value type
* Type: one of `'string'`, `'number'`, `'date'`
* Default: `'string'`

##### parse
* How to parse value to target type after name step, used in cases: date
* Type: `true`, using default parse pattern | string, pattern([date](https://date-fns.org/v2.9.0/docs/parse)) | function, value => value2
* Default: `value => value`

##### format
* How to format value before render it, used in cases: date, bool, filtering
* Type: string, pattern | function, value => string
* Default: using default format pattern

##### render
* How to render value for display, used in cases: style
* Type: component, props: {value, record, _rtCellProps}
* Default: `{value} => value`
* Cell render pipeline:
```javascript
  /*
    record
    - <name> ->
    value in record
    - [parse] ->

    value in row
    - [format] ->
    value to render

    - [render] ->
    display in UI
  */
```

##### filter
* How to filter this column
* Type: `true`, using default filter type | `'text'` | `'number'` | `'date'` | `'select'`
* Default: no filter

##### options
* Options for select filter type, used in cases: ___async mode___, generated options from records do not fit in ___local mode___
* Type: array of `{id: number/string, name: string}`, id for submit, name for display

#### Parent Column

##### id
* Specify it if default results in conflict
* Type: string
* Default: `Column.name` with string type || `Column.label`

##### label
* Column header
* Type: string | component, props: {_rtHeaderProps}
* Required

##### children
* Sub columns
* Type: array of `Parent Column` | array of `Leaf Column`
* Required

## Dependencies

| Feature           | Dependency              |
|-------------------|-------------------------|
| Core              | react                   |
|                   | react-dom               |
|                   | prop-types              |
|                   | react-table             |
|                   | @material-ui/core       |
|                   | @material-ui/icons      |
| Row DnD           | react-dnd               |
|                   | react-dnd-html5-backend |
| Date column       | @date-io/date-fns       |
|                   | date-fns                |
|                   | @material-ui/pickers    |
| Route Action/Tool | react-router-dom        |


## License

MIT © [uqix](https://github.com/uqix)
