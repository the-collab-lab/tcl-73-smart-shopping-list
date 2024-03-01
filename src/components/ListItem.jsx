import { useEffect, useState } from 'react';
import { updateItem } from '../api/firebase';
import { ONE_DAY_IN_MILLISECONDS } from '../utils';
import './ListItem.css';

export function ListItem({ listPath, item, name }) {
	const [isChecked, setIsChecked] = useState(false);

	function handleChange() {
		setIsChecked(!isChecked);
		updateItem(listPath, { ...item, isChecked: !isChecked });
	}

	useEffect(() => {
		//
		if (item.dateLastPurchased) {
			const currentDate = new Date();
			const seconds = item.dateLastPurchased.seconds;
			const nanoseconds = item.dateLastPurchased.nanoseconds;

			const expirationDate =
				new Date(seconds * 1000 + Math.floor(nanoseconds / 1000000)).getTime() +
				ONE_DAY_IN_MILLISECONDS;

			setIsChecked(currentDate.getTime() < expirationDate);
		}
	}, [item.dateLastPurchased]);

	return (
		<li className="ListItem">
			<input
				checked={isChecked}
				onChange={handleChange}
				type="checkbox"
				id={item.id}
			/>
			<label htmlFor={item.id}>{name}</label>
		</li>
	);
}
