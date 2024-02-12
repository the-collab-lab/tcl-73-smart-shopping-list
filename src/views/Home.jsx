import './Home.css';
import { SingleList } from '../components/SingleList';
import { useState } from 'react';

export function Home({ data, setListPath }) {
	const [listName, setListName] = useState('');

	const handleInputChange = (event) => {
		setListName(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!listName) {
			alert('Oppsss, you have to provide a name');
		} else {
			alert(`New list was created named: ${listName}`);
		}
		setListName('');
	};

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="list-name">
					Enter your list name:
					<input
						type="text"
						name="list-name"
						id="list-name"
						value={listName}
						onChange={handleInputChange}
					/>
				</label>
				<button type="submit">Create a list</button>
			</form>
			<ul>
				{data.map((item) => (
					<SingleList
						key={item.path}
						name={item.name}
						path={item.path}
						setListPath={setListPath}
					/>
				))}
			</ul>
		</div>
	);
}
