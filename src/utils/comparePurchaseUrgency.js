import { getDaysBetweenDates } from './dates';

export function comparePurchaseUrgency(a, b) {
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
