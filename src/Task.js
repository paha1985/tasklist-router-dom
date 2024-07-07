import { useState } from 'react';
import React from 'react';
import styles from './app.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from './modal.js';
import { useUpdateTodo, useDeleteTodo } from './hooks/index.js';

const Task = () => {
	const [taskTitle, setTaskTitle] = useState('');
	const [isUpdating, setIsUpdating] = useState(false);
	const [modalActive, setModalActive] = useState(false);
	const [curTodoId, setCurTodoId] = useState('');
	const [curTodoTitle, setCurTodoTitle] = useState('');
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const navigate = useNavigate();

	const fetchTodos = (id) => {
		fetch('http://localhost:3305/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				const arr = loadedTodos.filter((x) => x.id == id);

				let title = '';
				if (arr.length > 0) {
					title = arr[0].title;
				} else {
					navigate('/404');
				}
				setTaskTitle(title);
			});
	};

	const refreshTodos = () => {
		setRefreshTodosFlag(!refreshTodosFlag);
	};

	const UpdateTodo = useUpdateTodo(
		refreshTodos,
		curTodoId,
		curTodoTitle,
		setModalActive,
		setIsUpdating,
	);

	const DeleteTodo = useDeleteTodo(
		refreshTodos,
		curTodoId,
		setModalActive,
		setIsDeleting,
		navigate,
	);

	const setUpdatedTodoChange = ({ target }) => {
		setCurTodoTitle(target.value);
	};

	const params = useParams();
	fetchTodos(params.id);
	return (
		<div className={styles['task']}>
			<div className={styles.task_header}>
				<button
					onClick={() => {
						navigate(-1);
					}}
				>
					Назад
				</button>
			</div>
			<div className={styles.task_body}>{taskTitle}</div>
			<div className={styles.task_footer}>
				<button
					onClick={() => {
						setIsUpdating(true);
						setModalActive(true);
						setCurTodoId(params.id);
						setCurTodoTitle(taskTitle);
					}}
				>
					Редактировать
				</button>
				<button
					onClick={() => {
						setIsDeleting(true);
						setModalActive(true);
						setCurTodoId(params.id);
					}}
				>
					Удалить
				</button>
			</div>
			<Modal active={modalActive && isUpdating} setActive={setModalActive}>
				<input type="text" value={curTodoTitle} onChange={setUpdatedTodoChange} />
				<div>
					<button onClick={UpdateTodo}>Сохранить</button>
					<button
						onClick={() => {
							setModalActive(false);
							setIsUpdating(false);
						}}
					>
						Закрыть
					</button>
				</div>
			</Modal>
			<Modal active={modalActive && isDeleting} setActive={setModalActive}>
				<div>Удалить запись?</div>
				<div>
					<button onClick={DeleteTodo}>Удалить</button>
					<button
						onClick={() => {
							setModalActive(false);
							setIsDeleting(false);
						}}
					>
						Закрыть
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default Task;
