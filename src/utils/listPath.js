export const getListNameFromPath = (listPath) => {
	const indexOfFwdSlash = listPath.split('').indexOf('/');
	const listName = listPath
		.split('')
		.splice(indexOfFwdSlash + 1)
		.join('');
	return listName;
};

export const getUserIdFromPath = (listPath) => {
	const indexOfFwdSlash = listPath.split('').indexOf('/');
	const idFromListPath = listPath.split('').splice(0, indexOfFwdSlash).join('');
	return idFromListPath;
};
