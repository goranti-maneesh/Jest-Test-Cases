import React from "react";

import { FormInputPropsTypes } from "../../common/types";

const FormInput = (props: FormInputPropsTypes): JSX.Element => {
	const { label, name, value, type, handleChange, error, options } = props;

	return (
		<div>
			{type === "radio" ? (
				<div className="gender-inputs">
					<p className="gender-text">Gender:</p>
					{options && options.map((option) => (
						<label key={option.value}>
							<input
								type="radio"
								name={name}
								value={option.value}
								checked={value === option.value}
								onChange={handleChange}
							/>
							{option.label}
						</label>
					))}
				</div>
			) : (
				<div>
					<label htmlFor={name}>{label}:</label>
					<input
						id={name}
						type={type}
						name={name}
						value={value}
						onChange={handleChange}
					/>
				</div>
			)}
			{error && <p className="error">{error}</p>}
		</div>
	);
};

export default FormInput;
