import { useState } from 'react';
import { ListItem } from '../components';

export function List({ data }) {
	const [searchInput, setSearchInput] = useState('');
	const msgToUser = 'There is no items in the list ';
	const handleChange = (e) => {
		setSearchInput(e.target.value);
	};

	const filteredData = data.filter((item) => {
		return item.name.includes(searchInput);
	});

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			{!data.length && <p> {msgToUser} </p>}

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

			{data.length && !filteredData.length > 0 && (
				<p>There are no matching items</p>
			)}
		</>
	);
}
