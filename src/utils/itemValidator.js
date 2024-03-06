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

export const removeAndSymbolAndWord = (inputItem) => {
	const inputItemArr = inputItem.split(' ');
	const includesAndOrAmpersand =
		inputItemArr.length > 1 &&
		inputItemArr.some((word) => word === '&' || word.toLowerCase() === 'and');

	if (includesAndOrAmpersand) {
		const itemWithoutAnds = inputItemArr.map((word) =>
			word.replace(/(&|and)/gi, ''),
		);
		const processedItem = itemWithoutAnds.join('');
		return processedItem;
	}

	return inputItem;
};

export const isItemDuplicate = (newItem, itemsList) => {
	const trimmedNewItem = removePunctuation(removeAndSymbolAndWord(newItem));

	const isInTheList = itemsList.some((item) => {
		const trimmedCurrentItem = removePunctuation(
			removeAndSymbolAndWord(item.name),
		);
		return trimmedCurrentItem === trimmedNewItem;
	});

	return isInTheList;
};
