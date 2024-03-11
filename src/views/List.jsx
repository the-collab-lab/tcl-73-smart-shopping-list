import { useState } from 'react';
import { ListItem } from '../components';
import { Link } from 'react-router-dom';
import { comparePurchaseUrgency } from '../utils/comparePurchaseUrgency';

export function List({ listPath, data }) {
	const [searchItem, setSearchItem] = useState('');

	const handleChange = (e) => {
		setSearchItem(e.target.value);
	};

	const filteredItems = data.filter((item) => {
		return item.name.toLowerCase().includes(searchItem.toLowerCase());
	});

	const sortedItems = comparePurchaseUrgency(filteredItems);

	if (!data.length) {
		return (
			<div>
				<label htmlFor="add-first-item">
					There are no items in this list. Click this button to add your first
					items!
				</label>
				<Link id="add-first-item" to="/manage-list">
					Add items
				</Link>
			</div>
		);
	}
	return (
		<div>
			<label htmlFor="item-search"> Search for an item: </label>
			<input
				id="item-search"
				type="text"
				placeholder="Search item..."
				onChange={handleChange}
				value={searchItem}
			/>
			{searchItem && (
				<button
					type="button"
					name="clearInput"
					aria-label="Clear input"
					onClick={() => setSearchItem('')}
				>
					X
				</button>
			)}
			<p>Check off items as you shop, your list will reset after 24hrs.</p>
			<p>Only manually uncheck if you didn't make the purchase.</p>
			<ul>
				{sortedItems.map((item) => (
					<ListItem
						name={item.name}
						key={item.id}
						listPath={listPath}
						item={item}
					/>
				))}
			</ul>
			{data.length > 0 && !filteredItems.length > 0 && (
				<p>There are no matching items.</p>
			)}
		</div>
	);
}
