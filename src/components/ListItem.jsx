import { useEffect, useState } from 'react';
import { updateItem, deleteItem } from '../api/firebase';
import { itemIsExpired } from '../utils';
import './ListItem.css';

export function ListItem({ listPath, item, name }) {
	const [isChecked, setIsChecked] = useState(item.isChecked || false);

	function handleChange() {
		updateItem(listPath, { ...item, isChecked: !isChecked }, false);
		setIsChecked(!isChecked);
	}

	function handleDelete(listPath, item) {
		console.log(item);
		deleteItem(listPath, item);
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

	return (
		<li className="ListItem">
			<input
				checked={isChecked}
				onChange={handleChange}
				type="checkbox"
				id={item.id}
			/>
			<label htmlFor={item.id}>{name}</label>
			<button onClick={handleDelete}>Delete</button>
		</li>
	);
}
