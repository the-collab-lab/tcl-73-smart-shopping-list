import { AddItem } from '../components/AddItem';
import { ShareList } from '../components/ShareList';

export function ManageList({ listPath }) {
	return (
		<div>
			<AddItem listPath={listPath} />
			<ShareList listPath={listPath} />
		</div>
	);
}
