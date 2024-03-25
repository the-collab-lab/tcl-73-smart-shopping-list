import { AddItem } from '../components/AddItem';
import { ShareList } from '../components/ShareList';

export function ManageList({ listPath, data, listName }) {
	return (
		<div>
			<p>List Name: {listName}</p>
			<AddItem listPath={listPath} data={data} />
			<ShareList listPath={listPath} />
		</div>
	);
}
