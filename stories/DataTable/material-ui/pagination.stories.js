import React from 'react';
import doc from './pagination.mdx';
import TablePagination from '@mui/material/TablePagination';
import DataTable from '../../../src/index';
import data from '../../constants/sampleMovieData';

const columns = [
	{
		name: 'Title',
		selector: row => row.title,
		sortable: true,
	},
	{
		name: 'Director',
		selector: row => row.director,
		sortable: true,
	},
	{
		name: 'Year',
		selector: row => row.year,
		sortable: true,
	},
];

export const CustomMaterialPagination = ({ rowsPerPage, rowCount, onChangePage, onChangeRowsPerPage, currentPage }) => (
	<TablePagination
		component="nav"
		count={rowCount}
		rowsPerPage={rowsPerPage}
		page={currentPage - 1}
		onPageChange={(_, page) => onChangePage(page + 1, rowCount)}
		onRowsPerPageChange={({ target }) => onChangeRowsPerPage(Number(target.value), currentPage)}
	/>
);

export function Pagination() {
	return (
		<DataTable
			title="Movie List"
			columns={columns}
			data={data}
			pagination
			paginationComponent={CustomMaterialPagination}
		/>
	);
}

export default {
	title: 'UI Library/Material UI/Pagination',
	component: Pagination,
	parameters: {
		docs: {
			page: doc,
		},
	},
};
