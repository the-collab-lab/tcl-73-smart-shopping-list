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

	const handleSortItem = (item) => {
		let lastPurchased = item.dateLastPurchased || item.dateCreated;
		let currentDate = getDaysBetweenDates(
			lastPurchased,
			item?.dateNextPurchased,
		);
		if (currentDate <= 7) {
			return 'soon';
		} else if (currentDate > 7 && currentDate < 30) {
			return 'kind of soon';
		} else if (currentDate >= 30) {
			return 'not soon';
		} else {
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
				{name}: {handleSortItem(item)}
			</label>
		</li>
	);
}
