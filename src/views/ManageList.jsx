import { AddItem } from '../components/AddItem';
import { ShareList, ListOwnerMessage } from '../components';
import { useAuth } from '../api';
import { useListOwnerDetails } from '../utils';

export function ManageList({ listPath, data, listName, userIdFromPath }) {
	const { user } = useAuth();
	const currentUserId = user?.uid;
	const sharedListOwner = useListOwnerDetails(userIdFromPath, listName);

	return (
		<div>
			<p>List Name: {listName}</p>
			<AddItem listPath={listPath} data={data} />
			<ShareList listPath={listPath} />
			<ListOwnerMessage
				currentUserId={currentUserId}
				userIdFromPath={userIdFromPath}
				sharedListOwner={sharedListOwner}
			/>
		</div>
	);
}
