import { useEffect, useState } from 'react';
import { updateItem } from '../api/firebase';
import { itemIsExpired } from '../utils';
import {
	getDaysBetweenDates,
	itemIsInactive,
	itemIsOverdue,
} from '../utils/dates';
import './ListItem.css';
import { Timestamp } from 'firebase/firestore';

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
		const today = Timestamp.now();
		const numberOfDays = getDaysBetweenDates(today, item.dateNextPurchased);

		const isInactive = itemIsInactive(item);
		const isOverdue = itemIsOverdue(item);
		const daysPastDue =
			isOverdue && getDaysBetweenDates(item.dateNextPurchased, today);

		switch (true) {
			case isInactive:
				return 'inactive (last purchased over 60 days ago)';
			case isOverdue:
				return `overdue (${daysPastDue === 1 ? '1 day past' : `${daysPastDue} days past`})`;
			case numberOfDays <= 7:
				return `soon (in ${numberOfDays === 1 ? '1 day' : `${numberOfDays} days`})`;
			case numberOfDays > 7 && numberOfDays < 30:
				return `kind of soon (in ${numberOfDays} days)`;
			case numberOfDays >= 30:
				return `not soon (in ${numberOfDays} days)`;
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
