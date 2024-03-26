export const getListNameFromPath = (listPath) => {
	const indexOfFwdSlash = listPath.split('').indexOf('/');
	const listName = listPath
		.split('')
		.splice(indexOfFwdSlash + 1)
		.join('');
	return listName;
};
