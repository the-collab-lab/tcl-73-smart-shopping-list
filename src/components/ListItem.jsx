import { useEffect, useState } from 'react';
import { updateItem } from '../api/firebase';
import { ONE_DAY_IN_MILLISECONDS } from '../utils';
import './ListItem.css';

export function ListItem({ listPath, item, name }) {
	const [isChecked, setIsChecked] = useState(false);

	function handleChange(e) {
		// unsures checked box can be toggled
		setIsChecked(!setIsChecked);
		// pass listPath, copies the item object and sets a new value named isChecked
		updateItem(listPath, { ...item, isChecked: !isChecked });
	}

	// this useEffect will run everytime the value of "dateLastPurchased" on the item object changes
	useEffect(() => {
		//
		if (item.dateLastPurchased) {
			const now = new Date();
			// calculate expiration time by adding on 24 hours onto the value that is stored on the dateLastPurchased key
			// this variable will be in milliseconds
			const expirationTime =
				new Date(
					item.dateLastPurchased.seconds * 1000 +
						Math.floor(item.dateLastPurchased.nanoseconds / 1000000),
				).getTime() + ONE_DAY_IN_MILLISECONDS;

			// Set checkbox state will become unchecked when the current date matches the expiration time
			setIsChecked(now.getTime() < expirationTime);
		}
	}, [item.dateLastPurchased]);

	return (
		<li className="ListItem">
			<input
				checked={isChecked}
				onChange={handleChange}
				type="checkbox"
				id="item-checkbox"
			/>
			<label htmlFor="item-checkbox">{name}</label>
		</li>
	);
}
