import styles from './app.module.css';
import { React, useState } from 'react';
import { useAddTodo, useGetTodo } from './hooks/index.js';
import { Link } from 'react-router-dom';

const TaskList = () => {
	const [newTodo, setNewTodo] = useState('');
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const [search, setSearch] = useState('');
	const [sorted, setSorted] = useState(false);

	const refreshTodos = () => {
		setRefreshTodosFlag(!refreshTodosFlag);
	};

	const { isCreating, AddTodo } = useAddTodo(refreshTodos, newTodo, setNewTodo);

	const { isLoading, todos } = useGetTodo(refreshTodosFlag, sorted, search);

	const onNewTodoChange = ({ target }) => {
		setNewTodo(target.value);
	};

	const onSearchChange = ({ target }) => {
		setSearch(target.value);
		refreshTodos();
	};

	const sortTodo = () => {
		setSorted(!sorted);
		refreshTodos();
	};
	return (
		<div className={styles.dashboard}>
			<div className={styles.header}>
				<input
					type="text"
					placeholder="Поиск..."
					value={search}
					onChange={onSearchChange}
				/>
				<button onClick={sortTodo}>Сортировка</button>
				<div>
					<input
						type="text"
						placeholder="Добавить новое дело"
						value={newTodo}
						onChange={onNewTodoChange}
					/>
					<button disabled={isCreating || !newTodo} onClick={AddTodo}>
						Добавить
					</button>
				</div>
			</div>
			<div className={styles.todos}>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					todos.map(({ id, title }) => (
						<div key={id} style={{ display: 'flex' }}>
							<div className={styles.truncate}>
								<Link to={`tasks/${id}`}>{title}</Link>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default TaskList;
