export const isInputEmpty = (userInput) => {
	const trimmedUserInput = userInput.trim();
	return !trimmedUserInput;
};

export const removePunctuation = (inputItem) => {
	const punctuation = /[.,?!@#$%^*]/g;
	const itemWithoutPunctuation = inputItem.replace(punctuation, '');
	const processedItem = itemWithoutPunctuation
		.split(' ')
		.join('')
		.toLowerCase();

	return processedItem;
};

export const isItemDuplicate = (newItem, itemsList) => {
	const trimmedNewItem = removePunctuation(newItem);

	const isInTheList = itemsList.some((item) => {
		const trimmedCurrentItem = removePunctuation(item.name);

		return trimmedCurrentItem === trimmedNewItem;
	});

	return isInTheList;
};
