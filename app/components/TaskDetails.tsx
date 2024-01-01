import { Task } from "~/types";
import TaskForm from "./TaskForm";
import useTaskDetails from "~/hooks/useTaskDetails";
import { Form } from "@remix-run/react";

export function TaskDetails({ task }: { task: Task }) {
	const {
		_removeTask,
		toggleUpdate,
		toggleDescription,
		_task,
		isDescriptionVisible,
		isUpdateVisible,
	} = useTaskDetails({ task });

	return (
		<div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16 p-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<Form method="post">
						<input type="hidden" name="id" value={_task?.id} />
						<input type="hidden" name="formName" value="updateCheckbox" />
						<input
							id="task"
							defaultChecked={_task?.checked}
							name="task"
							type="checkbox"
							onChange={(event) => {
								event.target.form?.requestSubmit();
							  }}
							className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
						/>
					</Form>
					<label className=" select-none cursor-pointer ml-3 block text-gray-900">
						<span className="text-lg font-medium">{_task?.title}</span>
					</label>
				</div>

				<div className="flex flex-row gap-2 justify-end">
					<button
						onClick={toggleDescription}
						type="button"
						className="flex-shrink-0 bg-gray-100/50 hover:bg-blue-100 border-blue-500 hover:red-teal-700 text-sm border-1 text-blue-600 py-1 px-2 rounded-lg"
					>
						View description
					</button>
					<button
						onClick={toggleUpdate}
						type="button"
						className="flex-shrink-0 bg-gray-100/50 hover:bg-green-100 border-green-500 hover:red-teal-700 text-sm border-1 text-green-600 py-1 px-2 rounded-lg"
					>
						Edit
					</button>
					<button
						onClick={() => _removeTask(_task?.id ?? 0)}
						type="button"
						className="flex-shrink-0 bg-gray-100/50 hover:bg-red-100 border-red-500 hover:red-teal-700 text-sm border-1 text-red-600 py-1 px-2 rounded-lg"
					>
						Remove
					</button>
				</div>
			</div>
			{isDescriptionVisible && (
				<div className="ml-3 block text-gray-900">
					<p className="text-sm font-light text-gray-500">
						{_task?.description}
					</p>
				</div>
			)}
			{isUpdateVisible && <TaskForm task={task} update={true} />}
		</div>
	);
}
