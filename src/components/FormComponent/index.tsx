import React, { useState } from "react";
import FormInput from "../FormInput/index.tsx";

import {
	FormDataTypes,
	FormErrorTypes,
	FormComponentPropsTypes,
} from "../../common/types.tsx";

const FormComponent = (props: FormComponentPropsTypes): JSX.Element => {
	const [formData, setFormData] = useState<FormDataTypes>({
		name: "",
		email: "",
		age: 0,
		gender: "male",
	});

	const [errors, setErrors] = useState<FormErrorTypes>({
		name: "",
		email: "",
		age: "",
	});

	const { onFormSubmit } = props;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const validate = (): boolean => {
		const newErrors: FormErrorTypes = {
			name: "",
			email: "",
			age: "",
		};

		if (!formData.name) newErrors.name = "Name is required";
		if (!formData.email.includes("@")) newErrors.email = "Email is invalid";
		if (!formData.age || isNaN(formData.age)) {
			newErrors.age = "Age is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (validate()) {
			onFormSubmit(formData);
		}
	};

	return (
		<div className="form-container">
			<h2>Fill the Form</h2>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Name"
					name="name"
					type="text"
					value={formData.name}
					handleChange={handleChange}
					error={errors.name}
				/>

				<FormInput
					label="Email"
					name="email"
					type="email"
					value={formData.email}
					handleChange={handleChange}
					error={errors.email}
				/>

				<FormInput
					label="Age"
					name="age"
					type="number"
					value={formData.age}
					handleChange={handleChange}
					error={errors.age}
				/>

				<FormInput
					label="Gender"
					name="gender"
					type="radio"
					value={formData.gender}
					handleChange={handleChange}
					options={[
						{ label: "Male", value: "male" },
						{ label: "Female", value: "female" },
						{ label: "Other", value: "other" },
					]}
				/>

				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default FormComponent;
