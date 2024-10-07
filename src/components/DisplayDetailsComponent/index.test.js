import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import DisplayDetailsComponent from "./index";

import { formData } from "../../common/common";

describe("DisplayDetailsComponent", () => {

	test("renders submitted data correctly", () => {
		const history = createMemoryHistory();
		history.push("/submitted-details", { formData });

		render(
			<Router history={history}>
				<DisplayDetailsComponent />
			</Router>
		);

		expect(screen.getByText("Name:")).toBeInTheDocument();
		expect(screen.getByText("John")).toBeInTheDocument();

		expect(screen.getByText("Email:")).toBeInTheDocument();
		expect(screen.getByText("john@example.com")).toBeInTheDocument();

		expect(screen.getByText("Age:")).toBeInTheDocument();
		expect(screen.getByText("25")).toBeInTheDocument();

		expect(screen.getByText("Gender:")).toBeInTheDocument();
		expect(screen.getByText("male")).toBeInTheDocument();
	});

	test("renders no data message when no form data is passed", () => {
		const history = createMemoryHistory();
		history.push("/submitted-details");

		render(
			<Router history={history}>
				<DisplayDetailsComponent />
			</Router>
		);

		expect(screen.getByText(/No Data Submitted/i)).toBeInTheDocument();
	});
});
