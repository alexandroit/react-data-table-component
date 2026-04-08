import {
  PureComponent,
  useEffect,
  useCallback,
  useMemo,
  useState,
  type ChangeEvent,
  type ReactNode
} from 'react';
import DataTable, {
  Alignment,
  Direction,
  createTheme,
  defaultThemes,
  type ConditionalStyles,
  type PaginationComponentProps,
  type TableColumn,
  type TableStyles
} from '@stackline/react-data-table-component';
import sampleDessertsSource from '../../../stories/constants/sampleDesserts';
import sampleMovieDataSource from '../../../stories/constants/sampleMovieData';

createTheme(
  'reviveSlate',
  {
    text: {
      primary: '#f7fbff',
      secondary: '#a9bfd7'
    },
    background: {
      default: '#102033'
    },
    context: {
      background: '#1f5ba7',
      text: '#ffffff'
    },
    divider: {
      default: '#284563'
    },
    action: {
      button: 'rgba(255,255,255,0.7)',
      hover: 'rgba(255,255,255,0.12)',
      disabled: 'rgba(255,255,255,0.24)'
    }
  },
  'dark'
);

createTheme(
  'reviveSolarized',
  {
    text: {
      primary: '#268bd2',
      secondary: '#2aa198'
    },
    background: {
      default: '#002b36'
    },
    context: {
      background: '#cb4b16',
      text: '#ffffff'
    },
    divider: {
      default: '#073642'
    },
    button: {
      default: '#2aa198',
      hover: 'rgba(0,0,0,0.08)',
      focus: 'rgba(255,255,255,0.12)',
      disabled: 'rgba(255,255,255,0.34)'
    },
    sortFocus: {
      default: '#2aa198'
    }
  },
  'dark'
);

const INSTALL_CODE = `npm install @stackline/react-data-table-component@9 styled-components`;

const SETUP_CODE = `import DataTable, { type TableColumn } from '@stackline/react-data-table-component';\n\nconst columns: TableColumn<Row>[] = [\n  { name: 'Name', selector: row => row.name, sortable: true }\n];`;

const RENDER_CODE = `<DataTable columns={columns} data={rows} pagination />`;

const BASIC_MOVIE_CODE = `<DataTable columns={movieColumns} data={movieRows} pagination />`;
const FILTER_CODE = `const filteredRows = rows.filter(row => row.title.toLowerCase().includes(filterText));\n<DataTable subHeader subHeaderComponent={<input value={filterText} />} />`;
const EXPORT_CODE = `const actions = <button onClick={() => downloadCsv(rows)}>Export CSV</button>;\n<DataTable actions={actions} columns={movieColumns} data={movieRows} />`;
const REMOTE_SORT_CODE = `<DataTable sortServer progressPending={loading} onSort={handleSort} pagination />`;
const CUSTOM_SORT_CODE = `const customSort = (rows, selector, direction) => rows.sort((a, b) => ...);\n<DataTable sortFunction={customSort} />`;
const CUSTOM_COLUMN_SORT_CODE = `<DataTable columns={[{ ...titleColumn, sortFunction: caseInsensitiveSort }]} />`;
const PAGINATION_OPTIONS_CODE = `<DataTable pagination paginationComponentOptions={{ rowsPerPageText: 'Rows', selectAllRowsItem: true }} />`;
const REMOTE_PAGINATION_CODE = `<DataTable paginationServer paginationTotalRows={totalRows} onChangePage={handlePage} />`;
const PRESELECTED_CODE = `<DataTable selectableRows selectableRowSelected={row => row.fat > 6} />`;
const PREDISABLED_CODE = `<DataTable selectableRows selectableRowDisabled={row => row.isOutOfStock} />`;
const MANAGE_SELECTIONS_CODE = `<DataTable selectableRows contextActions={deleteButton} clearSelectedRows={toggleCleared} />`;
const EXPANDABLE_CODE = `<DataTable expandableRows expandableRowsComponent={ExpandedMovie} pagination />`;
const PREEXPANDED_CODE = `<DataTable expandableRows expandableRowExpanded={row => row.defaultExpanded} />`;
const PREEXPAND_DISABLED_CODE = `<DataTable expandableRows expandableRowDisabled={row => row.disabled} />`;
const DELAYED_COLUMNS_CODE = `const [columns, setColumns] = useState([]);\n<DataTable columns={columns} progressPending={pending} />`;
const OMIT_DYNAMIC_CODE = `<button onClick={() => setHideDirector(!hideDirector)}>Toggle column</button>`;
const REORDER_CODE = `<DataTable columns={reorderColumns} onColumnOrderChange={nextOrder => console.log(nextOrder)} />`;
const HIDE_ON_RESIZE_CODE = `<DataTable columns={[{ name: 'Type', hide: 'sm' }, { name: 'Fat', hide: 'md' }]} />`;
const CUSTOM_CELLS_CODE = `<DataTable columns={[{ name: 'Title', cell: row => <div>...</div> }]} />`;
const CONDITIONAL_ROWS_CODE = `<DataTable conditionalRowStyles={conditionalRowStyles} pagination />`;
const LOADING_CODE = `<DataTable progressPending={pending} progressComponent={<CustomLoader />} pagination />`;
const THEME_CODE = `<DataTable theme="dark" selectableRows expandableRows pagination />`;
const CUSTOM_THEME_CODE = `createTheme('reviveSolarized', customTheme, 'dark');\n<DataTable theme="reviveSolarized" />`;
const CUSTOM_STYLES_CODE = `<DataTable customStyles={customStyles} highlightOnHover pointerOnHover />`;
const PERFORMANCE_CODE = `const columns = useMemo(() => [...], []);\n<DataTable columns={columns} onSelectedRowsChange={handleChange} />`;
const UI_TABLE_CODE = `<DataTable actions={toolbar} contextActions={bulkActions} sortIcon={<span>↓</span>} />`;
const UI_PAGINATION_CODE = `<DataTable pagination paginationComponent={CustomPaginationBar} />`;
const FIXED_HEADER_CODE = `<DataTable fixedHeader fixedHeaderScrollHeight="280px" pagination />`;

type AppProps = {
  reactLine: string;
  packageLine: string;
  docsPath: string;
};

type LogFn = (message: string) => void;

type MovieRow = {
  id: number;
  title: string;
  year: string;
  runtime: string;
  genres: string[];
  director: string;
  actors: string;
  plot: string;
  posterUrl: string;
};

type DessertRow = {
  id: number;
  name: string;
  type: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
  sodium: number;
  calcium: number;
  iron: number;
  isOutOfStock?: boolean;
};

type AccountRow = {
  id: string;
  customer: string;
  owner: string;
  region: string;
  plan: string;
  seats: number;
  mrr: number;
  health: 'Healthy' | 'Watch' | 'At risk';
  lastInvoice: string;
};

type UserRow = {
  id: string;
  name: string;
  email: string;
  address: string;
};

type SheetRow = {
  id: number;
  title: string;
  by: string;
  lastOpened: string;
};

type DemoMeta = {
  id: string;
  category: string;
  title: string;
  summary: string;
  code: string;
};

const movieRows = (sampleMovieDataSource as MovieRow[]).slice(0, 12);
const dessertRows = (sampleDessertsSource as DessertRow[]).map((row, index) => ({
  ...row,
  isOutOfStock: index === 1 || index === 3
}));

