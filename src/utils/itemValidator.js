export const isInputEmpty = (userInput) => {
	const trimmedUserInput = userInput.trim();
	return trimmedUserInput ? false : true;
};

export const isItemDuplicate = (newItem, itemsList) => {
	const removePunctuation = (inputItem) => {
		const punctuation = /[.,?!]/g;
		const itemWithoutPunctuation = inputItem.replace(punctuation, '');
		return itemWithoutPunctuation;
	};

	const trimmedNewItem = removePunctuation(newItem)
		.split(' ')
		.join('')
		.toLowerCase();

	const isInTheList = itemsList.find((item) => {
		const trimmedCurrentItem = removePunctuation(item.name)
			.toLowerCase()
			.split(' ')
			.join('');

		return trimmedCurrentItem === trimmedNewItem;
	});

	return isInTheList;
};
