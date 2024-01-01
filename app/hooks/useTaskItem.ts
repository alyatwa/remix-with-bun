import { useState } from "react";

const useTaskItem = () => {
	const [isDescriptionVisible, setDescriptionVisibility] = useState(false);

	const toggleDescription = () => {
		setDescriptionVisibility(!isDescriptionVisible);
	};
    return{
        toggleDescription
    }
};
export default useTaskItem