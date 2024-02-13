import './Home.css';
import { SingleList } from '../components/SingleList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createList } from '../api/firebase.js';
import { useAuth } from '../api';

export function Home({ data, setListPath }) {
	const { user } = useAuth();
	const token = user?.accessToken;
	const userId = user?.uid;
	const userEmail = user?.email;

	// Do we need to really store it

	localStorage.setItem('token', token);
	const navigate = useNavigate();

	const [listName, setListName] = useState('');

	const handleInputChange = (event) => {
		setListName(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		await createList(userId, userEmail, listName);
		alert(`New list was created named: ${listName}`);
	};

	useEffect(() => {
		const newList = data.find((list) => list.name === listName);

		if (newList) {
			const currentlistPath = newList.path;
			setListPath(currentlistPath);
			navigate('/list');
		}
	}, [listName, setListPath, navigate, data]);

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<form id="item-form" onSubmit={handleSubmit}>
				<label htmlFor="list-name"> Enter a new list name: </label>
				<input
					type="text"
					name="list-name"
					id="list-name"
					value={listName}
					onChange={handleInputChange}
					required
				/>
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
