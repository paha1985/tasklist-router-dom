export const useDeleteTodo = (
	refreshTodos,
	id,
	setModalActive,
	setIsDeleting,
	navigate,
) => {
	const DeleteTodo = () => {
		fetch(`http://localhost:3305/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponce) => rawResponce.json())
			.then((responce) => {
				console.log('Запись удалена', responce);
				refreshTodos();
				setModalActive(false);
				setIsDeleting(false);
			})
			.finally(navigate('/'));
	};

	return DeleteTodo;
};
