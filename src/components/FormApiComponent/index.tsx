import React, { useCallback, useState } from "react";

import ApiComponent from "../APIComponent/index.tsx";
import FormComponent from "../FormComponent/index.tsx";

import { FormDataTypes } from "../../common/types.tsx";

const FormApiComponent = () => {
	const [submittedData, setSubmittedData] = useState<FormDataTypes | null>(
		null
	);

	const handleFormSubmit = useCallback(
		(data: FormDataTypes): void => {
			setSubmittedData(data);
		},
		[submittedData]
	);

	return (
		<div>
			{!submittedData ? (
				<FormComponent onFormSubmit={handleFormSubmit} />
			) : (
				<ApiComponent formData={submittedData} />
			)}
		</div>
	);
};

export default FormApiComponent;