const accountRows: AccountRow[] = [
  { id: 'acct-01', customer: 'Northwind', owner: 'Priya Shah', region: 'Toronto', plan: 'Scale', seats: 38, mrr: 4600, health: 'Healthy', lastInvoice: '2026-03-28' },
  { id: 'acct-02', customer: 'Bluebird', owner: 'Sam Ortega', region: 'Austin', plan: 'Growth', seats: 18, mrr: 2400, health: 'Watch', lastInvoice: '2026-03-26' },
  { id: 'acct-03', customer: 'Everfield', owner: 'Mia Collins', region: 'Berlin', plan: 'Scale', seats: 54, mrr: 7200, health: 'Healthy', lastInvoice: '2026-03-25' },
  { id: 'acct-04', customer: 'Cinder Labs', owner: 'Noah Kim', region: 'Seoul', plan: 'Starter', seats: 7, mrr: 720, health: 'At risk', lastInvoice: '2026-03-10' },
  { id: 'acct-05', customer: 'Vertex Cloud', owner: 'Elena Costa', region: 'Lisbon', plan: 'Growth', seats: 22, mrr: 2950, health: 'Healthy', lastInvoice: '2026-03-22' },
  { id: 'acct-06', customer: 'Harbor Grid', owner: 'Liam Foster', region: 'London', plan: 'Enterprise', seats: 88, mrr: 14500, health: 'Watch', lastInvoice: '2026-03-29' },
  { id: 'acct-07', customer: 'Sundial Bio', owner: 'Nina Roy', region: 'Boston', plan: 'Scale', seats: 44, mrr: 6100, health: 'Healthy', lastInvoice: '2026-03-27' },
  { id: 'acct-08', customer: 'Maple Track', owner: 'Arjun Desai', region: 'Toronto', plan: 'Starter', seats: 11, mrr: 980, health: 'At risk', lastInvoice: '2026-03-09' },
  { id: 'acct-09', customer: 'Juniper Ops', owner: 'Kara Mills', region: 'Denver', plan: 'Growth', seats: 28, mrr: 3600, health: 'Healthy', lastInvoice: '2026-03-21' },
  { id: 'acct-10', customer: 'Tidal Studio', owner: 'Oscar Perez', region: 'Madrid', plan: 'Scale', seats: 41, mrr: 5400, health: 'Watch', lastInvoice: '2026-03-24' },
  { id: 'acct-11', customer: 'Quartz Data', owner: 'Ava Brooks', region: 'Chicago', plan: 'Enterprise', seats: 96, mrr: 15800, health: 'Healthy', lastInvoice: '2026-03-30' },
  { id: 'acct-12', customer: 'Canopy Health', owner: 'Leo Martin', region: 'Paris', plan: 'Growth', seats: 24, mrr: 3200, health: 'Watch', lastInvoice: '2026-03-16' }
];

const userRows: UserRow[] = [
  { id: 'user-01', name: 'Ava Johnson', email: 'ava.johnson@example.com', address: '55 Market Street, Toronto' },
  { id: 'user-02', name: 'Milo Park', email: 'milo.park@example.com', address: '812 King Street, Austin' },
  { id: 'user-03', name: 'Noah Rivera', email: 'noah.rivera@example.com', address: '9 Broadway, New York' },
  { id: 'user-04', name: 'Elena Costa', email: 'elena.costa@example.com', address: '17 Avenida Liberdade, Lisbon' },
  { id: 'user-05', name: 'Sara Blake', email: 'sara.blake@example.com', address: '220 Queen Street, Ottawa' },
  { id: 'user-06', name: 'Liam Foster', email: 'liam.foster@example.com', address: '17 Oxford Street, London' },
  { id: 'user-07', name: 'Nina Roy', email: 'nina.roy@example.com', address: '44 Marine Drive, Mumbai' },
  { id: 'user-08', name: 'Owen Taylor', email: 'owen.taylor@example.com', address: '71 Harbour Road, Halifax' },
  { id: 'user-09', name: 'Ivy Chen', email: 'ivy.chen@example.com', address: '97 Nathan Road, Hong Kong' },
  { id: 'user-10', name: 'Lucas White', email: 'lucas.white@example.com', address: '608 Main Street, Denver' },
  { id: 'user-11', name: 'Emma Scott', email: 'emma.scott@example.com', address: '103 Elm Street, Boston' },
  { id: 'user-12', name: 'Kai Lee', email: 'kai.lee@example.com', address: '16 Orchard Road, Singapore' },
  { id: 'user-13', name: 'Maya Singh', email: 'maya.singh@example.com', address: '8 College Street, Dublin' },
  { id: 'user-14', name: 'Arjun Desai', email: 'arjun.desai@example.com', address: '27 Bloor Street, Toronto' },
  { id: 'user-15', name: 'Chloe Martin', email: 'chloe.martin@example.com', address: '380 Rue Saint-Paul, Montreal' },
  { id: 'user-16', name: 'Leo Green', email: 'leo.green@example.com', address: '202 River Street, Chicago' },
  { id: 'user-17', name: 'Jade Kim', email: 'jade.kim@example.com', address: '15 Yongsan-ro, Seoul' },
  { id: 'user-18', name: 'Finn Torres', email: 'finn.torres@example.com', address: '400 Sunset Blvd, Los Angeles' },
  { id: 'user-19', name: 'Grace Wilson', email: 'grace.wilson@example.com', address: '1 Princess Street, Edinburgh' },
  { id: 'user-20', name: 'Mason Bell', email: 'mason.bell@example.com', address: '75 Granville Street, Vancouver' }
];

const sheetRows: SheetRow[] = [
  { id: 1, title: 'Cutting Costs', by: 'me', lastOpened: 'Aug 7 9:52 AM' },
  { id: 2, title: 'Wedding Planner', by: 'me', lastOpened: 'Sep 14 2:52 PM' },
  { id: 3, title: 'Expense Tracker', by: 'me', lastOpened: 'Sep 12 2:41 PM' },
  { id: 4, title: 'Home Brew Water Calculator', by: 'me', lastOpened: 'Jun 3 5:45 PM' }
];

const movieColumns: TableColumn<MovieRow>[] = [
  {
    name: 'Title',
    selector: row => row.title,
    sortable: true,
    sortField: 'title',
    grow: 2
  },
  {
    name: 'Director',
    selector: row => row.director,
    sortable: true,
    sortField: 'director',
    grow: 2
  },
  {
    name: 'Year',
    selector: row => row.year,
    sortable: true,
    sortField: 'year',
    right: true,
    width: '96px'
  }
];

const dessertColumns: TableColumn<DessertRow>[] = [
  { name: 'Name', selector: row => row.name, sortable: true, grow: 2 },
  { name: 'Type', selector: row => row.type, sortable: true },
  { name: 'Calories (g)', selector: row => row.calories, sortable: true, right: true },
  { name: 'Fat (g)', selector: row => row.fat, sortable: true, right: true },
  { name: 'Carbs (g)', selector: row => row.carbs, sortable: true, right: true },
  { name: 'Protein (g)', selector: row => row.protein, sortable: true, right: true }
];

const accountColumns: TableColumn<AccountRow>[] = [
  { name: 'Customer', selector: row => row.customer, sortable: true, grow: 2 },
  { name: 'Region', selector: row => row.region, sortable: true },
  { name: 'Plan', selector: row => row.plan, sortable: true },
  { name: 'Seats', selector: row => row.seats, sortable: true, right: true },
  {
    name: 'MRR',
    selector: row => row.mrr,
    sortable: true,
    right: true,
    cell: row => `$${row.mrr.toLocaleString()}`
  }
];

const userColumns: TableColumn<UserRow>[] = [
  { name: 'Name', selector: row => row.name, sortable: true },
  { name: 'Email', selector: row => row.email, sortable: true, grow: 2 },
  { name: 'Address', selector: row => row.address, sortable: true, grow: 2 }
];

const compactGridStyles: TableStyles = {
  header: {
    style: {
      minHeight: '56px'
    }
  },
  headRow: {
    style: {
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
      borderTopColor: defaultThemes.default.divider.default
    }
  },
  headCells: {
    style: {
      '&:not(:last-of-type)': {
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: defaultThemes.default.divider.default
      }
    }
  },
  cells: {
    style: {
      '&:not(:last-of-type)': {
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: defaultThemes.default.divider.default
      }
    }
  }
};

const googleSheetsStyles: TableStyles = {
  headRow: {
    style: {
      border: 'none'
    }
  },
  headCells: {
    style: {
      color: '#202124',
      fontSize: '14px'
    }
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: 'rgb(230, 244, 244)',
      borderBottomColor: '#ffffff',
      borderRadius: '25px',
      outline: '1px solid #ffffff'
    }
  },
  pagination: {
    style: {
      border: 'none'
    }
  }
};

const defaultTableStyles: TableStyles = {
  headCells: {
    style: {
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: '#34506d'
    }
  },
  rows: {
    style: {
      minHeight: '56px'
    }
  }
};

const accountRowStyles: ConditionalStyles<AccountRow>[] = [
  {
    when: row => row.health === 'Healthy',
    style: {
      backgroundColor: 'rgba(48, 164, 108, 0.08)'
    }
  },
  {
    when: row => row.health === 'Watch',
    style: {
      backgroundColor: 'rgba(210, 106, 42, 0.1)'
    }
  },
  {
    when: row => row.health === 'At risk',
    style: {
      backgroundColor: 'rgba(180, 63, 63, 0.12)'
    }
  }
];

