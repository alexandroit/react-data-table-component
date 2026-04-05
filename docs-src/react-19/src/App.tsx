import { useMemo, useState, type ReactNode } from 'react';
import DataTable, {
  createTheme,
  type ConditionalStyles,
  type TableColumn
} from '@revivejs/react-data-table-component';

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

const INSTALL_CODE = `npm install @revivejs/react-data-table-component styled-components`;

const SETUP_CODE = `import DataTable, { type TableColumn } from '@revivejs/react-data-table-component';\n\nconst columns: TableColumn<Row>[] = [\n  { name: 'Name', selector: row => row.name, sortable: true }\n];`;

const RENDER_CODE = `<DataTable columns={columns} data={rows} pagination />`;

const BASIC_CODE = `const movieColumns = [\n  { name: 'Title', selector: row => row.title, sortable: true },\n  { name: 'Year', selector: row => row.year, sortable: true, right: true },\n  { name: 'Score', selector: row => row.score, sortable: true, right: true }\n];\n\n<DataTable\n  columns={movieColumns}\n  data={catalogRows}\n  pagination\n  highlightOnHover\n/>`;

const FILTER_CODE = `const [filterText, setFilterText] = useState('');\n\nconst filteredRows = useMemo(\n  () => catalogRows.filter(row => row.title.toLowerCase().includes(filterText.toLowerCase())),\n  [filterText]\n);\n\n<DataTable\n  columns={movieColumns}\n  data={filteredRows}\n  subHeader\n  subHeaderComponent={<input value={filterText} onChange={...} />}\n/>`;

const SELECT_CODE = `<DataTable\n  columns={teamColumns}\n  data={teamRows}\n  selectableRows\n  selectableRowsHighlight\n  onSelectedRowsChange={state => console.log(state.selectedRows)}\n/>`;

const EXPAND_CODE = `const ExpandedMovie = ({ data }) => (\n  <div>\n    <strong>{data.title}</strong>\n    <p>{data.synopsis}</p>\n  </div>\n);\n\n<DataTable\n  columns={movieColumns}\n  data={catalogRows}\n  expandableRows\n  expandableRowsComponent={ExpandedMovie}\n/>`;

const REMOTE_CODE = `const [page, setPage] = useState(1);\nconst [rowsPerPage, setRowsPerPage] = useState(5);\n\nconst visibleRows = useMemo(() => {\n  const start = (page - 1) * rowsPerPage;\n  return accountRows.slice(start, start + rowsPerPage);\n}, [page, rowsPerPage]);\n\n<DataTable\n  columns={accountColumns}\n  data={visibleRows}\n  pagination\n  paginationServer\n  paginationTotalRows={accountRows.length}\n  onChangePage={setPage}\n  onChangeRowsPerPage={(nextRows, nextPage) => {\n    setRowsPerPage(nextRows);\n    setPage(nextPage);\n  }}\n/>`;

const THEME_CODE = `createTheme('reviveSlate', customTheme, 'dark');\n\n<DataTable\n  columns={accountColumns}\n  data={accountRows}\n  theme="reviveSlate"\n  dense\n  conditionalRowStyles={conditionalRowStyles}\n/>`;

const ACTION_CODE = `const actionColumns = [\n  ...accountColumns,\n  {\n    name: 'Actions',\n    button: true,\n    cell: row => <button onClick={() => openAccount(row.id)}>Open</button>\n  }\n];`;

type AppProps = {
  reactLine: string;
  packageLine: string;
  docsPath: string;
};

type DemoCardProps = {
  title: string;
  description: string;
  code: string;
  full?: boolean;
  children: ReactNode;
};

type MovieRow = {
  id: number;
  title: string;
  year: number;
  score: number;
  status: 'Released' | 'In production' | 'Delayed';
  genre: string;
  director: string;
  revenue: string;
  synopsis: string;
};

