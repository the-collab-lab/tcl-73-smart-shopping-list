import { AddItem } from '../components/AddItem';
import { ShareList } from '../components/ShareList';

export function ManageList({ listPath, data }) {
	return (
		<div>
			<AddItem listPath={listPath} data={data} />
			<ShareList listPath={listPath} />
		</div>
	);
}