const dessertRowStyles: ConditionalStyles<DessertRow>[] = [
  {
    when: row => row.calories < 300,
    style: {
      backgroundColor: 'rgba(63, 195, 128, 0.9)',
      color: 'white'
    }
  },
  {
    when: row => row.calories >= 300 && row.calories < 400,
    style: {
      backgroundColor: 'rgba(248, 148, 6, 0.9)',
      color: 'white'
    }
  },
  {
    when: row => row.calories >= 400,
    style: {
      backgroundColor: 'rgba(242, 38, 19, 0.9)',
      color: 'white'
    }
  }
];

const DEMO_CATALOG: DemoMeta[] = [
  { id: 'kitchen-sink', category: 'Getting Started', title: 'Kitchen Sink', summary: 'Toggle the core table behaviors together and validate how sorting, selection, expansion, fixed headers, and subheaders compose.', code: `<DataTable columns={movieColumns} data={rows} pagination selectableRows expandableRows fixedHeader />` },
  { id: 'filtering', category: 'Examples', title: 'Filtering', summary: 'Use a controlled subheader input with pagination reset to deliver familiar dashboard filtering.', code: FILTER_CODE },
  { id: 'export-csv', category: 'Examples', title: 'Export CSV', summary: 'Attach table actions to export the current dataset without replacing the built-in header.', code: EXPORT_CODE },
  { id: 'sorting-basic', category: 'Sorting', title: 'Basic', summary: 'The default sortable column behavior covers the common case with no adapters.', code: BASIC_MOVIE_CODE },
  { id: 'sorting-remote', category: 'Sorting', title: 'Remote Sort', summary: 'Server-style sorting hands control to your callback while preserving the table header state.', code: REMOTE_SORT_CODE },
  { id: 'sorting-custom', category: 'Sorting', title: 'Custom Sort', summary: 'Use a table-level sort function when a dataset needs domain-specific ordering rules.', code: CUSTOM_SORT_CODE },
  { id: 'sorting-custom-column', category: 'Sorting', title: 'Custom Column Sort', summary: 'Apply a custom sort function to one column when only that field needs special handling.', code: CUSTOM_COLUMN_SORT_CODE },
  { id: 'pagination-basic', category: 'Pagination', title: 'Basic', summary: 'Client-side pagination is the quickest way to keep larger datasets readable.', code: BASIC_MOVIE_CODE },
  { id: 'pagination-options', category: 'Pagination', title: 'Options', summary: 'Override the pagination labels and select-all option for localized or product-specific wording.', code: PAGINATION_OPTIONS_CODE },
  { id: 'pagination-remote', category: 'Pagination', title: 'Remote', summary: 'Drive the current page and rows-per-page in React state while simulating a remote data source.', code: REMOTE_PAGINATION_CODE },
  { id: 'selectable-basic', category: 'Selectable', title: 'Basic', summary: 'Selectable rows work out of the box and report a stable selection payload back to React.', code: `<DataTable selectableRows pagination onSelectedRowsChange={handleSelection} />` },
  { id: 'selectable-preselected', category: 'Selectable', title: 'Pre Selected', summary: 'Preselect rows when business rules need a default checked state.', code: PRESELECTED_CODE },
  { id: 'selectable-predisabled', category: 'Selectable', title: 'Pre Disabled', summary: 'Disable unavailable rows without removing them from the dataset.', code: PREDISABLED_CODE },
  { id: 'selectable-manage', category: 'Selectable', title: 'Manage Selections', summary: 'Context actions let you delete or bulk-update the selected rows in place.', code: MANAGE_SELECTIONS_CODE },
  { id: 'expandable-basic', category: 'Expandable', title: 'Basic', summary: 'Render richer row details inside the table without bloating the visible columns.', code: EXPANDABLE_CODE },
  { id: 'expandable-preexpanded', category: 'Expandable', title: 'Pre Expanded', summary: 'Open a known row by default when you want important details visible immediately.', code: PREEXPANDED_CODE },
  { id: 'expandable-predisabled', category: 'Expandable', title: 'Pre Disabled', summary: 'Prevent expansion for rows that do not have detail content available.', code: PREEXPAND_DISABLED_CODE },
  { id: 'columns-delayed', category: 'Columns', title: 'Delayed', summary: 'Columns can arrive later than the row data when schemas are fetched asynchronously.', code: DELAYED_COLUMNS_CODE },
  { id: 'columns-omit', category: 'Columns', title: 'Omit', summary: 'Hide columns statically when a field is not relevant for a given product view.', code: `<DataTable columns={[titleColumn, { ...directorColumn, omit: true }, yearColumn]} />` },
  { id: 'columns-omit-dynamic', category: 'Columns', title: 'Omit Dynamically', summary: 'Toggle column visibility at runtime without recreating the whole table shell.', code: OMIT_DYNAMIC_CODE },
  { id: 'columns-reorder', category: 'Columns', title: 'Reorder', summary: 'Enable column reordering to let power users reorganize dense analytical tables.', code: REORDER_CODE },
  { id: 'columns-hide-resize', category: 'Columns', title: 'Hide On Resize', summary: 'Use breakpoint-aware `hide` values to keep the table readable on smaller screens.', code: HIDE_ON_RESIZE_CODE },
  { id: 'columns-custom-cells', category: 'Columns', title: 'Cells / Custom Cells', summary: 'Custom cell renderers let you mix metadata, actions, and richer content into a row.', code: CUSTOM_CELLS_CODE },
  { id: 'columns-static-styling', category: 'Columns', title: 'Cells / Static Styling', summary: 'Apply fixed column styles when a particular field should always stand out.', code: `<DataTable columns={[{ ...nameColumn, style: { backgroundColor: 'rgba(63,195,128,0.9)' } }]} />` },
  { id: 'columns-conditional-styling', category: 'Columns', title: 'Cells / Conditional Styling', summary: 'Conditional cell styles surface thresholds directly inside the grid.', code: `<DataTable columns={[{ ...caloriesColumn, conditionalCellStyles }]} />` },
  { id: 'conditional-rows', category: 'Conditional Rows', title: 'Rows', summary: 'Use row-level conditional styles to flag outliers and operational states.', code: CONDITIONAL_ROWS_CODE },
  { id: 'loading-basic', category: 'Loading', title: 'Basic', summary: 'The built-in loading state keeps pagination and table headers consistent during fetches.', code: `<DataTable progressPending={pending} pagination />` },
  { id: 'loading-custom', category: 'Loading', title: 'Custom', summary: 'Swap in a branded progress component without losing the table container.', code: LOADING_CODE },
  { id: 'theming-builtin', category: 'Theming', title: 'Builtin', summary: 'Toggle between the default and dark themes to see the core theming API in action.', code: THEME_CODE },
  { id: 'theming-custom', category: 'Theming', title: 'Custom', summary: 'Register a custom theme once and reuse it across every table instance.', code: CUSTOM_THEME_CODE },
  { id: 'styles-grid', category: 'Custom Styles', title: 'Compact Grid', summary: 'Custom styles can recreate dense, grid-like table layouts for analytical use cases.', code: CUSTOM_STYLES_CODE },
  { id: 'styles-gsheets', category: 'Custom Styles', title: 'Google Sheets Esque', summary: 'Custom styles also work for softer product patterns such as file lists and document indexes.', code: CUSTOM_STYLES_CODE },
  { id: 'performance-classic', category: 'Performance', title: 'Examples / Classic Component', summary: 'The classic component example shows how memoized columns and handlers reduce churn.', code: PERFORMANCE_CODE },
  { id: 'performance-hook', category: 'Performance', title: 'Examples / Hook Component', summary: 'The hook variant keeps columns and callbacks stable with `useMemo` and `useCallback`.', code: PERFORMANCE_CODE },
  { id: 'ui-table', category: 'UI Library', title: 'Material UI / Table', summary: 'Use header actions, context actions, custom sort icons, and selection in an app-shell card.', code: UI_TABLE_CODE },
  { id: 'ui-pagination', category: 'UI Library', title: 'Material UI / Pagination', summary: 'A custom pagination component lets you align the footer with your design system.', code: UI_PAGINATION_CODE },
  { id: 'ui-progress', category: 'UI Library', title: 'Material UI / Progress', summary: 'Custom progress UI works cleanly with the table loading state and persistent headers.', code: LOADING_CODE },
  { id: 'headers-fixed', category: 'Headers', title: 'Fixed Header', summary: 'Fixed headers keep large tables usable while the body scrolls inside a constrained panel.', code: FIXED_HEADER_CODE }
];

