import { addItem } from '../api/firebase';
import { useRef } from 'react';
import { isInputEmpty, isItemDuplicate } from '../utils/itemValidator.js';
import { SignInAlert } from './SignInAlert.jsx';
import { useAuth } from '../api/useAuth.jsx';
import '../custom-styles.css';
import { Button } from '@radix-ui/themes';

export function AddItem({ listPath, data }) {
	const formRef = useRef(null);
	const { user } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const itemName = formData.get('itemName');
		const daysUntilNextPurchase = parseInt(
			formData.get('daysUntilNextPurchase'),
		);

		try {
			if (isInputEmpty(itemName)) {
				formRef.current.reset();
				return alert('Cannot submit without an item name');
			}

			if (isItemDuplicate(itemName, data)) {
				formRef.current.reset();
				return alert(
					'This item is already in the list, cannot submit a duplicate.',
				);
			}

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
				<input name="itemName" type="text" id="item" />
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
							defaultChecked
						/>
					</li>
					<li>
						<label htmlFor="kind-of-soon"> Kind of Soon (14 days)</label>
						<input
							value={14}
							name="daysUntilNextPurchase"
							type="radio"
							id="kind-of-soon"
						/>
					</li>
					<li>
						<label htmlFor="not-soon"> Not Soon (30 days)</label>
						<input
							value={30}
							name="daysUntilNextPurchase"
							type="radio"
							id="not-soon"
						/>
					</li>
				</ul>
			</div>
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
