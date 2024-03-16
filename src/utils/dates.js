import { Timestamp } from 'firebase/firestore';

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

export function getDaysBetweenDates(startDate, endDate) {
	const milliseconds = endDate.toMillis() - startDate.toMillis();
	const days = Math.round(milliseconds / ONE_DAY_IN_MILLISECONDS);
	return days;
}

/*
this function checks whether 24 hours have passed since dateLastPurchased,
returns true if so, false otherwise
*/
export function itemIsExpired(item) {
	if (!item.dateLastPurchased) return false;

	const currentDate = new Date();
	const lastPurchasedInMillis = item.dateLastPurchased.toDate().getTime();
	const expirationDate = lastPurchasedInMillis + ONE_DAY_IN_MILLISECONDS;

	return currentDate.getTime() >= expirationDate;
}

//returns true if item was last purchased 60 or more days ago.
export function itemIsInactive(item) {
	const lastPurchaseDate = item.dateLastPurchased || item.dateCreated;
	const today = Timestamp.now();
	return getDaysBetweenDates(lastPurchaseDate, today) >= 60;
}

//returns true if item's next purchase date has already passed, but is not inactive yet.
export function itemIsOverdue(item) {
	const nextPurchaseDate = item.dateNextPurchased;
	const today = Timestamp.now();

	return today > nextPurchaseDate && !itemIsInactive(item);
}
