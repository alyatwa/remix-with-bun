import { Form, Link } from "@remix-run/react";
import useTaskItem from "~/hooks/useTaskItem";
import { Task } from "~/types";

export function TaskItem({ task }: { task: Task }) {
	const { toggleDescription } = useTaskItem();

	return (
		<li className="py-4" key={task.id}>
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<Form method="post">
					<input type="hidden" name="id" id="id" value={task.id} />
					<input type="hidden" name="formName" value="updateCheckbox" />
					<input
						id="checked"
						name="checked"
						defaultChecked={task.checked}
						type="checkbox"
						onChange={(event) => {
							event.target.form?.requestSubmit();
						  }}
						className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
					/></Form>
					<label
						onClick={toggleDescription}
						className="ml-3 block text-gray-900"
					>
						<span className="text-lg font-medium">{task.title}</span>
					</label>

					<Link to={`/tasks/${task.id}`}>
						<label className="ml-3 block text-gray-900 select-none cursor-pointer ">
							<span className="text-sm font-light text-gray-500">
								View Details
							</span>
						</label>
					</Link>
				</div>
			</div>
		</li>
	);
}
