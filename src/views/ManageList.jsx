import { addItem, shareList } from '../api/firebase';
import { useRef, useState } from 'react';
import { useAuth } from '../api';
import { validateEmail } from '../utils/emailValidator.js';

function AddItem({ listPath }) {
	const formRef = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const itemName = formData.get('itemName');
		const daysUntilNextPurchase = parseInt(
			formData.get('daysUntilNextPurchase'),
		);

		try {
			await addItem(listPath, {
				itemName,
				daysUntilNextPurchase,
			});

			alert('Item saved successfully');
			formRef.current.reset();
		} catch (error) {
			alert(`There was a problem: ${error.message}`);
		}
	};

	return (
		<form ref={formRef} onSubmit={handleSubmit}>
			<div>
				<label htmlFor="item">Item Name</label>
				<input name="itemName" type="text" id="item" required />
			</div>

			<div>
				<label htmlFor="daysUntilNextPurchase">
					How soon do you think you'll purchase this item again?
				</label>

				<p>Please select an option:</p>

				<ul>
					<li>
						<label htmlFor="soon"> Soon (7 days)</label>
						<input
							value={7}
							name="daysUntilNextPurchase"
							type="radio"
							id="soon"
							required
						/>
					</li>
					<li>
						<label htmlFor="kind-of-soon"> Kind of Soon (14 days)</label>
						<input
							value={14}
							name="daysUntilNextPurchase"
							type="radio"
							id="kind-of-soon"
							required
						/>
					</li>
					<li>
						<label htmlFor="not-soon"> Not Soon (30 days)</label>
						<input
							value={30}
							name="daysUntilNextPurchase"
							type="radio"
							id="not-soon"
							required
						/>
					</li>
				</ul>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}

function ShareList({ listPath }) {
	const [recipientEmail, setRecipientEmail] = useState('');
	const [emailValidator, setEmailValidator] = useState('');
	const [isValid, setIsValid] = useState(false);
	const { user } = useAuth();
	const currentUserId = user?.uid;
	console.log(currentUserId);

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
		<form id="shareListForm" onSubmit={handleSubmit}>
			<div>
				<p>You can share this shopping list with existing users!</p>
				<label htmlFor="shareForm">Enter recipient's email:</label>
				<input
					id="shareForm"
					type="text"
					value={recipientEmail}
					// required
					onChange={handleChange}
				/>
				<p>{emailValidator}</p>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}

export function ManageList({ listPath }) {
	return (
		<div>
			<AddItem listPath={listPath} />
			<ShareList listPath={listPath} />
		</div>
	);
}
