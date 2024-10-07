export interface FormDataTypes {
	name: string;
	email: string;
	age: number;
	gender: string;
}

export interface ApiComponentPropsTypes {
	formData: FormDataTypes;
}

export interface ResponseDataTypes {
	id: string;
	name: string;
	email: string;
	age: number;
	gender: string;
}

export interface FetchOptionsTypes {
	method: string;
	headers: {
		"Content-Type": string;
	};
	body: string;
}

export interface FormErrorTypes {
	name: string;
	email: string;
	age: string;
}

export interface FormComponentPropsTypes {
	onFormSubmit: (FormDataTypes) => void;
}

export interface FormInputPropsTypes {
	label: string;
	name: string;
	value: string | number;
	type: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
	options?: {
		label: string;
		value: string;
	}[];
}
