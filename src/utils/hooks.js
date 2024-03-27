import { useEffect, useState } from 'react';
import { getListOwnerDetails } from '../api';

/**
 * Set some state in React, and also persist that value in localStorage.
 * @param {string} storageKey The key of the value in localStorage.
 * @param {string | null} initialValue The initial value to store in localStorage and React state.
 * @returns {[string | null, React.Dispatch<string | null>]}
 */
export function useStateWithStorage(storageKey, initialValue) {
	const [value, setValue] = useState(
		() => localStorage.getItem(storageKey) ?? initialValue,
	);
	useEffect(() => {
		if (value === null || value === undefined) {
			return localStorage.removeItem(storageKey);
		}
		return localStorage.setItem(storageKey, value);
	}, [storageKey, value]);

	return [value, setValue];
}

export function useListOwnerDetails(userIdFromPath, listName) {
	const [sharedListOwner, setSharedListOwner] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				const ownerDetails = await getListOwnerDetails(
					userIdFromPath,
					listName,
				);
				setSharedListOwner(ownerDetails);
			} catch (error) {
				console.error(
					'Error fetching shared list owner details:',
					error.message,
				);
			}
		})();
	}, [userIdFromPath, listName]);

	return sharedListOwner;
}
