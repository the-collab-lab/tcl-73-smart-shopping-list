export const isInputEmpty = (userInput) => {
	const trimmedUserInput = userInput.trim();
	return trimmedUserInput ? false : true;
};

export const isItemDuplicate = (newItem, itemsList) => {
	const removePunctuation = (inputItem) => {
		const punctuation = /[\.,?!]/g;
		const itemWithoutPunctuation = inputItem.replace(punctuation, '');
		return itemWithoutPunctuation;
	};

	const trimmedNewItem = removePunctuation(newItem)
		.split(' ')
		.join('')
		.toLowerCase();

	return (
		itemsList.filter((item) =>
			item.name.toLowerCase().split(' ').join('').includes(trimmedNewItem),
		).length > 0
	);
};
