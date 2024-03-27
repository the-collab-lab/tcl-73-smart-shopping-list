export function ListOwnerMessage({
	currentUserId,
	userIdFromPath,
	sharedListOwner,
}) {
	console.log('currentUserId', currentUserId);
	console.log('userIdFromPath', userIdFromPath);

	if (currentUserId === userIdFromPath) {
		return <p>You own this list.</p>;
	} else if (sharedListOwner) {
		return <p>This list belongs to {sharedListOwner.ownerName}.</p>;
	} else {
		return null; // Handle the case where there's no owner information available
	}
}
