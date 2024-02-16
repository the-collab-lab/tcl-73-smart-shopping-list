import { addItem } from '../api/firebase';
import { useRef } from 'react';

export function ManageList({ listPath }) {
	const formRef = useRef();

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
		} catch (error) {
			alert('There was a problem');
		}

		formRef.current.reset();
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
