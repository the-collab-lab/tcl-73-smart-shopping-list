import './Home.css';
import { SingleList } from '../components/SingleList';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createList } from '../api/firebase.js';
import { useAuth } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import StackedLogo from './StackedLogo.jsx';

export function Home({ data, setListPath }) {
	const { user } = useAuth();
	const userId = user?.uid;
	const userEmail = user?.email;
	const navigate = useNavigate();

	const [listName, setListName] = useState('');

	const handleInputChange = (event) => {
		setListName(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const trimmedListName = listName.trim();
		if (trimmedListName) {
			const listItem = await createList(userId, userEmail, trimmedListName);
			setListPath(listItem.path);
			setListName('');
			navigate('/list');
			alert(`New list was created named: ${trimmedListName}`);
		} else {
			alert("Error occurred. List wasn't created");
		}
	};

	return (
		<div className="Home">
			<form id="item-form" onSubmit={handleSubmit}>
				<label htmlFor="list-name">Enter a new list name:</label>
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
			{data.length ? (
				<ul>
					<p className="list-title">Your Lists</p>
					{data.map((item) => (
						<SingleList
							key={item.path}
							name={item.name}
							path={item.path}
							setListPath={setListPath}
						/>
					))}
				</ul>
			) : (
				<div>
					<p>
						There are no lists to display. Please create a list to get started!
					</p>
				</div>
			)}
			{/* <div className="home-links">
			<a
				href="https://github.com/the-collab-lab/tcl-73-smart-shopping-list"
				target="_blank"
				rel="noopener noreferrer"
			>
				<FontAwesomeIcon icon={faSquareGithub} className="repo-icon" />
			</a>
			<a
				href="https://the-collab-lab.codes/"
				target="_blank"
				rel="noopener noreferrer"
				className="logoStack"
			>
				<StackedLogo />
			</a>
			</div> */}
		</div>
	);
}
