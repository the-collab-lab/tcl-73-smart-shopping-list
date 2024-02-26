import { useState, useEffect } from 'react';
import { updateItem } from '../api/firebase';
import { ONE_DAY_IN_MILLISECONDS } from '../utils';
import './ListItem.css';

export function ListItem({ listPath, item, name }) {
	const [isChecked, setIsChecked] = useState(false);

	function handleChange(e) {
		setIsChecked(!isChecked);
		updateItem(listPath, item);
	}

	useEffect(() => {
		const seconds = item.dateLastPurchased.seconds;
		const nanoseconds = item.dateLastPurchased.nanoseconds;
		const dateLastPurchased = new Date(
			item.dateLastPurchased.seconds * 1000 +
				item.dateLastPurchased.nanoseconds / 1e6,
		);
		console.log(dateLastPurchased);
		const futureDate = new Date(
			dateLastPurchased.getTime() + ONE_DAY_IN_MILLISECONDS,
		);
	}, [item.dateLastPurchased]);

	return (
		<li className="ListItem">
			<input
				name={name}
				checked={isChecked}
				onChange={handleChange}
				type="checkbox"
				id="item-checkbox"
			/>
			<label htmlFor="item-checkbox">{name}</label>
		</li>
	);
}
