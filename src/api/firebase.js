import {
	arrayUnion,
	getDoc,
	setDoc,
	collection,
	doc,
	onSnapshot,
	updateDoc,
	addDoc,
	deleteDoc,
	Timestamp,
	increment,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './config';
import {
	getFutureDate,
	getDaysBetweenDates,
	itemIsExpired,
	ONE_DAY_IN_MILLISECONDS,
} from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

/**
 * A custom hook that subscribes to the user's shopping lists in our Firestore
 * database and returns new data whenever the lists change.
 * @param {string | null} userId
 * @param {string | null} userEmail
 * @returns
 */
export function useShoppingLists(userId, userEmail) {
	// Start with an empty array for our data.
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		// If we don't have a userId or userEmail (the user isn't signed in),
		// we can't get the user's lists.
		if (!userId || !userEmail) return;

		// When we get a userEmail, we use it to subscribe to real-time updates
		const userDocRef = doc(db, 'users', userEmail);

		onSnapshot(userDocRef, (docSnap) => {
			if (docSnap.exists()) {
				const listRefs = docSnap.data().sharedLists;
				const newData = listRefs.map((listRef) => {
					// We keep the list's id and path so we can use them later.
					return { name: listRef.id, path: listRef.path };
				});
				setData(newData);
			}
		});
	}, [userId, userEmail]);

	return data;
}

/**
 * A custom hook that subscribes to a shopping list in our Firestore database
 * and returns new data whenever the list changes.
 * @param {string | null} listPath
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
export function useShoppingListData(listPath) {
	// Start with an empty array for our data.
	/** @type {import('firebase/firestore').DocumentData[]} */
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		if (!listPath) return;

		// When we get a listPath, we use it to subscribe to real-time updates
		// from Firestore.
		return onSnapshot(collection(db, listPath, 'items'), (snapshot) => {
			// The snapshot is a real-time update. We iterate over the documents in it
			// to get the data.
			const nextData = snapshot.docs.map((docSnapshot) => {
				// Extract the document's data from the snapshot.
				const item = docSnapshot.data();

				// The document's id is not in the data,
				// but it is very useful, so we add it to the data ourselves.
				item.id = docSnapshot.id;

				return item;
			});

			// Update our React state with the new data.
			setData(nextData);
		});
	}, [listPath]);

	// Return the data so it can be used by our React components.
	return data;
}

/**
 * Add a new user to the users collection in Firestore.
 * @param {Object} user The user object from Firebase Auth.
 */
export async function addUserToDatabase(user) {
	// Check if the user already exists in the database.
	const userDoc = await getDoc(doc(db, 'users', user.email));
	// If the user already exists, we don't need to do anything.
	if (userDoc.exists()) {
		return;
	} else {
		// If the user doesn't exist, add them to the database.
		// We'll use the user's email as the document id
		// because it's more likely that the user will know their email
		// than their uid.
		await setDoc(doc(db, 'users', user.email), {
			email: user.email,
			name: user.displayName,
			uid: user.uid,
		});
	}
}

/**
 * Create a new list and add it to a user's lists in Firestore.
 * @param {string} userId The id of the user who owns the list.
 * @param {string} userEmail The email of the user who owns the list.
 * @param {string} listName The name of the new list.
 *
 * @returns {Promise<Object>} created list object
 */
export async function createList(userId, userEmail, listName) {
	const listDocRef = doc(db, userId, listName);

	await setDoc(listDocRef, {
		owner: userId,
	});

	const userDocumentRef = doc(db, 'users', userEmail);

	await updateDoc(userDocumentRef, {
		sharedLists: arrayUnion(listDocRef),
	});

	return listDocRef;
}

/**
 * Shares a list with another user.
 * @param {string} listPath The path to the list to share.
 * @param {string} recipientEmail The email of the user to share the list with.
 */
export async function shareList(listPath, currentUserId, recipientEmail) {
	try {
		// Check if current user is owner.
		if (!listPath.includes(currentUserId)) {
			throw new Error(
				'Current user is not the owner of the list. If this is your list, make sure you are signed in.',
			);
		}
		// Get the document for the recipient user.
		const usersCollectionRef = collection(db, 'users');
		const recipientDoc = await getDoc(doc(usersCollectionRef, recipientEmail));
		// If the recipient user doesn't exist, we can't share the list.
		if (!recipientDoc.exists()) {
			throw new Error(
				'Reciepient does not have an account. To share, ask them to sign up on the app.',
			);
		}
		// Add the list to the recipient user's sharedLists array.
		const listDocumentRef = doc(db, listPath);
		const userDocumentRef = doc(db, 'users', recipientEmail);
		updateDoc(userDocumentRef, {
			sharedLists: arrayUnion(listDocumentRef),
		});

		return { success: true, message: 'List shared successfully!' };
	} catch (error) {
		throw error;
	}
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listPath The path of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(listPath, { itemName, daysUntilNextPurchase }) {
	const listCollectionRef = collection(db, listPath, 'items');
	await addDoc(listCollectionRef, {
		dateCreated: new Date(),
		// NOTE: This is null because the item has just been created.
		// We'll use updateItem to put a Date here when the item is purchased!
		dateLastPurchased: null,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		name: itemName,
		totalPurchases: 0,
	});
}

/**
 * Update an item's properties when purchasing.
@param {string} listPath - The path of the list we're adding to.
@param {Object} item - The item from the list, which will be updated/modified.
@param {boolean} isExpired - Boolean flag indicating whether a purchased item has expired.
*/
export async function updateItem(listPath, item, isExpired) {
	const listCollectionRef = collection(db, listPath, 'items');
	const itemRef = doc(listCollectionRef, item.id);

	const currentDate = Timestamp.now();
	const lastUpdate = item.dateLastPurchased || item.dateCreated;

	// last estimated purchase interval
	const previousEstimate = getDaysBetweenDates(
		lastUpdate,
		item.dateNextPurchased,
	);

	// number of days since the item was added to the list or last purchased
	const daysSinceLastPurchase = getDaysBetweenDates(lastUpdate, currentDate);

	// calculated estimate for the number of days until the next purchase
	const daysUntilNextPurchase = calculateEstimate(
		previousEstimate,
		daysSinceLastPurchase,
		item.totalPurchases,
	);

	// value for dateNextPurchased property
	// calculated by multiplying 24 hours(in millisecs) by the daysUntilNextPurchase,
	// then adding to the current date
	const dateNextPurchased = new Date(
		currentDate.toMillis() + daysUntilNextPurchase * ONE_DAY_IN_MILLISECONDS,
	);

	// if item is expired, calls updateDoc, only updating isChecked property and setting to 'false', all other values persist.
	// if item is not expired, else statement handles manually checking/unchecking item.
	if (isExpired) {
		await updateDoc(itemRef, { isChecked: false });
	} else {
		await updateDoc(itemRef, {
			isChecked: item.isChecked,
			dateLastPurchased: item.isChecked ? new Date() : null,
			dateNextPurchased,
			totalPurchases: item.isChecked ? increment(1) : increment(-1),
		});
	}
}

export async function deleteItem(listPath, item) {
	const listCollectionRef = collection(db, listPath, 'items');
	const itemRef = doc(listCollectionRef, item.id);

	try {
		await deleteDoc(itemRef);
	} catch (error) {
		throw error;
	}
}
