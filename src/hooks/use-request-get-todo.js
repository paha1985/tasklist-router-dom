import { useEffect, useState } from 'react';

export const useGetTodo = (refreshTodosFlag, sorted, search) => {
	const [isLoading, setIsLoading] = useState(true);
	const [todos, setTodos] = useState([]);
	useEffect(() => {
		setIsLoading(true);
		let filteredTodos = [];
		fetch('http://localhost:3305/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				if (search) {
					filteredTodos = loadedTodos.filter((todo) => {
						const lc = todo.title.toLowerCase();
						const filter = search.toLowerCase();
						return lc.includes(filter);
					});
					setTodos(
						sorted
							? filteredTodos.sort((a, b) => (a.title > b.title ? 1 : -1))
							: filteredTodos,
					);
				} else {
					setTodos(
						sorted
							? loadedTodos.sort((a, b) => (a.title > b.title ? 1 : -1))
							: loadedTodos,
					);
				}
			})
			.finally(() => setIsLoading(false));
	}, [refreshTodosFlag]);
	return { isLoading, todos };
};
