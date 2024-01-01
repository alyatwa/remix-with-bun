// app/components/TaskList.tsx
import { useEffect } from "react";
import { useTaskStore } from "~/store";
import { Task } from "~/types";
import { TaskItem } from "./TaskItem";

export function TaskList({ tasks }: { tasks: Task[] }) {
	const { setTasks, tasks: tasksData } = useTaskStore();
	useEffect(() => {
		setTasks(tasks);
	}, [tasks]);

	return (
		<ul className="divide-y divide-gray-200 px-4">
			{tasksData.map((task) => (
				<TaskItem key={task.id} task={task} />
			))}
		</ul>
	);
}