const DEMO_BY_ID = Object.fromEntries(DEMO_CATALOG.map(demo => [demo.id, demo])) as Record<string, DemoMeta>;
const DEMO_GROUPS = DEMO_CATALOG.reduce<Record<string, DemoMeta[]>>((groups, demo) => {
  if (!groups[demo.category]) {
    groups[demo.category] = [];
  }
  groups[demo.category].push(demo);
  return groups;
}, {});

function stamp(message: string) {
  return `${new Date().toLocaleTimeString('en-US', { hour12: false })}  ${message}`;
}

function sortRowsBySelector<T>(rows: T[], selector: (row: T) => string | number, direction: 'asc' | 'desc') {
  const factor = direction === 'desc' ? -1 : 1;

  return [...rows].sort((left, right) => {
    const a = selector(left);
    const b = selector(right);

    if (a === b) {
      return 0;
    }

    return a > b ? factor : -factor;
  });
}

function downloadCsv<T extends Record<string, unknown>>(rows: T[]) {
  if (!rows.length) {
    return;
  }

  const keys = Object.keys(rows[0]);
  const header = keys.join(',');
  const lines = rows.map(row => keys.map(key => JSON.stringify(row[key] ?? '')).join(','));
  const csv = [header, ...lines].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'react-data-table-component-export.csv';
  link.click();
  URL.revokeObjectURL(url);
}

function ExpandedMovie({ data }: { data: MovieRow }) {
  return (
    <div className="expanded-panel">
      <strong>{data.title}</strong>
      <p>{data.plot}</p>
      <div className="expanded-meta">
        <span>{data.director}</span>
        <span>{data.runtime} min</span>
        <span>{data.genres.join(', ')}</span>
      </div>
    </div>
  );
}

function CustomPaginationBar({
  rowsPerPage,
  rowCount,
  currentPage,
  onChangePage,
  onChangeRowsPerPage
}: PaginationComponentProps) {
  const totalPages = Math.max(1, Math.ceil(rowCount / rowsPerPage));

  return (
    <nav className="custom-pager" aria-label="Custom pagination">
      <div className="custom-pager-group">
        <button disabled={currentPage <= 1} onClick={() => onChangePage(currentPage - 1, rowCount)} type="button">
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button disabled={currentPage >= totalPages} onClick={() => onChangePage(currentPage + 1, rowCount)} type="button">
          Next
        </button>
      </div>
      <label className="custom-pager-select">
        <span>Rows</span>
        <select
          value={rowsPerPage}
          onChange={event => onChangeRowsPerPage(Number(event.target.value), currentPage)}
        >
          {[5, 10, 15].map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </nav>
  );
}

function LinearLoader() {
  return (
    <div className="loader-shell">
      <div className="linear-loader" />
      <span>Loading rows…</span>
    </div>
  );
}

function FancyLoader() {
  return (
    <div className="loader-shell">
      <div className="spinner" />
      <span>Preparing table…</span>
    </div>
  );
}

function KitchenSinkDemo({ onLog }: { onLog: LogFn }) {
  const [query, setQuery] = useState('');
  const [settings, setSettings] = useState({
    selectableRows: true,
    selectableRowsNoSelectAll: false,
    selectableRowsVisibleOnly: false,
    selectableRowsHighlight: true,
    selectableRowsSingle: false,
    expandableRows: true,
    expandOnRowClicked: false,
    expandOnRowDoubleClicked: false,
    expandableRowsHideExpander: false,
    pagination: true,
    highlightOnHover: true,
    striped: false,
    pointerOnHover: true,
    dense: false,
    persistTableHead: true,
    noHeader: false,
    fixedHeader: false,
    progressPending: false,
    noTableHead: false,
    noContextMenu: false,
    responsive: true,
    disabled: false,
    subHeader: true
  });
  const [subHeaderAlign, setSubHeaderAlign] = useState<Alignment>(Alignment.RIGHT);
  const [direction, setDirection] = useState<Direction>(Direction.AUTO);

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return movieRows;
    }

    return movieRows.filter(row =>
      [row.title, row.director, row.plot].some(value => value.toLowerCase().includes(normalized))
    );
  }, [query]);

  const toggleField = (field: keyof typeof settings) => {
    setSettings(previous => {
      const next = { ...previous, [field]: !previous[field] };
      onLog(`Kitchen Sink: ${field} ${next[field] ? 'enabled' : 'disabled'}`);
      return next;
    });
  };

  const selectionProps = settings.selectableRowsSingle ? { type: 'radio' } : undefined;

  return (
    <div className="demo-stack">
      <div className="toggle-grid">
        {[
          ['selectableRows', 'Selectable rows'],
          ['selectableRowsHighlight', 'Selected row highlight'],
          ['selectableRowsVisibleOnly', 'Visible rows only'],
          ['expandableRows', 'Expandable rows'],
          ['expandOnRowClicked', 'Expand on row click'],
          ['expandOnRowDoubleClicked', 'Expand on double click'],
          ['expandableRowsHideExpander', 'Hide expander'],
          ['pagination', 'Pagination'],
          ['highlightOnHover', 'Highlight on hover'],
          ['pointerOnHover', 'Pointer on hover'],
          ['dense', 'Dense'],
          ['fixedHeader', 'Fixed header'],
          ['striped', 'Striped'],
          ['subHeader', 'Subheader'],
          ['responsive', 'Responsive'],
          ['disabled', 'Disabled'],
          ['progressPending', 'Progress pending']
        ].map(([field, label]) => (
          <label className="toggle-card" key={field}>
            <input
              checked={settings[field as keyof typeof settings]}
              onChange={() => toggleField(field as keyof typeof settings)}
              type="checkbox"
            />
            <span>{label}</span>
          </label>
        ))}
      </div>

      <div className="toolbar">
        <label className="toolbar-field">
          <span>Search</span>
          <input
            value={query}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setQuery(event.target.value);
              onLog(`Kitchen Sink search: ${event.target.value || 'cleared'}`);
            }}
            placeholder="Search titles or directors"
            type="search"
          />
        </label>
        <label className="toolbar-field">
          <span>Subheader align</span>
          <select value={subHeaderAlign} onChange={event => setSubHeaderAlign(event.target.value as Alignment)}>
            <option value={Alignment.RIGHT}>Right</option>
            <option value={Alignment.CENTER}>Center</option>
            <option value={Alignment.LEFT}>Left</option>
          </select>
        </label>
        <label className="toolbar-field">
          <span>Direction</span>
          <select value={direction} onChange={event => setDirection(event.target.value as Direction)}>
            <option value={Direction.AUTO}>Auto</option>
            <option value={Direction.LTR}>LTR</option>
            <option value={Direction.RTL}>RTL</option>
          </select>
        </label>
      </div>

      <DataTable
        title="Kitchen Sink movie list"
        columns={movieColumns}
        data={filteredRows}
        selectableRows={settings.selectableRows}
        selectableRowsNoSelectAll={settings.selectableRowsNoSelectAll}
        selectableRowsVisibleOnly={settings.selectableRowsVisibleOnly}
        selectableRowsHighlight={settings.selectableRowsHighlight}
        selectableRowsSingle={settings.selectableRowsSingle}
        selectableRowsComponentProps={selectionProps}
        expandableRows={settings.expandableRows}
        expandableRowsComponent={ExpandedMovie}
        expandOnRowClicked={settings.expandOnRowClicked}
        expandOnRowDoubleClicked={settings.expandOnRowDoubleClicked}
        expandableRowsHideExpander={settings.expandableRowsHideExpander}
        pagination={settings.pagination}
        highlightOnHover={settings.highlightOnHover}
        striped={settings.striped}
        pointerOnHover={settings.pointerOnHover}
        dense={settings.dense}
        persistTableHead={settings.persistTableHead}
        noHeader={settings.noHeader}
        fixedHeader={settings.fixedHeader}
        fixedHeaderScrollHeight="280px"
        progressPending={settings.progressPending}
        noTableHead={settings.noTableHead}
        noContextMenu={settings.noContextMenu}
        direction={direction}
        responsive={settings.responsive}
        disabled={settings.disabled}
        subHeader={settings.subHeader}
        subHeaderAlign={subHeaderAlign}
        subHeaderWrap
        subHeaderComponent={
          <div className="toolbar toolbar-inline">
            <input
              value={query}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
              placeholder="Search"
              type="search"
            />
            <button className="mini-button" type="button">
              Reply
            </button>
            <button className="mini-button" type="button">
              Email
            </button>
            <button className="mini-button" type="button">
              Export
            </button>
          </div>
        }
        customStyles={defaultTableStyles}
        onSort={(column, sortDirection) => onLog(`Kitchen Sink sorted ${String(column.name)} ${sortDirection}`)}
        onSelectedRowsChange={state => onLog(`Kitchen Sink selected ${state.selectedCount} row(s)`)}
        onRowExpandToggled={(expanded, row) => onLog(`${expanded ? 'Expanded' : 'Collapsed'} ${row.title}`)}
      />
    </div>
  );
}

