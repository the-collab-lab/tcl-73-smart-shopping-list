import { useState } from 'react';
import { addItem } from '../api/firebase';

export function ManageList() {
	const form = {
		itemName: '',
		daysUntilNextPurchase: 0,
	};

	const [formData, setFormData] = useState(form);

	function handleChange(e) {
		setFormData({
			...formData,
			itemName: e.target.value,
			daysUntilNextPurchase: e.target.value,
		});
		console.log(formData);
	}

	return (
		<div>
			<form>
				<div>
					<label htmlFor="item">Item Name</label>
					<input
						value={formData.itemName}
						onChange={handleChange}
						name="itemName"
						type="text"
					/>
				</div>

				<div>
					<label htmlFor="purchase-choice">
						How soon do you think you'll purchase this item again?
					</label>
					<ul>
						<li>
							<label htmlFor="soon"> Soon (7 days) </label>
							<input
								value={7}
								onChange={handleChange}
								name="daysUntilNextPurchase"
								type="radio"
							/>
						</li>
						<li>
							<label htmlFor="kind-of-soon"> Kind of Soon (14 days)</label>
							<input
								value={14}
								onChange={handleChange}
								name="daysUntilNextPurchase"
								type="radio"
							/>
						</li>
						<li>
							<label htmlFor="not-soon"> Not Soon (30 days)</label>
							<input
								value={30}
								onChange={handleChange}
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
