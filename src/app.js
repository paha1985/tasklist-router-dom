import React from 'react';
import Task from './Task.js';
import NotFound from './NotFound.js';
import { Route, Routes } from 'react-router-dom';
import TaskList from './TaskList.js';

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<TaskList />} />
			<Route path="/tasks/:id" element={<Task />}></Route>
			<Route path="/404" element={<NotFound />}></Route>
		</Routes>
	);
};
