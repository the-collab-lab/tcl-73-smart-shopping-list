import { shareList } from '../api/firebase';
import { useState } from 'react';
import { useAuth } from '../api';
import { validateEmail } from '../utils/emailValidator.js';
import { Button } from '@radix-ui/themes';
import { SignInAlert } from './SignInAlert.jsx';

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
			setEmailValidator(
				'Please enter a valid email, e.g., example@example.com.',
			);
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
			const result = await shareList(listPath, currentUserId, recipientEmail);
			if (result.success) {
				alert(result.message);
				setRecipientEmail('');
			} else {
				alert('Failed to share the list.');
			}
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
				onChange={handleChange}
			/>
			<p>{emailValidator}</p>

			{user ? (
				<Button className="custom-button" type="submit">
					Submit
				</Button>
			) : (
				<SignInAlert action={'Submit'} />
			)}
		</form>
	);
}

// We want to further refactor our validators. Below is some code we would like to further refactor and impliment at a later date.
// import { shareList } from '../api/firebase';
// import { useState } from 'react';
// import { useAuth } from '../api';
// import { validateEmail } from '../utils/emailValidator.js';

// export function ShareList({ listPath }) {
// 	const [recipientEmail, setRecipientEmail] = useState('');
// 	const [isValid, setIsValid] = useState(false);
// 	const [emailValidationMessage, setEmailValidationMessage] = useState('');
// 	const [hasSubmitted, setHasSubmitted] = useState(false);
// 	const { user } = useAuth();
// 	const currentUserId = user?.uid;

// const handleChange = (e) => {
//     setRecipientEmail(e.target.value);

// 	if (hasSubmitted) {
// 	// user has submitted, so update validation on change
// 	const isValidEmail = validateEmail(e.target.value);
// 			setIsValid(isValidEmail);
// 			setEmailValidationMessage(isValidEmail ? '' : 'Please enter a valid email');
// 	}
// };

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     setHasSubmitted(true);

// 	const isValidEmail = validateEmail(recipientEmail);

// 	// check for empty string
//     if (!recipientEmail) {
//         setIsValid(false);
//         setEmailValidationMessage('Please enter a valid email');
//         alert('Cannot submit without an email.');
//         setHasSubmitted(false);
//         return;
//     }
// 	//check if email is not valid
//     if (!isValidEmail) {
//         setIsValid(false);
//         setEmailValidationMessage('Please enter a valid email');
//         alert('Cannot submit with an invalid email');
//         return;
//     }
//     try {
//         await shareList(listPath, currentUserId, recipientEmail);
//         alert('List was successfully shared!');
//         setRecipientEmail('');
//         setHasSubmitted(false);
//     } catch (error) {
//         alert(error);
//     }
// };
// return (
// 			<form onSubmit={handleSubmit}>
// 				<p>You can share this shopping list with existing users!</p>
// 				<label htmlFor="shareEmail">Enter recipient's email:</label>
// 				<input
// 					id="shareEmail"
// 					type="text"
// 					value={recipientEmail}
// 					onChange={handleChange}
// 				/>
// 				<p>{emailValidationMessage}</p>
// 				<button type="submit">Submit</button>
// 			</form>
// 		);
// 	}
