import { useState } from 'react';
import { ListItem } from '../components';
import { Link } from 'react-router-dom';

export function List({ data }) {
	const [searchItem, setSearchItem] = useState('');

	const handleChange = (e) => {
		setSearchItem(e.target.value);
	};

	const filteredItems = data.filter((item) => {
		return item.name.toLowerCase().includes(searchItem.toLowerCase());
	});

	return (
		<>
			{data.length > 0 ? (
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
					<ul>
						{filteredItems.map((item, index) => (
							<ListItem name={item.name} key={index} />
						))}
					</ul>
					{data.length > 0 && !filteredItems.length > 0 && (
						<p>There are no matching items.</p>
					)}
				</div>
			) : (
				<div>
					<label htmlFor="add-first-item">
						There are no items in this list. Click this button to add your first
						items!
					</label>
					<Link to="/manage-list">
						<button id="add-first-item" type="button">
							Add items
						</button>
					</Link>
				</div>
			)}
		</>
	);
}
