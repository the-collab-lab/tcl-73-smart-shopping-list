export const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

export function getDaysBetweenDates(dateOne, dateTwo) {
	const milliseconds = dateTwo.toMillis() - dateOne.toMillis();
	const days = Math.round(milliseconds / ONE_DAY_IN_MILLISECONDS);
	return days;
}

export function itemIsExpired(item) {
	if (!item.dateLastPurchased) return false;

	const currentDate = new Date();
	const lastPurchasedInMillis = item.dateLastPurchased.toDate().getTime();
	const expirationDate = lastPurchasedInMillis + ONE_DAY_IN_MILLISECONDS;

	return currentDate.getTime() >= expirationDate;
}
