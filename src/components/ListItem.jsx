import { useEffect, useState } from 'react';
import { updateItem } from '../api/firebase';
import { itemIsExpired } from '../utils';
import { getDaysBetweenDates } from '../utils/dates';
import './ListItem.css';

export function ListItem({ listPath, item, name }) {
	const [isChecked, setIsChecked] = useState(item.isChecked || false);

	function handleChange() {
		updateItem(listPath, { ...item, isChecked: !isChecked }, false);
		setIsChecked(!isChecked);
	}

	useEffect(() => {
		if (item.dateLastPurchased) {
			const isExpired = itemIsExpired(item);

			if (isExpired) {
				updateItem(listPath, item, true);
			}

			setIsChecked(!isExpired);
		}
	}, [item.dateLastPurchased]);

	const getPurchaseUrgency = (item) => {
		let itemLastPurchased = item.dateLastPurchased || item.dateCreated;
		let numberOfDays = getDaysBetweenDates(
			itemLastPurchased,
			item?.dateNextPurchased,
		);
		switch (true) {
			case numberOfDays <= 7:
				return 'soon';
			case numberOfDays > 7 && numberOfDays < 30:
				return 'kind of soon';
			case numberOfDays >= 30 && numberOfDays < 60:
				return 'not soon';
			default:
				return 'inactive';
		}
	};

	return (
		<li className="ListItem">
			<input
				checked={isChecked}
				onChange={handleChange}
				type="checkbox"
				id={item.id}
			/>

			<label htmlFor={item.id}>
				{name}: {getPurchaseUrgency(item)}
			</label>
		</li>
	);
}
