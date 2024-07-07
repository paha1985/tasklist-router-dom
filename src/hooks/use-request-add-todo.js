import { useState } from 'react';

export const useAddTodo = (refreshTodos, newTodo, setNewTodo) => {
	const [isCreating, setIsCreating] = useState(false);

	const AddTodo = () => {
		setIsCreating(true);
		fetch('http://localhost:3305/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				userId: 10,
				title: newTodo,
				completed: true,
			}),
		})
			.then((rawResponce) => rawResponce.json())
			.then((responce) => {
				console.log('Запись добавдена', responce);
				refreshTodos();
				setNewTodo('');
			})
			.finally(setIsCreating(false));
	};

	return { isCreating, AddTodo };
};
