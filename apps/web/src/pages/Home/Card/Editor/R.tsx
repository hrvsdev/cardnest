import type { FC } from "react";
import { FormEvent, memo, useState } from "react";

import { atom, PrimitiveAtom, useAtom } from "jotai";

type Todo = {
	title: string;
	completed: boolean;
};

type Props = { todoAtom: PrimitiveAtom<Todo>; removeTodo: (todoAtom: PrimitiveAtom<Todo>) => void };

function TodoItem({ todoAtom, removeTodo }: Props) {
	const [item, setItem] = useAtom(todoAtom);

	const toggleCompleted = () => {
		setItem((prev) => {
			return { ...prev, completed: !prev.completed };
		});
	};

	const remove = () => {
		removeTodo(todoAtom);
	};

	return (
		<li>
			<label>
				<input type="checkbox" checked={item.completed} onChange={toggleCompleted} />
				<span style={{ textDecoration: item.completed ? "line-through" : "" }}>{item.title}</span>
				{item.completed && <button onClick={remove}>Remove</button>}
			</label>
		</li>
	);
}

const MemoTodoItem = memo(TodoItem);

const todoAtomsAtom = atom<PrimitiveAtom<Todo>[]>([]);

const TodoList: FC = () => {
	const [title, setTitle] = useState("");
	const [todoAtoms, setTodos] = useAtom(todoAtomsAtom);

	const addTodo = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const todoAtom = atom<Todo>({ title, completed: false });
		setTodos((prev) => {
			return [...prev, todoAtom];
		});
		setTitle("");
	};

	const removeTodo = (todoAtom: PrimitiveAtom<Todo>) => {
		setTodos((prev) => prev.filter((item) => item !== todoAtom));
	};

	return (
		<ul>
			{todoAtoms.map((todoAtom) => (
				<MemoTodoItem key={String(todoAtom)} todoAtom={todoAtom} removeTodo={removeTodo} />
			))}
			<li>
				<form onSubmit={addTodo}>
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Enter title..."
					/>
				</form>
			</li>
		</ul>
	);
};

const serializeAtom = atom(
	null,
	(
		get,
		set,
		action: { type: "serialize" | "deserialize"; callback?: (args: string) => void; value?: string }
	) => {
		if (action.type === "serialize") {
			const obj = {
				todos: get(todoAtomsAtom).map(get)
			};
			action.callback?.(JSON.stringify(obj));
		} else if (action.type === "deserialize") {
			const obj = JSON.parse(action?.value ?? "");
			// needs error handling and type checking
			set(
				todoAtomsAtom,
				obj.todos.map((todo: Todo) => atom(todo))
			);
		}
	}
);

const Persist: FC = () => {
	const [, dispatch] = useAtom(serializeAtom);
	const save = () => {
		dispatch({
			type: "serialize",
			callback: (value) => {
				localStorage.setItem("serializedTodos", value);
			}
		});
	};
	const load = () => {
		const value = localStorage.getItem("serializedTodos");
		if (value) {
			dispatch({ type: "deserialize", value });
		}
	};
	return (
		<div>
			<button onClick={save}>Save to localStorage</button>
			<button onClick={load}>Load from localStorage</button>
		</div>
	);
};

const App: FC = () => (
	<>
		<TodoList />
		<Persist />
	</>
);

export default App;