function FilteringDemo({ onLog }: { onLog: LogFn }) {
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredRows = useMemo(() => {
    const query = filterText.trim().toLowerCase();
    if (!query) {
      return movieRows;
    }

    return movieRows.filter(row =>
      [row.title, row.director, row.genres.join(' '), row.plot].some(value => value.toLowerCase().includes(query))
    );
  }, [filterText]);

  return (
    <DataTable
      title="Filtering example"
      columns={movieColumns}
      data={filteredRows}
      pagination
      paginationResetDefaultPage={resetPaginationToggle}
      selectableRows
      persistTableHead
      subHeader
      customStyles={defaultTableStyles}
      subHeaderComponent={
        <div className="toolbar toolbar-inline">
          <input
            value={filterText}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setFilterText(event.target.value);
              setResetPaginationToggle(previous => !previous);
              onLog(`Filtering query: ${event.target.value || 'cleared'}`);
            }}
            placeholder="Filter title, genre, director, or plot"
            type="search"
          />
          <button
            className="mini-button"
            onClick={() => {
              setFilterText('');
              setResetPaginationToggle(previous => !previous);
              onLog('Filtering cleared');
            }}
            type="button"
          >
            Clear
          </button>
        </div>
      }
    />
  );
}

function ExportCsvDemo({ onLog }: { onLog: LogFn }) {
  const actions = useMemo(
    () => (
      <button
        className="mini-button"
        onClick={() => {
          downloadCsv(movieRows);
          onLog('Exported movie dataset to CSV');
        }}
        type="button"
      >
        Export CSV
      </button>
    ),
    [onLog]
  );

  return <DataTable title="Export CSV example" columns={movieColumns} data={movieRows} actions={actions} pagination />;
}

function SortingBasicDemo({ onLog }: { onLog: LogFn }) {
  return (
    <DataTable
      title="Basic sorting"
      columns={movieColumns}
      data={movieRows}
      pagination
      onSort={(column, direction) => onLog(`Sorted ${String(column.name)} ${direction}`)}
    />
  );
}

function SortingRemoteDemo({ onLog }: { onLog: LogFn }) {
  const [rows, setRows] = useState(movieRows);
  const [loading, setLoading] = useState(false);

  const handleSort = (column: TableColumn<MovieRow>, direction: 'asc' | 'desc') => {
    if (!column.selector) {
      return;
    }

    setLoading(true);
    onLog(`Remote sort requested for ${String(column.name)} ${direction}`);

    window.setTimeout(() => {
      setRows(previous => sortRowsBySelector(previous, row => column.selector?.(row) as string | number, direction));
      setLoading(false);
    }, 180);
  };

  return (
    <DataTable
      title="Remote sort"
      columns={movieColumns}
      data={rows}
      sortServer
      onSort={(column, sortDirection) => handleSort(column, sortDirection)}
      progressPending={loading}
      persistTableHead
      pagination
    />
  );
}

function SortingCustomDemo() {
  const customSort = (rows: MovieRow[], selector: (row: MovieRow) => string | number, direction: 'asc' | 'desc') =>
    [...rows].sort((left, right) => {
      const a = String(selector(left)).toLowerCase();
      const b = String(selector(right)).toLowerCase();

      if (a === b) {
        return 0;
      }

      if (direction === 'desc') {
        return a > b ? -1 : 1;
      }

      return a > b ? 1 : -1;
    });

  return <DataTable title="Custom sort" columns={movieColumns} data={movieRows} sortFunction={customSort} pagination />;
}

function SortingCustomColumnDemo() {
  const columns: TableColumn<MovieRow>[] = [
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
      sortFunction: (a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    },
    movieColumns[1],
    movieColumns[2]
  ];

  return <DataTable title="Custom column sort" columns={columns} data={movieRows} pagination />;
}

function PaginationBasicDemo() {
  return <DataTable title="Basic pagination" columns={movieColumns} data={movieRows} pagination />;
}

function PaginationOptionsDemo() {
  return (
    <DataTable
      title="Pagination options"
      columns={movieColumns}
      data={movieRows}
      pagination
      paginationComponentOptions={{
        rowsPerPageText: 'Rows',
        rangeSeparatorText: 'of',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'All'
      }}
    />
  );
}

function PaginationRemoteDemo({ onLog }: { onLog: LogFn }) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  const visibleRows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return userRows.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage]);

  const handlePageChange = (nextPage: number) => {
    setLoading(true);
    onLog(`Remote page requested: ${nextPage}`);
    window.setTimeout(() => {
      setPage(nextPage);
      setLoading(false);
    }, 180);
  };

  const handleRowsChange = (nextRowsPerPage: number, nextPage: number) => {
    setLoading(true);
    onLog(`Remote rows per page: ${nextRowsPerPage}`);
    window.setTimeout(() => {
      setRowsPerPage(nextRowsPerPage);
      setPage(nextPage);
      setLoading(false);
    }, 180);
  };

  return (
    <DataTable
      title="Remote pagination"
      columns={userColumns}
      data={visibleRows}
      progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={userRows.length}
      onChangeRowsPerPage={handleRowsChange}
      onChangePage={handlePageChange}
    />
  );
}

function SelectableBasicDemo({ onLog }: { onLog: LogFn }) {
  return (
    <DataTable
      title="Selectable rows"
      columns={movieColumns}
      data={movieRows}
      selectableRows
      pagination
      onSelectedRowsChange={state => onLog(`Selected ${state.selectedCount} movie row(s)`)}
    />
  );
}

function SelectablePreselectedDemo() {
  return (
    <DataTable
      title="Pre selected"
      columns={dessertColumns}
      data={dessertRows}
      selectableRows
      selectableRowSelected={row => row.fat > 6}
      pagination
    />
  );
}

function SelectablePredisabledDemo() {
  return (
    <DataTable
      title="Pre disabled"
      columns={[
        dessertColumns[0],
        dessertColumns[1],
        {
          name: 'Out of stock',
          selector: row => (row.isOutOfStock ? 'Yes' : 'No'),
          sortable: true,
          cell: row => (row.isOutOfStock ? 'Yes' : 'No')
        },
        dessertColumns[2],
        dessertColumns[3],
        dessertColumns[4]
      ]}
      data={dessertRows}
      selectableRows
      selectableRowDisabled={row => Boolean(row.isOutOfStock)}
      pagination
    />
  );
}

