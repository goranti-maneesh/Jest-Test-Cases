import React from "react";
import { useLocation } from "react-router-dom";

const DisplayDetailsComponent = (): JSX.Element => {
	const location = useLocation();
	const { formData } = location.state || {};

	if (!formData) return <h3>No Data Submitted!</h3>;

	return (
		<div className="display-container">
			<h2>Submitted Details</h2>
			<p>
				<strong>Name:</strong> {formData.name}
			</p>
			<p>
				<strong>Email:</strong> {formData.email}
			</p>
			<p>
				<strong>Age:</strong> {formData.age}
			</p>
			<p>
				<strong>Gender:</strong> {formData.gender}
			</p>
		</div>
	);
};

export default DisplayDetailsComponent;
