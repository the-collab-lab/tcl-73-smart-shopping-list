import { shareList } from '../api/firebase';
import { useState } from 'react';
import { useAuth } from '../api';
import { validateEmail } from '../utils/emailValidator.js';

export function ShareList({ listPath }) {
	const [recipientEmail, setRecipientEmail] = useState('');
	const [emailValidator, setEmailValidator] = useState('');
	const [isValid, setIsValid] = useState(false);
	const { user } = useAuth();
	const currentUserId = user?.uid;

	const handleChange = (e) => {
		setRecipientEmail(e.target.value);

		if (validateEmail(e.target.value)) {
			setEmailValidator('');
			setIsValid(true);
		} else {
			setEmailValidator('Email is not valid');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (recipientEmail === '') {
			return alert('Cannot submit without an email.');
		}

		if (!isValid) {
			return alert('Cannot submit with an invalid email');
		}

		try {
			await shareList(listPath, currentUserId, recipientEmail);
			alert('List was successfully shared!');
			setRecipientEmail('');
		} catch (error) {
			alert(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<p>You can share this shopping list with existing users!</p>
			<label htmlFor="shareEmail">Enter recipient's email:</label>
			<input
				id="shareEmail"
				type="text"
				value={recipientEmail}
				required
				onChange={handleChange}
			/>
			<button type="submit">Submit</button>
		</form>
	);
}
