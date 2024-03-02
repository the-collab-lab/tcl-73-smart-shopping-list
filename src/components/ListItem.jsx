import { useEffect, useState } from 'react';
import { updateItem } from '../api/firebase';
import { ONE_DAY_IN_MILLISECONDS } from '../utils';
import './ListItem.css';

export function ListItem({ listPath, item, name }) {
	const [isChecked, setIsChecked] = useState(item.isChecked || false);

	function handleChange() {
		updateItem(listPath, { ...item, isChecked: !isChecked });
		setIsChecked(!isChecked);
	}

	useEffect(() => {
		if (item.dateLastPurchased) {
			const currentDate = new Date();
			const seconds = item.dateLastPurchased.seconds;
			const nanoseconds = item.dateLastPurchased.nanoseconds;

			const expirationDate =
				new Date(seconds * 1000 + Math.floor(nanoseconds / 1000000)).getTime() +
				ONE_DAY_IN_MILLISECONDS;

			setIsChecked(currentDate.getTime() < expirationDate);

			const timeoutId = setTimeout(() => {
				if (!isChecked) {
					// Only update if unchecked due to expiration
					updateItem(listPath, { ...item, isChecked: false });
				}
			}, 500); // Delay slightly for smoother experience

			return () => clearTimeout(timeoutId);
		}
	}, [item.dateLastPurchased, isChecked]);

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
