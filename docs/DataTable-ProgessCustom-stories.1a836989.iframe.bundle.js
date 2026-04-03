"use strict";(self.webpackChunk_revivejs_react_data_table_component=self.webpackChunk_revivejs_react_data_table_component||[]).push([[6708],{"./stories/DataTable/ProgessCustom.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Custom:()=>Custom,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_constants_sampleMovieData__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./stories/constants/sampleMovieData.js"),_src_index__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/index.ts");const rotate360=styled_components__WEBPACK_IMPORTED_MODULE_1__.i7`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`,Spinner=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.div`
    margin: 16px;
    animation: ${rotate360} 1s linear infinite;
    transform: translateZ(0);
    border-top: 2px solid grey;
    border-right: 2px solid grey;
    border-bottom: 2px solid grey;
    border-left: 4px solid black;
    background: transparent;
    width: 80px;
    height: 80px;
    border-radius: 50%;
`,columns=[{name:"Title",selector:row=>row.title,sortable:!0},{name:"Director",selector:row=>row.director,sortable:!0},{name:"Year",selector:row=>row.year,sortable:!0}],CustomLoader=()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{style:{padding:"24px"}},react__WEBPACK_IMPORTED_MODULE_0__.createElement(Spinner,null),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",null,"Fancy Loader...")),Custom=()=>{const[pending,setPending]=react__WEBPACK_IMPORTED_MODULE_0__.useState(!0),[rows,setRows]=react__WEBPACK_IMPORTED_MODULE_0__.useState([]);return react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{const timeout=setTimeout(()=>{setRows(_constants_sampleMovieData__WEBPACK_IMPORTED_MODULE_2__.A),setPending(!1)},2e3);return()=>clearTimeout(timeout)},[]),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_src_index__WEBPACK_IMPORTED_MODULE_3__.Ay,{title:"Movie List",columns,data:rows,progressPending:pending,progressComponent:react__WEBPACK_IMPORTED_MODULE_0__.createElement(CustomLoader,null),pagination:!0})},__WEBPACK_DEFAULT_EXPORT__={title:"Loading/Custom",component:Custom},__namedExportsOrder=["Custom"];Custom.parameters={...Custom.parameters,docs:{...Custom.parameters?.docs,source:{originalSource:'() => {\n  const [pending, setPending] = React.useState(true);\n  const [rows, setRows] = React.useState([]);\n  React.useEffect(() => {\n    const timeout = setTimeout(() => {\n      setRows(data);\n      setPending(false);\n    }, 2000);\n    return () => clearTimeout(timeout);\n  }, []);\n  return <DataTable title="Movie List" columns={columns} data={rows} progressPending={pending} progressComponent={<CustomLoader />} pagination />;\n}',...Custom.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=DataTable-ProgessCustom-stories.1a836989.iframe.bundle.js.map