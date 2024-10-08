import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FormComponent from "./index";

import { formData } from "../../common/common.tsx";

describe("FormComponent", () => {
	const onFormSubmit = jest.fn();

	beforeEach(() => {
		render(<FormComponent onFormSubmit={onFormSubmit} />);
	});

	test("Renders the form", () => {
		expect(screen.getByText(/Fill the Form/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
		expect(screen.getByText(/Gender/i)).toBeInTheDocument();
	});

	test("Validates form inputs and dispaly errors", () => {
		fireEvent.click(screen.getByText(/Submit/i));

		expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
		expect(screen.getByText(/Email is invalid/i)).toBeInTheDocument();
		expect(screen.getByText(/Age is required/i)).toBeInTheDocument();
	});

	test("Submits the form with valid data", () => {
		fireEvent.change(screen.getByLabelText(/Name/i), {
			target: { value: "John" },
		});
		fireEvent.change(screen.getByLabelText(/Email/i), {
			target: { value: "john@example.com" },
		});
		fireEvent.change(screen.getByLabelText(/Age/i), {
			target: { value: 25 },
		});

		const radioButtons = screen.getAllByLabelText(/Male/i);
		fireEvent.click(radioButtons[0]);

		fireEvent.click(screen.getByText(/Submit/i));

		expect(onFormSubmit).toHaveBeenCalledWith({
			age: 25,
			email: "john@example.com",
			gender: "male",
			name: "John",
		});
	});
});
