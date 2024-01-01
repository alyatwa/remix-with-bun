import { create } from "zustand";
import { Task } from "./types";
import { createTask, removeTask } from "./utils/api";

interface TaskState {
	currentTask: Task | null;
	setCurrentTask: (task: Task) => void;
	tasks: Task[];
	removeTask: (id: number) => void;
	setTasks: (tasks: Task[]) => void;
	addTask: (task: Partial<Task>) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
	tasks: [],
	currentTask: null,
	setTasks: (tasks: Task[]) => set({ tasks }),
	removeTask: async (id) => {
		await removeTask(id);
		set((state) => ({
			tasks: state.tasks.filter((task) => task.id !== id),
		}));
	},
	addTask: async (task) => {
		const newTask = await createTask(task);
		console.log("newTask:", newTask);
		set((state) => ({ tasks: [...state.tasks, newTask] }));
	},
	setCurrentTask: (task) => {
		set((state) => ({ currentTask: task }));
	},
}));
