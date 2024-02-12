import { useState } from 'react';
import { addItem } from '../api/firebase';

export function ManageList({ listPath }) {
	const [itemName, setItemName] = useState('');
	const [daysUntilNextPurchase, setDaysUntilNextPurchase] = useState(0);

	const handleChangeItem = (e) => {
		setItemName(e.target.value);
	};

	const handleChangeDate = (e) => {
		setDaysUntilNextPurchase(parseInt(e.target.value));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const newItem = await addItem(listPath, {
				itemName,
				daysUntilNextPurchase,
			});
			alert('Item saved successfully.');
		} catch (error) {
			alert('Item not saved successfully.');
		}
		setItemName('');
		document.getElementById('item-form').reset();
	};

	return (
		<div>
			<form id="item-form" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="item">Item Name</label>
					<input
						value={itemName}
						onChange={handleChangeItem}
						name="itemName"
						type="text"
					/>
				</div>

				<div>
					<label htmlFor="daysUntilNextPurchase">
						How soon do you think you'll purchase this item again?
					</label>
					<ul>
						<li>
							<label htmlFor="soon"> Soon (7 days) </label>
							<input
								value={7}
								onChange={handleChangeDate}
								name="daysUntilNextPurchase"
								type="radio"
							/>
						</li>
						<li>
							<label htmlFor="kind-of-soon"> Kind of Soon (14 days)</label>
							<input
								value={14}
								onChange={handleChangeDate}
								name="daysUntilNextPurchase"
								type="radio"
							/>
						</li>
						<li>
							<label htmlFor="not-soon"> Not Soon (30 days)</label>
							<input
								value={30}
								onChange={handleChangeDate}
								name="daysUntilNextPurchase"
								type="radio"
							/>
						</li>
					</ul>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
