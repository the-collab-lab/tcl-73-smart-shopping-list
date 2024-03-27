import { useState, useEffect } from 'react';
import { ListItem } from '../components';
import { Link } from 'react-router-dom';
import { comparePurchaseUrgency } from '../utils/comparePurchaseUrgency';
import { useAuth, getListOwnerDetails } from '../api';

export function List({ listPath, data, listName, userIdFromPath }) {
	const [searchItem, setSearchItem] = useState('');
	const [sharedListOwner, setSharedListOwner] = useState(null);
	const { user } = useAuth();
	const currentUserId = user?.uid;

	const handleChange = (e) => {
		setSearchItem(e.target.value);
	};

	const filteredItems = data.filter((item) => {
		return item.name.toLowerCase().includes(searchItem.toLowerCase());
	});

	const sortedItems = filteredItems.sort(comparePurchaseUrgency);

	useEffect(() => {
		(async () => {
			try {
				const ownerDetails = await getListOwnerDetails(
					userIdFromPath,
					listName,
				);
				setSharedListOwner(ownerDetails);
			} catch (error) {
				console.error(
					'Error fetching shared list owner details:',
					error.message,
				);
			}
		})();
	}, [userIdFromPath, listName]);

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
			{currentUserId === userIdFromPath ? (
				<p>You own this list.</p>
			) : sharedListOwner ? (
				<p>This list belongs to {sharedListOwner.ownerName}.</p>
			) : (
				<p>Loading owner details...</p>
			)}
		</div>
	);
}
