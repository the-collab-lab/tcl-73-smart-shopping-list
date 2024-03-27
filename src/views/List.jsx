import { useState } from 'react';
import { ListItem, ListOwnerMessage } from '../components';
import { Link } from 'react-router-dom';
import { comparePurchaseUrgency } from '../utils/comparePurchaseUrgency';
import { useAuth } from '../api';

export function List({ listPath, data, listName, userIdFromPath }) {
	const [searchItem, setSearchItem] = useState('');
	const { user } = useAuth();
	const currentUserId = user?.uid;

	const handleChange = (e) => {
		setSearchItem(e.target.value);
	};

	const filteredItems = data.filter((item) => {
		return item.name.toLowerCase().includes(searchItem.toLowerCase());
	});

	const sortedItems = filteredItems.sort(comparePurchaseUrgency);

	if (!data.length) {
		return (
			<div>
				<p>List name: {listName}</p>
				<label htmlFor="add-first-item">
					There are no items in this list. Click this button to add your first
					items!
				</label>
				<Link id="add-first-item" to="/manage-list">
					Add items
				</Link>
				{data.length > 0 && !filteredItems.length > 0 && (
					<p>There are no matching items.</p>
				)}
				<ListOwnerMessage
					currentUserId={currentUserId}
					userIdFromPath={userIdFromPath}
					listName={listName}
				/>
			</div>
		);
	}
	return (
		<div>
			<p>List name: {listName}</p>
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
			<>
				<ul>
					<div className="column-name">
						<p>Item Name</p>
						<p>Purchase Priority</p>
					</div>
					{sortedItems.map((item) => (
						<ListItem
							name={item.name}
							key={item.id}
							listPath={listPath}
							item={item}
						/>
					))}
				</ul>
			</>
			{data.length > 0 && !filteredItems.length > 0 && (
				<p>There are no matching items.</p>
			)}
			<ListOwnerMessage
				currentUserId={currentUserId}
				userIdFromPath={userIdFromPath}
				listName={listName}
			/>
		</div>
	);
}
