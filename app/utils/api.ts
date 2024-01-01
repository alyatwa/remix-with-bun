import { Task } from "~/types";


const BASE_POINT =
	"https://cors-anywhere.herokuapp.com/https://bun-elysia-server--alyatwa.repl.co";

// Helper function to handle fetch requests
async function fetchData(url: string, method: string, body?: object) {
	const headers = {
		"Content-Type": "application/json",
		"X-Requested-With": "XMLHttpRequest",
	};

	const config: RequestInit = {
		method,
		headers,
		...(body && { body: JSON.stringify(body) }),
	};

	return fetch(BASE_POINT + url, config)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return response.json();
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(`Error making ${method} request to ${url}:`, error);
		});
}

export async function getTasks() {
	return (await fetchData("/tasks", "GET")) as unknown as Promise<Task[]>;
}

export async function getTask(taskId: number) {
	return (await fetchData(
		"/tasks/" + taskId,
		"GET"
	)) as unknown as Promise<Task>;
}

export async function createTask(task: Partial<Task>): Promise<Task> {
	return (await fetchData(`/tasks`, "POST", task)) as unknown as Promise<Task>;
}
export async function updateTask(task: Task) {
	return await fetchData(`/tasks/${task.id}`, "PATCH", task);
}

export async function checkTask(id:number, checked:boolean) {
	return await fetchData(`/tasks/${id}`, "PUT", {checked});
}

export async function removeTask(id: number) {
	return await fetchData(`/tasks/${id}`, "DELETE");
}
