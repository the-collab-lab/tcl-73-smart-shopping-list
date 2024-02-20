import { useState } from 'react';
import { ListItem } from '../components';

export function List({ data }) {
	const [searchInput, setSearchInput] = useState('');
	const handleChange = (e) => {
		setSearchInput(e.target.value);
	};

	const filteredData = data.filter((item) => {
		return item.name.toLowerCase().includes(searchInput.toLowerCase());
	});

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>

			<label htmlFor="item-search">Search for an item:</label>
			<input
				id="item-search"
				type="search"
				placeholder="Search item..."
				onChange={handleChange}
			/>
			<ul>
				{filteredData.map((item, index) => (
					<ListItem name={item.name} key={index} />
				))}
			</ul>

			{!data.length && <p>There are no items in this list.</p>}
			{data.length > 0 && !filteredData.length > 0 && (
				<p>There are no matching items</p>
			)}
		</>
	);
}
