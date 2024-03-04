export const isInputEmpty = (userInput) => {
	const trimmedUserInput = userInput.trim();
	return trimmedUserInput ? false : true;
};

export const isItemDuplicate = (newItem, itemsList) => {
	const trimmedNewItem = newItem.split(' ').join('');
	return (
		itemsList.filter((item) =>
			item.name.toLowerCase().includes(trimmedNewItem.toLowerCase()),
		).length > 0
	);
};
