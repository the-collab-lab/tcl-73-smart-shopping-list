export const isInputEmpty = (userInput) => {
	const trimmedUserInput = userInput.trim();

	if (trimmedUserInput) {
		return true;
	} else {
		return false;
	}
};
