import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
	ApiComponentPropsTypes,
	FetchOptionsTypes,
	ResponseDataTypes,
} from "../../common/types";
import { apiUrl } from "../../common/common.tsx";

const APIComponent = (props: ApiComponentPropsTypes): JSX.Element => {
	const [error, setError] = useState<boolean>(false);
	const { formData } = props;
	const history = useHistory();

	const submitData = async (): Promise<void> => {
		setError(false);
		const options: FetchOptionsTypes = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		};

		try {
			const response: Response = await fetch(apiUrl, options);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data: ResponseDataTypes = await response.json();

			history.push({
				pathname: "/submitted-details",
				state: { formData },
			});
		} catch (error) {
			setError(true);
			console.error(
				"There was a problem with the fetch operation:",
				error
			);
		}
	};

	useEffect(() => {
		if (formData) submitData();
	}, [formData, history]);

	const failureView = (): JSX.Element => {
		return (
			<div>
				<h1>Something Went Wrong</h1>
				<button type="button" onClick={submitData}>
					Retry
				</button>
			</div>
		);
	};

	return <div>{error ? failureView() : <p>Submitting your data...</p>}</div>;
};

export default APIComponent;
