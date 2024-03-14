import { useEffect, useState } from 'react';
import { updateItem } from '../api/firebase';
import { itemIsExpired } from '../utils';
import { getDaysBetweenDates, itemIsOverdue } from '../utils/dates';
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
	}, [item]);

	const getPurchaseUrgency = (item) => {
		const itemLastPurchased = item.dateLastPurchased || item.dateCreated;
		const numberOfDays = getDaysBetweenDates(
			itemLastPurchased,
			item.dateNextPurchased,
		);

		const isOverdue = itemIsOverdue(item);

		switch (true) {
			case isOverdue:
				return 'overdue';
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
		<div className="ListItem">
			<li>
				<input
					checked={isChecked}
					onChange={handleChange}
					type="checkbox"
					id={item.id}
				/>

				<label className="ListItem-label" htmlFor={item.id}>
					<p>{name}</p>
					<p>{getPurchaseUrgency(item)}</p>
				</label>
			</li>
		</div>
	);
}

//style={{ borderBottom: '0.75px solid white', width: '75%', margin: 'auto' }}
