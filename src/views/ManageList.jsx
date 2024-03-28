import { AddItem } from '../components/AddItem';
import { ShareList, ListOwnerMessage } from '../components';
import { useAuth } from '../api';

export function ManageList({ listPath, data, listName, userIdFromPath }) {
	const { user } = useAuth();
	const currentUserId = user?.uid;

	return (
		<div>
			{currentUserId && <p>List Name: {listName}</p>}
			<AddItem listPath={listPath} data={data} />
			<ShareList listPath={listPath} />
			{currentUserId && (
				<ListOwnerMessage
					currentUserId={currentUserId}
					userIdFromPath={userIdFromPath}
					listName={listName}
				/>
			)}
		</div>
	);
}
