import './SingleList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

export function SingleList({ name, path, setListPath }) {
	function handleClick() {
		setListPath(path);
	}

	return (
		<li className="SingleList">
			<button onClick={handleClick}>{name}</button>
			<button aria-label={`Delete ${name}`}>
				<FontAwesomeIcon icon={faTrashCan} /> Delete
			</button>
		</li>
	);
}
