import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Task } from "~/types";
import { useTaskStore } from "~/store";

const useTaskDetails = ({ task }: { task: Task }) => {
	const [isDescriptionVisible, setDescriptionVisibility] = useState(false);
	const [isUpdateVisible, setUpdateVisibility] = useState(false);
	const navigate = useNavigate();
	const { removeTask, currentTask, setCurrentTask } = useTaskStore();
    
    //update current task from server
	useEffect(() => {
		setCurrentTask(task);
	}, [task]);
	const _task = currentTask;

	const toggleDescription = () => {
		setDescriptionVisibility(!isDescriptionVisible);
	};
	const toggleUpdate = () => {
		setUpdateVisibility(!isUpdateVisible);
	};

	const _removeTask = (id: number) => {
		removeTask(id);
		navigate("/");
	};
	return {
		_removeTask,
		toggleUpdate,
		toggleDescription,
		_task,
		isDescriptionVisible,
		isUpdateVisible,
	};
};

export default useTaskDetails;
