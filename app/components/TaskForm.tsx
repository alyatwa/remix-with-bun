import { Form } from "@remix-run/react";
import { Task } from "~/types";

const TaskForm = ({
	task = {
		id: Date.now() + Math.floor(Math.random() * 1000),
		description: "",
		title: "",
		checked: false
	},
	update,
}: {
	task?: Task;
	update?: boolean;
}) => {
	return (
		<Form
			method="post"
			className="w-full max-w-sm mx-auto px-4 py-2"
		>
		    <input type="hidden" name="formName" value={update? "updateTask":"addTask"} />
			<div className="flex items-center border-b-2 border-teal-500 py-2">
				<input type="hidden" name="id" value={task.id} />
				<input
					type="text"
					name="title"
					id="title"
					defaultValue={task.title}
					className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
					placeholder="Enter title"
				/>
				<input
					type="text"
					name="description"
					id="description"
					defaultValue={task.description}
					className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
					placeholder="Enter description"
				/>
				<button
					type="submit"
					className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
				>
					{update ? "Save" : "Add"}
				</button>
			</div>
		</Form>
	);
};
export default TaskForm;
