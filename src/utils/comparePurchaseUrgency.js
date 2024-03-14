import { Timestamp } from 'firebase/firestore';
import { getDaysBetweenDates, itemIsOverdue, itemIsInactive } from './dates';

//comparison function to be passed into Array.sort()
export function comparePurchaseUrgency(a, b) {
	/*
	Here we are prioritizing sorting inactive and/or overdue items first.
	Overdue items are given priority and placed highest on the list.
	Inactive items are given lower priority and placed lowest on the list.
	*/
	if (!itemIsInactive(a) && itemIsInactive(b)) {
		return -1;
	} else if (itemIsInactive(a) && !itemIsInactive(b)) {
		return 1;
	} else if (itemIsInactive(a) && itemIsInactive(b)) {
		return a.name.localeCompare(b.name);
	}

	if (itemIsOverdue(a) && !itemIsOverdue(b)) {
		return -1;
	} else if (!itemIsOverdue(a) && itemIsOverdue(b)) {
		return 1;
	} else if (itemIsOverdue(a) && itemIsOverdue(b)) {
		//if both items are overdue, sort alphabetically
		return a.name.localeCompare(b.name);
	}

	//Fallback logic to sort active items (neither inactive nor overdue)
	/*------------------------------------------------------*/
	const today = Timestamp.now();

	const daysUntilNextPurchaseA = getDaysBetweenDates(
		today,
		a.dateNextPurchased,
	);

	const daysUntilNextPurchaseB = getDaysBetweenDates(
		today,
		b.dateNextPurchased,
	);

	if (daysUntilNextPurchaseA < daysUntilNextPurchaseB) {
		return -1;
	} else if (daysUntilNextPurchaseA > daysUntilNextPurchaseB) {
		return 1;
	} else if (daysUntilNextPurchaseA === daysUntilNextPurchaseB) {
		return a.name.localeCompare(b.name);
	}
}
