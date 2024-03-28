import { useNavigate, Link } from 'react-router-dom';

import './SingleList.css';

export function SingleList({ name, path, setListPath }) {
	function handleClick() {
		setListPath(path);
	}

	return (
		<div className="SingleList">
			<li>
				<Link to="/list" onClick={handleClick}>
					{name}
				</Link>
			</li>
		</div>
	);
}
