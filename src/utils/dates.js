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

export function itemIsOverdue(item) {
	const itemNextPurchase = item.dateNextPurchased;
	const today = Timestamp.now();
	return (
		today > itemNextPurchase && //Check if today's date in milliseconds is past the next purchase date
		getDaysBetweenDates(itemNextPurchase, today) < 60
	); //Check if the days between next purchase and today are less than 60
}