type TeamRow = {
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

const catalogRows: MovieRow[] = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: 1988,
    score: 82,
    status: 'Released',
    genre: 'Comedy',
    director: 'Tim Burton',
    revenue: '$84M',
    synopsis: 'A thin fantasy comedy catalog row used for a basic sortable example.'
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: 1984,
    score: 87,
    status: 'Released',
    genre: 'Comedy',
    director: 'Ivan Reitman',
    revenue: '$296M',
    synopsis: 'A reliable sample row with enough text to make expandable content useful.'
  },
  {
    id: 3,
    title: 'Arrival',
    year: 2016,
    score: 94,
    status: 'Released',
    genre: 'Sci-Fi',
    director: 'Denis Villeneuve',
    revenue: '$203M',
    synopsis: 'Modern, highly rated, and short enough to keep the table compact.'
  },
  {
    id: 4,
    title: 'Dune: Part Two',
    year: 2024,
    score: 92,
    status: 'Released',
    genre: 'Sci-Fi',
    director: 'Denis Villeneuve',
    revenue: '$711M',
    synopsis: 'Used to show sorting and filtering against contemporary release data.'
  },
  {
    id: 5,
    title: 'Mission Control',
    year: 2026,
    score: 71,
    status: 'In production',
    genre: 'Drama',
    director: 'A. Rivera',
    revenue: 'TBD',
    synopsis: 'An in-production row demonstrates mixed status values in the basic example.'
  },
  {
    id: 6,
    title: 'North Harbour',
    year: 2025,
    score: 66,
    status: 'Delayed',
    genre: 'Thriller',
    director: 'M. Li',
    revenue: 'TBD',
    synopsis: 'A delayed title gives the conditional styling demo another branch to render.'
  },
  {
    id: 7,
    title: 'Ratatouille',
    year: 2007,
    score: 96,
    status: 'Released',
    genre: 'Animation',
    director: 'Brad Bird',
    revenue: '$623M',
    synopsis: 'Friendly content for showing hover, row click, and compact filtering examples.'
  },
  {
    id: 8,
    title: 'Looper',
    year: 2012,
    score: 84,
    status: 'Released',
    genre: 'Sci-Fi',
    director: 'Rian Johnson',
    revenue: '$176M',
    synopsis: 'Useful in selection demos because the row identity stays stable across sorting.'
  }
];

