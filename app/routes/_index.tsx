import { json, useLoaderData } from "@remix-run/react";
import type {
	ActionFunction,
	LoaderFunction,
	MetaFunction,
} from "@remix-run/node";
import { TaskList } from "~/components/TaskList";
import { checkTask, createTask, getTasks } from "~/utils/api";
import { Task } from "~/types";
import TaskForm from "~/components/TaskForm";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export const loader: LoaderFunction = async () => {
	const tasks = await getTasks();
	return tasks;
};

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	//add task action
	if (formData.get("formName") === "addTask") {
		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		const id = formData.get("id") as unknown as number;
		if (title && description) {
			await createTask({ id, title, description, checked: false });
		} else {
			throw new Error("title or description may be null");
		}
		//update checkbox action
	} else if (formData.get("formName") === "updateCheckbox") {
		const id = formData.get("id") as unknown as number;
		const checked = formData.get('checked') === 'on'; 
		await checkTask( id, checked );
	}

	// Redirect or return a response
	return json({ success: true });
};

export default function Index() {
	const tasks = useLoaderData() as Task[];
	return (
		<div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
			<TaskForm />
			<TaskList tasks={tasks} />
		</div>
	);
}
