# @revivejs/react-data-table-component

> A maintained React data table component with sorting, selection, expandable rows, pagination, and flexible styling.

[![npm version](https://img.shields.io/npm/v/%40revivejs%2Freact-data-table-component.svg?style=flat-square)](https://www.npmjs.com/package/@revivejs/react-data-table-component)
[![npm downloads](https://img.shields.io/npm/dt/%40revivejs%2Freact-data-table-component.svg?style=flat-square)](https://www.npmjs.com/package/@revivejs/react-data-table-component)
[![npm monthly](https://img.shields.io/npm/dm/%40revivejs%2Freact-data-table-component.svg?style=flat-square)](https://www.npmjs.com/package/@revivejs/react-data-table-component)
[![license](https://img.shields.io/npm/l/%40revivejs%2Freact-data-table-component.svg?style=flat-square)](https://github.com/alexandroit/react-data-table-component/blob/master/LICENSE)
[![React 19](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript 5.7](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![GitHub stars](https://img.shields.io/github/stars/alexandroit/react-data-table-component.svg?style=flat-square)](https://github.com/alexandroit/react-data-table-component/stargazers)

**[Documentation & Demo](https://alexandroit.github.io/react-data-table-component/)** | **[Repository](https://github.com/alexandroit/react-data-table-component)** | **[npm](https://www.npmjs.com/package/@revivejs/react-data-table-component)** | **[Changelog](https://github.com/alexandroit/react-data-table-component/blob/master/CHANGELOG.md)**

---

> **Credits:** Original project by [John Betancur](https://github.com/jbetancur/react-data-table-component).  
> Maintained and modernized by [Alexandro Paixao Marques](https://github.com/alexandroit).

---

## Why this library?

`@revivejs/react-data-table-component` is the maintained scoped continuation of the original package, preserving the familiar declarative API while updating package metadata, docs, and publishing flow for the current repository owner.

This repository is a React library, not an Angular package, so Angular-specific compatibility and migration steps do not apply here.

---

## Features

| Feature | Supported |
| :--- | :---: |
| Declarative column definitions | ✅ |
| Built-in sorting | ✅ |
| Selectable rows | ✅ |
| Expandable rows | ✅ |
| Client and server pagination hooks | ✅ |
| Custom cells and row actions | ✅ |
| Conditional row and cell styles | ✅ |
| Theme customization | ✅ |
| Responsive layout | ✅ |
| TypeScript typings included | ✅ |

---

## Table of Contents

1. [React Version Compatibility](#react-version-compatibility)
2. [Installation](#installation)
3. [Setup](#setup)
4. [Basic Usage](#basic-usage)
5. [Props](#props)
6. [Events](#events)
7. [Styling](#styling)
8. [Run Locally](#run-locally)
9. [Publishing](#publishing)
10. [License](#license)

---

## React Version Compatibility

| Package Version | React | TypeScript | Node.js |
| :--- | :---: | :---: | :---: |
| `9.x` | `19.x` | `5.7` | `>= 18.19` |
| `8.x` | `18.x` | `5.7` | `>= 18.19` |
| `7.x` | `17.x, 18.x` | `4.x - 5.x` | `>= 16.14` |

---

## Installation

```bash
npm install @revivejs/react-data-table-component styled-components
```

---

## Setup

```tsx
import DataTable from '@revivejs/react-data-table-component';

export default DataTable;
```

---

## Basic Usage

```tsx
import DataTable, { TableColumn } from '@revivejs/react-data-table-component';

type Movie = {
	id: number;
	title: string;
	year: string;
};

const columns: TableColumn<Movie>[] = [
	{
		id: 'title',
		name: 'Title',
		selector: row => row.title,
		sortable: true,
	},
	{
		id: 'year',
		name: 'Year',
		selector: row => row.year,
		sortable: true,
		right: true,
	},
];

const data: Movie[] = [
	{ id: 1, title: 'Beetlejuice', year: '1988' },
	{ id: 2, title: 'Ghostbusters', year: '1984' },
];

export function Example() {
	return <DataTable columns={columns} data={data} pagination />;
}
```

---

## Props

| Prop | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `columns` | `TableColumn<T>[]` | Column definitions for the table. | `[]` |
| `data` | `T[]` | Row data to render. | `[]` |
| `keyField` | `string` | Unique field used to identify each row. | `'id'` |
| `title` | `string \| ReactNode` | Header title shown above the table. | `''` |
| `pagination` | `boolean` | Enables the built-in pagination UI. | `false` |
| `paginationServer` | `boolean` | Disables client paging and lets you drive pagination externally. | `false` |
| `paginationPerPage` | `number` | Initial rows per page. | `10` |
| `paginationRowsPerPageOptions` | `number[]` | Rows-per-page options shown in the footer. | `[10, 15, 20, 25, 30]` |
| `selectableRows` | `boolean` | Adds row selection checkboxes. | `false` |
| `selectableRowsSingle` | `boolean` | Restricts row selection to a single row. | `false` |
| `expandableRows` | `boolean` | Enables row expansion support. | `false` |
| `expandableRowsComponent` | `ComponentType` | Custom component used to render expanded row content. | built-in helper text |
| `highlightOnHover` | `boolean` | Highlights rows on hover. | `false` |
| `pointerOnHover` | `boolean` | Shows a pointer cursor on hover. | `false` |
| `conditionalRowStyles` | `ConditionalStyles<T>[]` | Applies styles to rows when conditions match. | `[]` |
| `customStyles` | `TableStyles` | Overrides built-in styles with CSS-in-JS objects. | `{}` |
| `theme` | `Themes` | Uses a registered theme such as `default` or `dark`. | `'default'` |
| `onSort` | `(column, direction, rows) => void` | Fired after sorting changes. | `noop` |
| `onSelectedRowsChange` | `(state) => void` | Fired when row selection changes. | `noop` |
| `onChangePage` | `(page, totalRows) => void` | Fired when the current page changes. | `noop` |
| `onChangeRowsPerPage` | `(rowsPerPage, currentPage) => void` | Fired when rows-per-page changes. | `noop` |

---

## Events

- `onSort`: Fires when the active sort column or direction changes.
- `onSelectedRowsChange`: Fires when selected rows change.
- `onRowClicked`: Fires when a row is clicked.
- `onRowDoubleClicked`: Fires when a row is double-clicked.
- `onRowMouseEnter`: Fires when the pointer enters a row.
- `onRowMouseLeave`: Fires when the pointer leaves a row.
- `onRowExpandToggled`: Fires when an expandable row is opened or closed.
- `onChangePage`: Fires when pagination changes page.
- `onChangeRowsPerPage`: Fires when the page size changes.
- `onColumnOrderChange`: Fires when a reorderable column layout changes.

---

## Styling

The component uses `styled-components` and ships with built-in `default` and `dark` themes. You can override styles with the `customStyles` prop or register additional themes with `createTheme`. For the full theme object shape, see [`src/DataTable/themes.ts`](https://github.com/alexandroit/react-data-table-component/blob/master/src/DataTable/themes.ts) and [`src/DataTable/styles.ts`](https://github.com/alexandroit/react-data-table-component/blob/master/src/DataTable/styles.ts).

---

## Run Locally

```bash
corepack yarn install
npm run storybook
```

The local Storybook demo runs on `http://localhost:6006/`, and the static docs build is generated into `docs/` for GitHub Pages.

---

## Publishing

```bash
npm run build
npm run pack:check
```

The publishable package is the repository root package under the scoped name `@revivejs/react-data-table-component`. The tarball contains the compiled `dist/` output plus the root README and license.

---

## License

Apache-2.0.

---

## Credits

- Original project: [John Betancur](https://github.com/jbetancur/react-data-table-component)
- Maintained by: [Alexandro Paixao Marques](https://github.com/alexandroit)