const allAccounts: TeamRow[] = [
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

function stamp(message: string) {
  return `${new Date().toLocaleTimeString('en-US', { hour12: false })}  ${message}`;
}

function DemoCard({ title, description, code, full = false, children }: DemoCardProps) {
  return (
    <section className={`demo-card${full ? ' demo-card-full' : ''}`}>
      <div className="demo-header">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      <pre className="code">{code}</pre>
      <div className="table-host">{children}</div>
    </section>
  );
}

function ExpandedMovie({ data }: { data: MovieRow }) {
  return (
    <div className="expanded-panel">
      <strong>{data.title}</strong>
      <p>{data.synopsis}</p>
      <div className="expanded-meta">
        <span>{data.genre}</span>
        <span>{data.director}</span>
        <span>{data.revenue}</span>
      </div>
    </div>
  );
}

export function App({ reactLine, packageLine, docsPath }: AppProps) {
  const [logs, setLogs] = useState<string[]>(() => [stamp(`React ${reactLine} docs ready.`)]);
  const [filterText, setFilterText] = useState('');
  const [remotePage, setRemotePage] = useState(1);
  const [remoteRowsPerPage, setRemoteRowsPerPage] = useState(5);

  const pushLog = (message: string) => {
    setLogs(previous => [stamp(message), ...previous].slice(0, 10));
  };

  const filteredCatalog = useMemo(() => {
    const query = filterText.trim().toLowerCase();
    if (!query) {
      return catalogRows;
    }

    return catalogRows.filter(row =>
      [row.title, row.genre, row.director, row.status].some(value => value.toLowerCase().includes(query))
    );
  }, [filterText]);

  const visibleAccounts = useMemo(() => {
    const start = (remotePage - 1) * remoteRowsPerPage;
    return allAccounts.slice(start, start + remoteRowsPerPage);
  }, [remotePage, remoteRowsPerPage]);

  const movieColumns = useMemo<TableColumn<MovieRow>[]>(() => [
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
      grow: 2
    },
    {
      name: 'Year',
      selector: row => row.year,
      sortable: true,
      right: true,
      width: '96px'
    },
    {
      name: 'Score',
      selector: row => row.score,
      sortable: true,
      right: true,
      width: '96px'
    },
    {
      name: 'Status',
      cell: row => <span className={`status-pill status-${row.status.toLowerCase().replace(/\s+/g, '-')}`}>{row.status}</span>,
      sortable: true,
      sortField: 'status'
    }
  ], []);

  const teamColumns = useMemo<TableColumn<TeamRow>[]>(() => [
    {
      name: 'Customer',
      selector: row => row.customer,
      sortable: true,
      grow: 2
    },
    {
      name: 'Owner',
      selector: row => row.owner,
      sortable: true
    },
    {
      name: 'Plan',
      selector: row => row.plan,
      sortable: true
    },
    {
      name: 'Seats',
      selector: row => row.seats,
      sortable: true,
      right: true,
      width: '88px'
    }
  ], []);

  const accountColumns = useMemo<TableColumn<TeamRow>[]>(() => [
    {
      name: 'Customer',
      selector: row => row.customer,
      sortable: true,
      grow: 2
    },
    {
      name: 'Region',
      selector: row => row.region,
      sortable: true
    },
    {
      name: 'MRR',
      selector: row => row.mrr,
      sortable: true,
      right: true,
      cell: row => `$${row.mrr.toLocaleString()}`
    },
    {
      name: 'Health',
      selector: row => row.health,
      sortable: true,
      cell: row => <span className={`health-pill health-${row.health.toLowerCase().replace(/\s+/g, '-')}`}>{row.health}</span>
    }
  ], []);

  const actionColumns = useMemo<TableColumn<TeamRow>[]>(() => [
    ...accountColumns,
    {
      name: 'Actions',
      button: true,
      allowOverflow: true,
      cell: row => (
        <button
          className="mini-button"
          onClick={() => {
            pushLog(`Open account: ${row.customer}`);
          }}
        >
          Open
        </button>
      )
    }
  ], [accountColumns]);

  const conditionalRowStyles = useMemo<ConditionalStyles<TeamRow>[]>(() => [
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
  ], []);

  const tableStyles = useMemo(() => ({
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
  }), []);

  return (
    <div className="shell">
      <section className="hero">
        <div className="hero-card">
          <span className="badge">React {reactLine} • package {packageLine}</span>
          <h1>@revivejs/react-data-table-component</h1>
          <p>
            A maintained React data table component for sortable grids, row selection,
            expandable content, remote pagination, and theme-driven product dashboards.
          </p>
          <div className="feature-grid">
            <div className="feature">
              <strong>Declarative columns</strong>
              Keep column definitions in plain objects and reuse them across pages and hooks.
            </div>
            <div className="feature">
              <strong>Table workflows</strong>
              Sorting, pagination, selection, expansion, and subheader filters work together.
            </div>
            <div className="feature">
              <strong>Theme ready</strong>
              Use built-in themes, register your own theme, or layer on custom style overrides.
            </div>
            <div className="feature">
              <strong>Versioned docs</strong>
              Each maintained React release line ships with its own docs build and demo path.
            </div>
          </div>
          <div className="cta-row">
            <a className="btn" href="#examples">See demos</a>
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
              <h2>Example gallery</h2>
              <p>
                These demos mirror the component patterns most teams need in production:
                sortable tables, filters, selection, expandable content, remote pagination,
                and themed account views.
              </p>
            </div>
            <div className="demo-grid">
              <DemoCard
                title="Basic sorting and pagination"
                description="Start with a compact, sortable catalog that works with zero adapters."
                code={BASIC_CODE}
              >
                <DataTable
                  columns={movieColumns}
                  data={catalogRows}
                  pagination
                  highlightOnHover
                  customStyles={tableStyles}
                  onSort={(column, direction) => {
                    pushLog(`Sorted ${String(column.name)} ${direction}`);
                  }}
                  onRowClicked={row => {
                    pushLog(`Row clicked: ${row.title}`);
                  }}
                />
              </DemoCard>

              <DemoCard
                title="Subheader filtering"
                description="Use a controlled search input in the built-in subheader to filter rows."
                code={FILTER_CODE}
              >
                <DataTable
                  columns={movieColumns}
                  data={filteredCatalog}
                  pagination
                  subHeader
                  customStyles={tableStyles}
                  subHeaderComponent={
                    <div className="control-row">
                      <input
                        className="filter-input"
                        type="search"
                        value={filterText}
                        placeholder="Filter by title, genre, director, or status"
                        onChange={event => {
                          setFilterText(event.target.value);
                          pushLog(`Filter updated: ${event.target.value || 'cleared'}`);
                        }}
                      />
                    </div>
                  }
                />
              </DemoCard>

              <DemoCard
                title="Selectable rows"
                description="Capture selected rows through the built-in callback without managing checkbox state yourself."
                code={SELECT_CODE}
              >
                <DataTable
                  columns={teamColumns}
                  data={allAccounts}
                  pagination
                  selectableRows
                  selectableRowsHighlight
                  customStyles={tableStyles}
                  onSelectedRowsChange={state => {
                    pushLog(`Selected ${state.selectedCount} account${state.selectedCount === 1 ? '' : 's'}`);
                  }}
                />
              </DemoCard>

              <DemoCard
                title="Expandable rows"
                description="Attach richer details without bloating the main row layout."
                code={EXPAND_CODE}
              >
                <DataTable
                  columns={movieColumns}
                  data={catalogRows}
                  pagination
                  expandableRows
                  customStyles={tableStyles}
                  expandableRowsComponent={ExpandedMovie}
                  onRowExpandToggled={(expanded, row) => {
                    pushLog(`${expanded ? 'Expanded' : 'Collapsed'} ${row.title}`);
                  }}
                />
              </DemoCard>

              <DemoCard
                title="Remote pagination pattern"
                description="Drive page and page-size state externally while still using the built-in pagination UI."
                code={REMOTE_CODE}
              >
                <DataTable
                  columns={accountColumns}
                  data={visibleAccounts}
                  pagination
                  paginationServer
                  paginationTotalRows={allAccounts.length}
                  customStyles={tableStyles}
                  onChangePage={page => {
                    setRemotePage(page);
                    pushLog(`Remote page changed to ${page}`);
                  }}
                  onChangeRowsPerPage={(rowsPerPage, page) => {
                    setRemoteRowsPerPage(rowsPerPage);
                    setRemotePage(page);
                    pushLog(`Remote page size ${rowsPerPage}`);
                  }}
                />
              </DemoCard>

              <DemoCard
                title="Themes and conditional styles"
                description="Combine a custom registered theme with conditional row styles to surface account health at a glance."
                code={THEME_CODE}
              >
                <DataTable
                  columns={accountColumns}
                  data={allAccounts}
                  pagination
                  dense
                  theme="reviveSlate"
                  customStyles={tableStyles}
                  conditionalRowStyles={conditionalRowStyles}
                />
              </DemoCard>

              <DemoCard
                title="Custom cells and row actions"
                description="Add row-level actions without giving up the built-in keyboard and pagination behavior."
                code={ACTION_CODE}
                full
              >
                <DataTable
                  columns={actionColumns}
                  data={allAccounts}
                  pagination
                  customStyles={tableStyles}
                />
              </DemoCard>
            </div>
          </section>

          <section className="panel">
            <div className="panel-header">
              <h2>API reference</h2>
              <p>These are the props most teams reach for when wiring the table into real dashboards.</p>
            </div>
            <div className="api-table">
              <div className="api-row">
                <strong>columns</strong>
                <span>Column definitions, selectors, custom cells, and sorting metadata.</span>
              </div>
              <div className="api-row">
                <strong>data</strong>
                <span>The row array rendered by the table for the current view.</span>
              </div>
              <div className="api-row">
                <strong>pagination / paginationServer</strong>
                <span>Use built-in paging for local data or control page state yourself for remote datasets.</span>
              </div>
              <div className="api-row">
                <strong>selectableRows / selectableRowsSingle</strong>
                <span>Enable multi-select or compact single-select workflows.</span>
              </div>
              <div className="api-row">
                <strong>expandableRows</strong>
                <span>Render richer row content in a collapsible secondary panel.</span>
              </div>
              <div className="api-row">
                <strong>conditionalRowStyles</strong>
                <span>Apply color and emphasis rules derived from row values.</span>
              </div>
              <div className="api-row">
                <strong>subHeader / subHeaderComponent</strong>
                <span>Inject filters, actions, or secondary controls above the grid.</span>
              </div>
              <div className="api-row">
                <strong>theme / customStyles</strong>
                <span>Use built-in themes or layer on CSS-in-JS overrides for product-specific polish.</span>
              </div>
              <div className="api-row">
                <strong>onSort / onSelectedRowsChange / onChangePage</strong>
                <span>Hook the table into analytics, remote APIs, and surrounding dashboard state.</span>
              </div>
            </div>
          </section>
        </div>

        <aside className="sidebar">
          <section className="panel log-panel">
            <div className="log-header">
              <div>
                <h2>Event Log</h2>
                <p>Interact with the demos to see sorting, selection, expansion, and paging callbacks appear here.</p>
              </div>
              <button
                className="clear-btn"
                onClick={() => {
                  setLogs([stamp('Log cleared.')]);
                }}
              >
                Clear
              </button>
            </div>
            <div className="log-list">
              {logs.map(entry => (
                <div className="log-item" key={entry}>
                  {entry}
                </div>
              ))}
            </div>
            <div className="release-card">
              <h3>Release line</h3>
              <p>This docs build is pinned to the published package and React line shown below.</p>
              <div className="meta-pill">Package line: {packageLine}</div>
              <div className="meta-pill">React compatibility: {reactLine}</div>
              <div className="meta-pill">Docs path: {docsPath}</div>
              <div className="meta-pill">Pattern: versioned docs-src + compiled docs history</div>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
