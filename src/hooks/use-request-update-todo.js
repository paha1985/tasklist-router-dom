export const useUpdateTodo = (refreshTodos, id, title, setModalActive, setIsUpdating) => {
	const UpdateTodo = () => {
		fetch(`http://localhost:3305/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				userId: 10,
				title: title,
				completed: true,
			}),
		})
			.then((rawResponce) => rawResponce.json())
			.then((responce) => {
				console.log('Запись отредактирована', responce);
				refreshTodos();
				setModalActive(false);
			})
			.finally(setIsUpdating(false));
	};

	return UpdateTodo;
};
