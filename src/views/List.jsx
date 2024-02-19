import { useState } from 'react';
import { ListItem } from '../components';

export function List({ data }) {
	const [searchInput, setSearchInput] = useState('');

	const handleChange = (e) => {
		setSearchInput(e.target.value);
	};

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<label htmlFor="item-search">Search for an item:</label>
			<input
				id="item-search"
				type="text"
				placeholder="Search item..."
				onChange={handleChange}
			/>
			<ul>
				{data.map((item, index) => (
					<ListItem name={item.name} key={index} />
				))}
			</ul>
		</>
	);
}
