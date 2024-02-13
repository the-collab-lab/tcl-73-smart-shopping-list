import './Home.css';
import { SingleList } from '../components/SingleList';
import { useState, useEffect } from 'react';
import { createList } from '../api/firebase.js';
import { useAuth } from '../api';

export function Home({ data, setListPath }) {
	const { user } = useAuth();
	const token = user?.accessToken;
	const userId = user?.uid;
	const userEmail = user?.email;
	localStorage.setItem('token', token);

	const [listName, setListName] = useState('');
	const [listData, setListData] = useState(data);
	console.log('data from 1', data);

	const handleInputChange = (event) => {
		setListName(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!listName) {
			alert('Oppsss, you have to provide a name');
		} else {
			const result = createList(userId, userEmail, listName);
			setListData(...listData, result);
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
