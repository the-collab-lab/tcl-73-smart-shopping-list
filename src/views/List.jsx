import { useState } from 'react';
import { ListItem } from '../components';

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

			{!data.length > 0 && <p>There are no items in this list.</p>}

			{data.length > 0 && !filteredItems.length > 0 && (
				<p>There are no matching items.</p>
			)}
		</>
	);
}
