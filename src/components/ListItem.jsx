import { useEffect, useState } from 'react';
import { updateItem, deleteItem } from '../api/firebase';
import { itemIsExpired } from '../utils';
import './ListItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

export function ListItem({ listPath, item, name }) {
	const [isChecked, setIsChecked] = useState(item.isChecked || false);

	function handleChange() {
		updateItem(listPath, { ...item, isChecked: !isChecked }, false);
		setIsChecked(!isChecked);
	}

	async function handleDelete() {
		if (window.confirm('Are you sure you want to delete this item?')) {
			const result = await deleteItem(listPath, item);

			try {
				if (result) {
					alert(result.message);
				} else {
					alert('Failed to delete item.');
				}
			} catch (error) {
				alert(result.message);
			}
		}
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
			<button aria-label={`Delete ${name}`} onClick={handleDelete}>
				<FontAwesomeIcon icon={faTrashCan} /> Delete
			</button>
		</li>
	);
}
