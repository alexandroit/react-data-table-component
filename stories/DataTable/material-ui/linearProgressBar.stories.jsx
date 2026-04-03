import React from 'react';
import doc from './linearProgressBar.mdx';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import data from '../../constants/sampleMovieData';
import DataTable from '../../../src/index';

const LinearIndeterminate = () => {
	return (
		<Box sx={{ width: '100%', '& > * + *': { mt: 2 } }}>
			<LinearProgress />
		</Box>
	);
};

const columns = [
	{
		name: 'Title',
		selector: 'title',
		sortable: true,
	},
	{
		name: 'Director',
		selector: 'director',
		sortable: true,
	},
	{
		name: 'Year',
		selector: 'year',
		sortable: true,
	},
];

const ProgressStory = ({ progressPending, persistTableHead }) => {
	return (
		<DataTable
			title="Movie List"
			columns={columns}
			data={data}
			progressPending={progressPending}
			progressComponent={<LinearIndeterminate />}
			persistTableHead={persistTableHead}
			pagination
		/>
	);
};

const Template = args => <ProgressStory {...args} />;

export const Progress = Template.bind({});

Progress.args = {
	persistTableHead: false,
	progressPending: true,
};

export default {
	title: 'UI Library/Material UI/Progress',
	component: Progress,
	parameters: {
		docs: {
			page: doc,
		},
	},
};
