import { getDaysBetweenDates } from './dates';

export function comparePurchaseUrgency(items) {
	const sortedItems = items.sort((a, b) => {
		const daysA = getDaysBetweenDates(
			a.dateLastPurchased || a.dateCreated,
			a.dateNextPurchased,
		);
		const daysB = getDaysBetweenDates(
			b.dateLastPurchased || b.dateCreated,
			b.dateNextPurchased,
		);

		if (daysA < daysB) {
			return -1;
		} else if (daysA > daysB) {
			return 1;
		} else if (daysA === daysB) {
			return a.name.localeCompare(b.name);
		}
	});

	return sortedItems;
}
