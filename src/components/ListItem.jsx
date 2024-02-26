import { useState } from 'react';
import './ListItem.css';

export function ListItem({ name }) {
	const [isChecked, setIsChecked] = useState(false);

	function handleChange(e) {
		setIsChecked(!isChecked);
	}

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
