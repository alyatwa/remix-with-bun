import type {
	ActionFunction,
	LoaderFunction,
	LoaderFunctionArgs,
} from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { TaskDetails } from "~/components/TaskDetails";
import { Task } from "~/types";
import { checkTask, getTask, updateTask } from "~/utils/api";

export let loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
	const taskId = parseInt(params.taskId as string);
	const taskData = await getTask(taskId);
	if (!taskData) {
		throw new Response("Not Found", { status: 404 });
	}
	return taskData;
};

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	//update task action
	if (formData.get("formName") === "updateTask") {
		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		const checked = formData.get("checked") as unknown as boolean;
		const id = formData.get("id") as unknown as number;
		if (title && description) {
			await updateTask({ id, title, description, checked });
		} else {
			throw new Error("title or description may be null");
		}
		//update checkbox
	} else {
		const id = formData.get("id") as unknown as number;
		const checked = formData.get("checked") === "on";
		await checkTask(id, checked);
	}

	// Redirect or return a response
	return json({ success: true });
};

export default function TaskPage() {
	let taskData = useLoaderData() as Task;

	return <TaskDetails task={taskData} />;
}
