"use strict";(self.webpackChunk_revivejs_react_data_table_component=self.webpackChunk_revivejs_react_data_table_component||[]).push([[3768],{"./stories/DataTable/Filtering.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Filtering:()=>Filtering,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_faker_js_faker__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@faker-js/faker/dist/esm/index.mjs"),_shared_Button__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./stories/shared/Button.js"),_src_index__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/index.ts");const createUser=()=>({id:_faker_js_faker__WEBPACK_IMPORTED_MODULE_2__.Jb.string.uuid(),name:_faker_js_faker__WEBPACK_IMPORTED_MODULE_2__.Jb.internet.userName(),email:_faker_js_faker__WEBPACK_IMPORTED_MODULE_2__.Jb.internet.email(),address:_faker_js_faker__WEBPACK_IMPORTED_MODULE_2__.Jb.location.streetAddress(),bio:_faker_js_faker__WEBPACK_IMPORTED_MODULE_2__.Jb.lorem.sentence(),image:_faker_js_faker__WEBPACK_IMPORTED_MODULE_2__.Jb.image.avatar()}),fakeUsers=((numUsers=5)=>new Array(numUsers).fill(void 0).map(createUser))(2e3),TextField=styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay.input`
    height: 32px;
    width: 200px;
    border-radius: 3px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #e5e5e5;
    padding: 0 32px 0 16px;

    &:hover {
        cursor: pointer;
    }
`,ClearButton=(0,styled_components__WEBPACK_IMPORTED_MODULE_1__.Ay)(_shared_Button__WEBPACK_IMPORTED_MODULE_3__.A)`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 34px;
    width: 32px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`,FilterComponent=({filterText,onFilter,onClear})=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(TextField,{id:"search",type:"text",placeholder:"Filter By Name","aria-label":"Search Input",value:filterText,onChange:onFilter}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(ClearButton,{type:"button",onClick:onClear},"X")),columns=[{name:"Name",selector:row=>row.name,sortable:!0},{name:"Email",selector:row=>row.email,sortable:!0},{name:"Address",selector:row=>row.address,sortable:!0}],Filtering=()=>{const[filterText,setFilterText]=react__WEBPACK_IMPORTED_MODULE_0__.useState(""),[resetPaginationToggle,setResetPaginationToggle]=react__WEBPACK_IMPORTED_MODULE_0__.useState(!1),filteredItems=fakeUsers.filter(item=>item.name&&item.name.toLowerCase().includes(filterText.toLowerCase())),subHeaderComponentMemo=react__WEBPACK_IMPORTED_MODULE_0__.useMemo(()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(FilterComponent,{onFilter:e=>setFilterText(e.target.value),onClear:()=>{filterText&&(setResetPaginationToggle(!resetPaginationToggle),setFilterText(""))},filterText}),[filterText,resetPaginationToggle]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_src_index__WEBPACK_IMPORTED_MODULE_4__.Ay,{title:"Contact List",columns,data:filteredItems,pagination:!0,paginationResetDefaultPage:resetPaginationToggle,subHeader:!0,subHeaderComponent:subHeaderComponentMemo,selectableRows:!0,persistTableHead:!0})},__WEBPACK_DEFAULT_EXPORT__={title:"Examples/Filtering",component:Filtering},__namedExportsOrder=["Filtering"];Filtering.parameters={...Filtering.parameters,docs:{...Filtering.parameters?.docs,source:{originalSource:"() => {\n  const [filterText, setFilterText] = React.useState('');\n  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);\n  const filteredItems = fakeUsers.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));\n  const subHeaderComponentMemo = React.useMemo(() => {\n    const handleClear = () => {\n      if (filterText) {\n        setResetPaginationToggle(!resetPaginationToggle);\n        setFilterText('');\n      }\n    };\n    return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;\n  }, [filterText, resetPaginationToggle]);\n  return <DataTable title=\"Contact List\" columns={columns} data={filteredItems} pagination paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1\n  subHeader subHeaderComponent={subHeaderComponentMemo} selectableRows persistTableHead />;\n}",...Filtering.parameters?.docs?.source}}}},"./stories/shared/Button.js"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const ButtonStyle=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").Ay.button`
	background-color: #2979ff;
	border: none;
	color: white;
	padding: 8px 32px 8px 32px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	border-radius: 3px;

	&:hover {
		cursor: pointer;
	}
`,__WEBPACK_DEFAULT_EXPORT__=_ref=>{let{children,...rest}=_ref;return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ButtonStyle,rest,children)}}}]);
//# sourceMappingURL=DataTable-Filtering-stories.0497d736.iframe.bundle.js.map