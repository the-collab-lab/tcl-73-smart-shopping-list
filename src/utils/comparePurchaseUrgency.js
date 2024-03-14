import { getDaysBetweenDates, itemIsOverdue } from './dates';

//comparison function to be passed into Array.sort()
export function comparePurchaseUrgency(a, b) {
	/*
	Here we are prioritizing the sorting of any overdue items first.
	itemIsOverdue returns a boolean indicating where an item is overdue
	*/

	if (itemIsOverdue(a) && !itemIsOverdue(b)) {
		//if
		return -1;
	} else if (!itemIsOverdue(a) && itemIsOverdue(b)) {
		return 1;
	} else if (itemIsOverdue(a) && itemIsOverdue(b)) {
		//if both items are overdue, sort alphabetically
		return a.name.localeCompare(b.name);
	}

	//Fallback logic to sort non-overdue items
	/*------------------------------------------------------*/

	const daysSinceLastPurchaseA = getDaysBetweenDates(
		a.dateLastPurchased || a.dateCreated,
		a.dateNextPurchased,
	);
	const daysSinceLastPurchaseB = getDaysBetweenDates(
		b.dateLastPurchased || b.dateCreated,
		b.dateNextPurchased,
	);

	if (daysSinceLastPurchaseA < daysSinceLastPurchaseB) {
		return -1;
	} else if (daysSinceLastPurchaseA > daysSinceLastPurchaseB) {
		return 1;
	} else if (daysSinceLastPurchaseA === daysSinceLastPurchaseB) {
		return a.name.localeCompare(b.name);
	}
}
