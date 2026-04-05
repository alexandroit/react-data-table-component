# @revivejs/react-data-table-component

> A maintained **React 19 data table component** with sorting, selection, expandable rows, pagination, theming, and versioned live demos for each maintained React release line.

[![npm version](https://img.shields.io/npm/v/@revivejs/react-data-table-component.svg?style=flat-square)](https://www.npmjs.com/package/@revivejs/react-data-table-component)
[![npm downloads](https://img.shields.io/npm/dt/@revivejs/react-data-table-component.svg?style=flat-square)](https://www.npmjs.com/package/@revivejs/react-data-table-component)
[![license](https://img.shields.io/npm/l/@revivejs/react-data-table-component.svg?style=flat-square)](https://github.com/alexandroit/react-data-table-component/blob/master/LICENSE)
[![React 19](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Styled Components](https://img.shields.io/badge/styled--components-6-db7093?style=flat-square)](https://styled-components.com)

**[Documentation & Live Demos](https://alexandroit.github.io/react-data-table-component/)** | **[npm](https://www.npmjs.com/package/@revivejs/react-data-table-component)** | **[Issues](https://github.com/alexandroit/react-data-table-component/issues)** | **[Repository](https://github.com/alexandroit/react-data-table-component)**

**Latest version:** `9.1.1`

## Why this library?

`@revivejs/react-data-table-component` keeps the familiar API of the original data table library while standardizing package metadata, release stewardship, and versioned documentation under the maintained ReviveJS repository.

The component stays intentionally declarative:

- define your `columns`
- pass a `data` array
- turn features on with props such as `pagination`, `selectableRows`, and `expandableRows`
- customize behavior with callbacks, themes, and custom cells when you need deeper control

## React Version Compatibility

| Package version | React version | Styled Components | Demo link |
| :---: | :---: | :---: | :--- |
| **9.1.1** | **19.2.x** | **6.1.x** | [React 19 demo](https://alexandroit.github.io/react-data-table-component/react-19/) |
| **8.0.0** | **18.3.x** | **6.1.x** | [React 18 demo](https://alexandroit.github.io/react-data-table-component/react-18/) |

## Installation

```bash
npm install @revivejs/react-data-table-component styled-components
```

## Basic Usage

```tsx
import DataTable, { type TableColumn } from '@revivejs/react-data-table-component';

type Movie = {
  id: number;
  title: string;
  year: number;
};

const columns: TableColumn<Movie>[] = [
  {
    name: 'Title',
    selector: row => row.title,
    sortable: true
  },
  {
    name: 'Year',
    selector: row => row.year,
    sortable: true,
    right: true
  }
];

const data: Movie[] = [
  { id: 1, title: 'Beetlejuice', year: 1988 },
  { id: 2, title: 'Ghostbusters', year: 1984 }
];

export function MovieTable() {
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      highlightOnHover
    />
  );
}
```

## Common Features

### Selectable rows

```tsx
<DataTable
  columns={columns}
  data={data}
  selectableRows
  selectableRowsHighlight
  onSelectedRowsChange={state => {
    console.log(state.selectedRows);
  }}
/>
```

### Expandable rows

```tsx
const ExpandedRow = ({ data }: { data: Movie }) => (
  <div style={{ padding: 16 }}>
    <strong>{data.title}</strong>
    <div>Released: {data.year}</div>
  </div>
);

<DataTable
  columns={columns}
  data={data}
  expandableRows
  expandableRowsComponent={ExpandedRow}
/>
```

### Remote pagination

```tsx
const [page, setPage] = useState(1);
const [perPage, setPerPage] = useState(10);

<DataTable
  columns={columns}
  data={visibleRows}
  pagination
  paginationServer
  paginationTotalRows={allRows.length}
  onChangePage={nextPage => setPage(nextPage)}
  onChangeRowsPerPage={(nextRowsPerPage, nextPage) => {
    setPerPage(nextRowsPerPage);
    setPage(nextPage);
  }}
/>
```

### Custom themes

```tsx
import DataTable, { createTheme } from '@revivejs/react-data-table-component';

createTheme(
  'revive-slate',
  {
    text: {
      primary: '#f7fbff',
      secondary: '#9fb9d6'
    },
    background: {
      default: '#102033'
    },
    context: {
      background: '#1f5ba7',
      text: '#ffffff'
    },
    divider: {
      default: '#294563'
    }
  },
  'dark'
);
```

## Core API

| Prop | Type | Notes |
| :--- | :--- | :--- |
| `columns` | `TableColumn<T>[]` | Required. Defines headers, selectors, cells, and sorting. |
| `data` | `T[]` | Required. Array of rows to render. |
| `keyField` | `string` | Defaults to `id`. Used for row identity and selection. |
| `pagination` | `boolean` | Enables built-in client pagination. |
| `paginationServer` | `boolean` | Lets you drive page state externally for remote data. |
| `selectableRows` | `boolean` | Enables row checkboxes. |
| `selectableRowsSingle` | `boolean` | Restricts selection to one row. |
| `expandableRows` | `boolean` | Enables expandable row content. |
| `expandableRowsComponent` | `ComponentType` | Custom renderer for expanded row content. |
| `conditionalRowStyles` | `ConditionalStyles<T>[]` | Applies style rules based on row values. |
| `theme` | `Themes` | Built-in theme name such as `default` or `dark`. |
| `customStyles` | `TableStyles` | CSS-in-JS overrides for table internals. |
| `subHeader` | `boolean` | Enables a header area above the table body. |
| `subHeaderComponent` | `ReactNode` | Custom controls such as filters or action buttons. |
| `onSort` | `(column, direction, rows) => void` | Fires when sorting changes. |
| `onSelectedRowsChange` | `(state) => void` | Fires when row selection changes. |
| `onRowExpandToggled` | `(expanded, row) => void` | Fires when an expandable row opens or closes. |
| `onChangePage` | `(page, totalRows) => void` | Fires on pagination page changes. |
| `onChangeRowsPerPage` | `(rowsPerPage, page) => void` | Fires when page size changes. |

## Versioned Docs

This repository now follows the versioned documentation pattern used across maintained ReviveJS component projects:

- source docs apps live in `docs-src/react-18` and `docs-src/react-19`
- compiled static builds live in `docs/react-18` and `docs/react-19`
- `docs/index.html` redirects to the latest maintained React line

That keeps GitHub Pages, npm metadata, and historical release lines aligned.

## Run Locally

```bash
npm install
npm run build

npm run docs:install:react-18
npm run build:docs:react-18

npm run docs:install:react-19
npm run build:docs:react-19
```

If you still want the legacy authoring environment for story development, Storybook remains available locally:

```bash
npm run storybook
```

## Changelog

See [CHANGELOG.md](https://github.com/alexandroit/react-data-table-component/blob/master/CHANGELOG.md).

## Credits

- Original project: [John Betancur](https://github.com/jbetancur/react-data-table-component)
- Maintained by: [Alexandro Paixao Marques](https://github.com/alexandroit)
