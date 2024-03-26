import { useNavigate } from 'react-router-dom';

import './SingleList.css';

export function SingleList({ name, path, setListPath }) {
	const navigate = useNavigate();

	function handleClick() {
		setListPath(path);
		navigate('/list');
	}

	return (
		<li className="SingleList">
			<button onClick={handleClick}>{name}</button>
		</li>
	);
}
