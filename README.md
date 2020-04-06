# reactkit-table

> An easy-to-use Table component using react-table and material-ui

[![NPM](https://img.shields.io/npm/v/reactkit-table.svg)](https://www.npmjs.com/package/reactkit-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save reactkit-table
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

## API
TODO

## Dependencies

| Feature           | Dependency              |
|-------------------|-------------------------|
| Core              | react                   |
|                   | react-dom               |
|                   | prop-types              |
|                   | react-table             |
|                   | @material-ui/core       |
|                   | @material-ui/icons      |
|                   | @emotion/core           |
|                   | emotion-theming         |
| Row DnD           | react-dnd               |
|                   | react-dnd-html5-backend |
| Date column       | @date-io/date-fns       |
|                   | date-fns                |
|                   | @material-ui/pickers    |
| Route Action/Tool | react-router-dom        |


## License

MIT © [uqix](https://github.com/uqix)