function SelectableManageDemo({ onLog }: { onLog: LogFn }) {
  const [rows, setRows] = useState(movieRows);
  const [selectedRows, setSelectedRows] = useState<MovieRow[]>([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const contextActions = selectedRows.length ? (
    <button
      className="mini-button danger"
      onClick={() => {
        const titles = selectedRows.map(row => row.title).join(', ');
        setRows(currentRows => currentRows.filter(row => !selectedRows.some(selected => selected.id === row.id)));
        setSelectedRows([]);
        setToggleCleared(previous => !previous);
        onLog(`Deleted selected rows: ${titles}`);
      }}
      type="button"
    >
      Delete selected
    </button>
  ) : null;

  return (
    <DataTable
      title="Manage selections"
      columns={movieColumns}
      data={rows}
      selectableRows
      contextActions={contextActions}
      clearSelectedRows={toggleCleared}
      onSelectedRowsChange={state => {
        setSelectedRows(state.selectedRows);
        onLog(`Manage selections changed: ${state.selectedCount} row(s)`);
      }}
      pagination
    />
  );
}

function ExpandableBasicDemo({ onLog }: { onLog: LogFn }) {
  return (
    <DataTable
      title="Expandable rows"
      columns={movieColumns}
      data={movieRows}
      expandableRows
      expandableRowsComponent={ExpandedMovie}
      pagination
      onRowExpandToggled={(expanded, row) => onLog(`${expanded ? 'Expanded' : 'Collapsed'} ${row.title}`)}
    />
  );
}

function ExpandablePreexpandedDemo() {
  const rows = movieRows.map((row, index) => ({
    ...row,
    defaultExpanded: index === 0
  }));

  return (
    <DataTable
      title="Pre expanded row"
      columns={movieColumns}
      data={rows}
      expandableRows
      expandableRowExpanded={row => Boolean((row as MovieRow & { defaultExpanded?: boolean }).defaultExpanded)}
      expandableRowsComponent={ExpandedMovie}
      pagination
    />
  );
}

function ExpandablePredisabledDemo() {
  const rows = movieRows.map(row => ({
    ...row,
    disabled: Number(row.year) < 2000
  }));

  return (
    <DataTable
      title="Pre disabled rows"
      columns={movieColumns}
      data={rows}
      expandableRows
      expandableRowDisabled={row => Boolean((row as MovieRow & { disabled?: boolean }).disabled)}
      expandableRowsComponent={ExpandedMovie}
      pagination
    />
  );
}

function DelayedColumnsDemo({ onLog }: { onLog: LogFn }) {
  const [columns, setColumns] = useState<TableColumn<UserRow>[]>([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    if (!pending || columns.length) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setColumns(userColumns);
      setPending(false);
      onLog('Delayed columns resolved');
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [columns.length, onLog, pending]);

  return <DataTable title="Delayed columns" columns={columns} data={userRows} progressPending={pending} />;
}

function ColumnsOmitDemo() {
  const columns: TableColumn<MovieRow>[] = [
    movieColumns[0],
    { ...movieColumns[1], omit: true },
    movieColumns[2]
  ];

  return <DataTable title="Omit column" columns={columns} data={movieRows} pagination />;
}

function ColumnsOmitDynamicDemo({ onLog }: { onLog: LogFn }) {
  const [hideDirector, setHideDirector] = useState(false);

  const columns = useMemo<TableColumn<MovieRow>[]>(() => [
    movieColumns[0],
    { ...movieColumns[1], omit: hideDirector },
    movieColumns[2]
  ], [hideDirector]);

  return (
    <div className="demo-stack">
      <div className="toolbar toolbar-inline">
        <button
          className="mini-button"
          onClick={() => {
            setHideDirector(previous => !previous);
            onLog(`Director column ${hideDirector ? 'shown' : 'hidden'}`);
          }}
          type="button"
        >
          {hideDirector ? 'Show director column' : 'Hide director column'}
        </button>
      </div>
      <DataTable title="Omit dynamically" columns={columns} data={movieRows} pagination />
    </div>
  );
}

function ColumnsReorderDemo({ onLog }: { onLog: LogFn }) {
  const reorderColumns = useMemo<TableColumn<DessertRow>[]>(() => [
    { ...dessertColumns[0], reorder: true },
    { ...dessertColumns[1], reorder: true },
    { ...dessertColumns[2], reorder: true },
    { ...dessertColumns[3], reorder: true },
    { ...dessertColumns[4], reorder: true },
    { ...dessertColumns[5], reorder: true }
  ], []);

  return (
    <DataTable
      title="Column reorder"
      columns={reorderColumns}
      data={dessertRows}
      onColumnOrderChange={nextOrder => onLog(`Column reorder: ${nextOrder.map(column => String(column.name)).join(' → ')}`)}
    />
  );
}

function ColumnsHideOnResizeDemo() {
  const columns: TableColumn<DessertRow>[] = [
    dessertColumns[0],
    { ...dessertColumns[1], hide: 'sm' },
    dessertColumns[2],
    { ...dessertColumns[3], hide: 'md' },
    { ...dessertColumns[4], hide: 'md' },
    { ...dessertColumns[5], hide: 'md' }
  ];

  return (
    <div className="demo-stack">
      <p className="demo-note">Resize the viewport to watch secondary nutrition columns collapse on smaller widths.</p>
      <DataTable title="Hide on resize" columns={columns} data={dessertRows} pagination />
    </div>
  );
}

function ColumnsCustomCellsDemo({ onLog }: { onLog: LogFn }) {
  const columns: TableColumn<MovieRow>[] = [
    {
      name: 'Title',
      grow: 2,
      sortable: true,
      selector: row => row.title,
      cell: row => (
        <div className="media-cell">
          <div className="poster-fallback">{row.title.slice(0, 2).toUpperCase()}</div>
          <div>
            <strong>{row.title}</strong>
            <span>{row.director}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Genres',
      cell: row => <span>{row.genres.join(', ')}</span>
    },
    {
      name: 'Actions',
      button: true,
      allowOverflow: true,
      cell: row => (
        <button className="mini-button" onClick={() => onLog(`Queued follow up for ${row.title}`)} type="button">
          Inspect
        </button>
      )
    }
  ];

  return <DataTable title="Custom cells" columns={columns} data={movieRows} pagination />;
}

function ColumnsStaticStylingDemo() {
  const columns: TableColumn<DessertRow>[] = [
    {
      ...dessertColumns[0],
      style: {
        backgroundColor: 'rgba(63, 195, 128, 0.9)',
        color: 'white'
      }
    },
    dessertColumns[1],
    {
      ...dessertColumns[2],
      style: {
        backgroundColor: 'rgba(187, 204, 221, 1)'
      }
    },
    dessertColumns[3],
    {
      ...dessertColumns[4],
      style: {
        backgroundColor: 'rgba(187, 204, 221, 1)'
      }
    },
    dessertColumns[5]
  ];

  return <DataTable title="Static cell styling" columns={columns} data={dessertRows} />;
}

function ColumnsConditionalStylingDemo() {
  const columns: TableColumn<DessertRow>[] = [
    dessertColumns[0],
    dessertColumns[1],
    {
      ...dessertColumns[2],
      conditionalCellStyles: [
        {
          when: row => row.calories < 300,
          style: { backgroundColor: 'rgba(63, 195, 128, 0.9)', color: 'white' }
        },
        {
          when: row => row.calories >= 300 && row.calories < 400,
          style: { backgroundColor: 'rgba(248, 148, 6, 0.9)', color: 'white' }
        },
        {
          when: row => row.calories >= 400,
          style: { backgroundColor: 'rgba(242, 38, 19, 0.9)', color: 'white' }
        }
      ]
    },
    {
      ...dessertColumns[3],
      conditionalCellStyles: [
        {
          when: row => row.fat <= 5,
          style: { backgroundColor: 'rgba(63, 195, 128, 0.9)', color: 'white' }
        },
        {
          when: row => row.fat > 5 && row.fat < 10,
          style: { backgroundColor: 'rgba(248, 148, 6, 0.9)', color: 'white' }
        },
        {
          when: row => row.fat >= 10,
          style: { backgroundColor: 'rgba(242, 38, 19, 0.9)', color: 'white' }
        }
      ]
    },
    dessertColumns[4],
    dessertColumns[5]
  ];

  return <DataTable title="Conditional cell styling" columns={columns} data={dessertRows} />;
}

function ConditionalRowsDemo() {
  return (
    <DataTable
      title="Conditional rows"
      columns={dessertColumns}
      data={dessertRows}
      conditionalRowStyles={dessertRowStyles}
      pagination
    />
  );
}

function LoadingBasicDemo({ onLog }: { onLog: LogFn }) {
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState<MovieRow[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setRows(movieRows);
      setPending(false);
      onLog('Basic loading resolved');
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [onLog]);

  return <DataTable title="Basic loading" columns={movieColumns} data={rows} progressPending={pending} pagination />;
}

function LoadingCustomDemo({ onLog }: { onLog: LogFn }) {
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState<MovieRow[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setRows(movieRows);
      setPending(false);
      onLog('Custom loading resolved');
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [onLog]);

  return (
    <DataTable
      title="Custom loading"
      columns={movieColumns}
      data={rows}
      progressPending={pending}
      progressComponent={<FancyLoader />}
      pagination
    />
  );
}

function ThemingBuiltinDemo({ onLog }: { onLog: LogFn }) {
  const [theme, setTheme] = useState<'default' | 'dark'>('default');

  return (
    <div className="demo-stack">
      <div className="toolbar toolbar-inline">
        <button
          className={`mini-button${theme === 'default' ? ' active' : ''}`}
          onClick={() => {
            setTheme('default');
            onLog('Theme switched to default');
          }}
          type="button"
        >
          Default
        </button>
        <button
          className={`mini-button${theme === 'dark' ? ' active' : ''}`}
          onClick={() => {
            setTheme('dark');
            onLog('Theme switched to dark');
          }}
          type="button"
        >
          Dark
        </button>
      </div>
      <DataTable
        title="Builtin themes"
        columns={movieColumns}
        data={movieRows}
        theme={theme}
        highlightOnHover
        pointerOnHover
        selectableRows
        expandableRows
        expandableRowsComponent={ExpandedMovie}
        pagination
      />
    </div>
  );
}

function ThemingCustomDemo() {
  return (
    <DataTable
      title="Custom theme"
      columns={movieColumns}
      data={movieRows}
      theme="reviveSolarized"
      selectableRows
      highlightOnHover
      pagination
    />
  );
}

function CompactGridDemo() {
  return (
    <DataTable
      title="Compact grid"
      columns={movieColumns}
      data={movieRows}
      customStyles={compactGridStyles}
      pagination
      selectableRows
      dense
    />
  );
}

function GoogleSheetsDemo({ onLog }: { onLog: LogFn }) {
  const columns: TableColumn<SheetRow>[] = [
    {
      cell: () => <span className="sheet-icon">▦</span>,
      width: '56px',
      style: {
        borderBottom: '1px solid #ffffff',
        marginBottom: '-1px'
      }
    },
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
      grow: 2,
      style: {
        color: '#202124',
        fontSize: '14px',
        fontWeight: 500
      }
    },
    {
      name: 'Owner',
      selector: row => row.by,
      sortable: true,
      style: {
        color: 'rgba(0,0,0,0.54)'
      }
    },
    {
      name: 'Last opened',
      selector: row => row.lastOpened,
      sortable: true,
      style: {
        color: 'rgba(0,0,0,0.54)'
      }
    },
    {
      cell: row => (
        <button className="menu-dot-button" onClick={() => onLog(`Opened menu for ${row.title}`)} type="button">
          •••
        </button>
      ),
      allowOverflow: true,
      button: true,
      width: '72px'
    }
  ];

  return (
    <DataTable
      title="Google Sheets esque"
      columns={columns}
      data={sheetRows}
      customStyles={googleSheetsStyles}
      highlightOnHover
      pointerOnHover
    />
  );
}

class ClassicPerformanceTable extends PureComponent<{ onLog: LogFn }, { selectedCount: number }> {
  state = {
    selectedCount: 0
  };

  handleButtonClick = (title: string) => {
    this.props.onLog(`Classic action clicked for ${title}`);
  };

  handleSelectionChange = (state: { selectedCount: number }) => {
    this.setState({ selectedCount: state.selectedCount });
    this.props.onLog(`Classic component selected ${state.selectedCount} row(s)`);
  };

  render() {
    const columns: TableColumn<DessertRow>[] = [
      {
        cell: row => (
          <button className="mini-button" onClick={() => this.handleButtonClick(row.name)} type="button">
            Action
          </button>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true
      },
      ...dessertColumns
    ];

    return (
      <div className="demo-stack">
        <p className="demo-note">Selected rows: {this.state.selectedCount}</p>
        <DataTable title="Classic component" columns={columns} data={dessertRows} selectableRows onSelectedRowsChange={this.handleSelectionChange} />
      </div>
    );
  }
}

function HookPerformanceDemo({ onLog }: { onLog: LogFn }) {
  const [selectedCount, setSelectedCount] = useState(0);

  const handleButtonClick = useCallback((name: string) => {
    onLog(`Hook action clicked for ${name}`);
  }, [onLog]);

  const handleSelection = useCallback((state: { selectedCount: number }) => {
    setSelectedCount(state.selectedCount);
    onLog(`Hook component selected ${state.selectedCount} row(s)`);
  }, [onLog]);

  const columns = useMemo<TableColumn<DessertRow>[]>(() => [
    {
      cell: row => (
        <button className="mini-button" onClick={() => handleButtonClick(row.name)} type="button">
          Action
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    },
    ...dessertColumns
  ], [handleButtonClick]);

  return (
    <div className="demo-stack">
      <p className="demo-note">Selected rows: {selectedCount}</p>
      <DataTable title="Hook component" columns={columns} data={dessertRows} selectableRows onSelectedRowsChange={handleSelection} />
    </div>
  );
}

function UiTableDemo({ onLog }: { onLog: LogFn }) {
  const [rows, setRows] = useState(dessertRows);
  const [selectedRows, setSelectedRows] = useState<DessertRow[]>([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const actions = (
    <button className="mini-button" onClick={() => onLog('UI action: add row')} type="button">
      Add
    </button>
  );

  const contextActions = selectedRows.length ? (
    <button
      className="mini-button danger"
      onClick={() => {
        setRows(currentRows => currentRows.filter(row => !selectedRows.some(selected => selected.id === row.id)));
        setSelectedRows([]);
        setToggleCleared(previous => !previous);
        onLog('UI table bulk delete');
      }}
      type="button"
    >
      Delete
    </button>
  ) : null;

  return (
    <div className="ui-card-shell">
      <DataTable
        title="UI library table"
        columns={dessertColumns}
        data={rows}
        defaultSortFieldId={1}
        selectableRows
        highlightOnHover
        actions={actions}
        contextActions={contextActions}
        sortIcon={<span className="inline-sort-icon">↓</span>}
        clearSelectedRows={toggleCleared}
        onSelectedRowsChange={state => {
          setSelectedRows(state.selectedRows);
          onLog(`UI table selected ${state.selectedCount} row(s)`);
        }}
        pagination
        expandableRows
        expandableRowsComponent={({ data }) => (
          <div className="expanded-panel">
            <strong>{data.name}</strong>
            <p>{data.type} dessert with {data.calories} calories.</p>
          </div>
        )}
      />
    </div>
  );
}

function UiPaginationDemo({ onLog }: { onLog: LogFn }) {
  return (
    <DataTable
      title="Custom pagination component"
      columns={movieColumns}
      data={movieRows}
      pagination
      paginationComponent={props => (
        <CustomPaginationBar
          {...props}
          onChangePage={(page, totalRows) => {
            props.onChangePage(page, totalRows);
            onLog(`Custom pagination changed to page ${page}`);
          }}
          onChangeRowsPerPage={(rowsPerPage, currentPage) => {
            props.onChangeRowsPerPage(rowsPerPage, currentPage);
            onLog(`Custom pagination rows per page ${rowsPerPage}`);
          }}
        />
      )}
    />
  );
}

function UiProgressDemo({ onLog }: { onLog: LogFn }) {
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPending(false);
      onLog('UI progress resolved');
    }, 1400);

    return () => window.clearTimeout(timer);
  }, [onLog]);

  return (
    <DataTable
      title="Custom progress component"
      columns={movieColumns}
      data={movieRows}
      progressPending={pending}
      progressComponent={<LinearLoader />}
      persistTableHead
      pagination
    />
  );
}

function FixedHeaderDemo() {
  return (
    <DataTable
      title="Fixed header"
      columns={movieColumns}
      data={movieRows}
      fixedHeader
      fixedHeaderScrollHeight="280px"
      pagination
    />
  );
}

function renderSelectedDemo(demoId: string, onLog: LogFn): ReactNode {
  switch (demoId) {
    case 'kitchen-sink':
      return <KitchenSinkDemo onLog={onLog} />;
    case 'filtering':
      return <FilteringDemo onLog={onLog} />;
    case 'export-csv':
      return <ExportCsvDemo onLog={onLog} />;
    case 'sorting-basic':
      return <SortingBasicDemo onLog={onLog} />;
    case 'sorting-remote':
      return <SortingRemoteDemo onLog={onLog} />;
    case 'sorting-custom':
      return <SortingCustomDemo />;
    case 'sorting-custom-column':
      return <SortingCustomColumnDemo />;
    case 'pagination-basic':
      return <PaginationBasicDemo />;
    case 'pagination-options':
      return <PaginationOptionsDemo />;
    case 'pagination-remote':
      return <PaginationRemoteDemo onLog={onLog} />;
    case 'selectable-basic':
      return <SelectableBasicDemo onLog={onLog} />;
    case 'selectable-preselected':
      return <SelectablePreselectedDemo />;
    case 'selectable-predisabled':
      return <SelectablePredisabledDemo />;
    case 'selectable-manage':
      return <SelectableManageDemo onLog={onLog} />;
    case 'expandable-basic':
      return <ExpandableBasicDemo onLog={onLog} />;
    case 'expandable-preexpanded':
      return <ExpandablePreexpandedDemo />;
    case 'expandable-predisabled':
      return <ExpandablePredisabledDemo />;
    case 'columns-delayed':
      return <DelayedColumnsDemo onLog={onLog} />;
    case 'columns-omit':
      return <ColumnsOmitDemo />;
    case 'columns-omit-dynamic':
      return <ColumnsOmitDynamicDemo onLog={onLog} />;
    case 'columns-reorder':
      return <ColumnsReorderDemo onLog={onLog} />;
    case 'columns-hide-resize':
      return <ColumnsHideOnResizeDemo />;
    case 'columns-custom-cells':
      return <ColumnsCustomCellsDemo onLog={onLog} />;
    case 'columns-static-styling':
      return <ColumnsStaticStylingDemo />;
    case 'columns-conditional-styling':
      return <ColumnsConditionalStylingDemo />;
    case 'conditional-rows':
      return <ConditionalRowsDemo />;
    case 'loading-basic':
      return <LoadingBasicDemo onLog={onLog} />;
    case 'loading-custom':
      return <LoadingCustomDemo onLog={onLog} />;
    case 'theming-builtin':
      return <ThemingBuiltinDemo onLog={onLog} />;
    case 'theming-custom':
      return <ThemingCustomDemo />;
    case 'styles-grid':
      return <CompactGridDemo />;
    case 'styles-gsheets':
      return <GoogleSheetsDemo onLog={onLog} />;
    case 'performance-classic':
      return <ClassicPerformanceTable onLog={onLog} />;
    case 'performance-hook':
      return <HookPerformanceDemo onLog={onLog} />;
    case 'ui-table':
      return <UiTableDemo onLog={onLog} />;
    case 'ui-pagination':
      return <UiPaginationDemo onLog={onLog} />;
    case 'ui-progress':
      return <UiProgressDemo onLog={onLog} />;
    case 'headers-fixed':
      return <FixedHeaderDemo />;
    default:
      return <SortingBasicDemo onLog={onLog} />;
  }
}

export function App({ reactLine, packageLine, docsPath }: AppProps) {
  const [selectedDemo, setSelectedDemo] = useState('kitchen-sink');
  const [logs, setLogs] = useState<string[]>(() => [stamp(`React ${reactLine} docs ready.`)]);

  const pushLog = useCallback((message: string) => {
    setLogs(previous => [stamp(message), ...previous].slice(0, 12));
  }, []);

  const selectedMeta = DEMO_BY_ID[selectedDemo];

  return (
    <div className="shell">
      <section className="hero">
        <div className="hero-card">
          <span className="badge">React {reactLine} • package {packageLine}</span>
          <h1>@stackline/react-data-table-component</h1>
          <p>
            A maintained React data table component with the full example tree rebuilt in versioned docs:
            sorting, pagination, selection, expansion, custom styles, performance patterns, and UI-library
            integrations for every maintained React line.
          </p>
          <div className="feature-grid">
            <div className="feature">
              <strong>Story parity</strong>
              The classic Storybook example tree is mapped into versioned docs instead of a flat short list.
            </div>
            <div className="feature">
              <strong>Declarative columns</strong>
              Keep selectors, custom cells, row actions, and sort rules in plain objects.
            </div>
            <div className="feature">
              <strong>Real workflows</strong>
              Filtering, selection management, remote pagination, theming, and loading states all stay visible.
            </div>
            <div className="feature">
              <strong>Versioned docs</strong>
              React 18 and React 19 keep their own docs build so the published package line and demo stay aligned.
            </div>
          </div>
          <div className="cta-row">
            <a className="btn" href="#examples">Explore examples</a>
            <a className="btn secondary" href="https://github.com/alexandroit/react-data-table-component#readme">README</a>
          </div>
        </div>
        <div className="hero-card hero-setup">
          <h2>Setup in 3 steps</h2>
          <div className="step">
            <div className="step-num">1</div>
            <div>
              <strong>Install</strong>
              <pre>{INSTALL_CODE}</pre>
            </div>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <div>
              <strong>Define columns</strong>
              <pre>{SETUP_CODE}</pre>
            </div>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <div>
              <strong>Render the table</strong>
              <pre>{RENDER_CODE}</pre>
            </div>
          </div>
        </div>
      </section>

      <section className="layout">
        <div className="panels">
          <section className="panel" id="examples">
            <div className="panel-header">
              <h2>Example explorer</h2>
              <p>
                This gallery rebuilds the original Storybook tree inside a single versioned docs shell, so the demos
                remain easy to browse on both desktop and mobile while still covering the full surface area.
              </p>
            </div>

            <div className="example-explorer">
              <aside className="demo-nav">
                {Object.entries(DEMO_GROUPS).map(([category, demos]) => (
                  <section className="demo-group" key={category}>
                    <h3>{category}</h3>
                    <div className="demo-list">
                      {demos.map(demo => (
                        <button
                          className={`demo-link${demo.id === selectedDemo ? ' active' : ''}`}
                          key={demo.id}
                          onClick={() => {
                            setSelectedDemo(demo.id);
                            pushLog(`Opened demo: ${demo.category} / ${demo.title}`);
                          }}
                          type="button"
                        >
                          {demo.title}
                        </button>
                      ))}
                    </div>
                  </section>
                ))}
              </aside>

              <div className="demo-stage">
                <div className="demo-stage-header">
                  <div className="demo-breadcrumb">
                    <span className="meta-pill">{selectedMeta.category}</span>
                    <span className="meta-pill light">{selectedMeta.title}</span>
                  </div>
                  <h3>{selectedMeta.title}</h3>
                  <p>{selectedMeta.summary}</p>
                </div>
                <pre className="code">{selectedMeta.code}</pre>
                <div className="table-host">{renderSelectedDemo(selectedDemo, pushLog)}</div>
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-header">
              <h2>API reference</h2>
              <p>
                These props and hooks show up repeatedly across the story tree and tend to be the levers teams reach
                for in production dashboards.
              </p>
            </div>
            <div className="api-table">
              <div className="api-row">
                <strong>columns</strong>
                <span>Selectors, custom cells, column visibility, breakpoints, reordering, and per-column sort behavior.</span>
              </div>
              <div className="api-row">
                <strong>data</strong>
                <span>The current row collection for the active table view, whether local or server-controlled.</span>
              </div>
              <div className="api-row">
                <strong>pagination / paginationServer / paginationComponent</strong>
                <span>Choose client pagination, remote pagination, or a custom footer component without changing the table body.</span>
              </div>
              <div className="api-row">
                <strong>selectableRows / contextActions</strong>
                <span>Drive bulk-selection workflows, preselection, disabled rows, and destructive actions from React state.</span>
              </div>
              <div className="api-row">
                <strong>expandableRows</strong>
                <span>Render richer row detail panels and control which rows start expanded or stay disabled.</span>
              </div>
              <div className="api-row">
                <strong>sortFunction / sortServer</strong>
                <span>Pick built-in sorting, one-off column comparators, or remote callbacks depending on where ordering lives.</span>
              </div>
              <div className="api-row">
                <strong>customStyles / createTheme</strong>
                <span>Move from minor polish to full visual systems without forking the core table internals.</span>
              </div>
              <div className="api-row">
                <strong>progressPending / progressComponent</strong>
                <span>Keep the shell steady while asynchronous rows or columns resolve in the background.</span>
              </div>
            </div>
          </section>
        </div>

        <aside className="sidebar">
          <section className="panel log-panel">
            <div className="log-header">
              <div>
                <h2>Event Log</h2>
                <p>Interact with the demos to watch sort, selection, pagination, and UI events appear here.</p>
              </div>
              <button className="clear-btn" onClick={() => setLogs([])} type="button">
                Clear
              </button>
            </div>
            <div className="log-list">
              {logs.length ? (
                logs.map(entry => (
                  <div className="log-item" key={entry}>
                    {entry}
                  </div>
                ))
              ) : (
                <div className="log-item">No events yet.</div>
              )}
            </div>
            <div className="release-card">
              <h3>Release line</h3>
              <p>
                This docs build is pinned to the same React release line and package version published on npm.
              </p>
              <div className="api-row">
                <strong>Package line</strong>
                <span>{packageLine}</span>
              </div>
              <div className="api-row">
                <strong>React compatibility</strong>
                <span>{reactLine}</span>
              </div>
              <div className="api-row">
                <strong>Docs path</strong>
                <span>{docsPath}/</span>
              </div>
              <div className="api-row">
                <strong>Pattern</strong>
                <span>versioned docs-src + compiled docs history</span>
              </div>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
