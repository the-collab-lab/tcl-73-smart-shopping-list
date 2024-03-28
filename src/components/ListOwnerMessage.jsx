import { useListOwnerDetails } from '../utils';

export function ListOwnerMessage({ currentUserId, userIdFromPath, listName }) {
	const sharedListOwner = useListOwnerDetails(userIdFromPath, listName);

	if (currentUserId === userIdFromPath) {
		return <p>You own this list.</p>;
	} else if (sharedListOwner) {
		return <p>This list belongs to {sharedListOwner.ownerName}.</p>;
	} else {
		return null; // Handle the case where there's no owner information available
	}
}
