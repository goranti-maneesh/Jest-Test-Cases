import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FormApiComponent from "./index";

describe("FormApiComponent", () => {
	test("renders FormComponent initially", () => {
		render(<FormApiComponent />);
		expect(screen.getByText(/Fill the Form/i)).toBeInTheDocument();
	});

	test("switches to APIComponent after form submission", () => {
		render(<FormApiComponent />);

		fireEvent.change(screen.getByLabelText(/Name/i), {
			target: { value: "John" },
		});
		fireEvent.change(screen.getByLabelText(/Email/i), {
			target: { value: "john@example.com" },
		});
		fireEvent.change(screen.getByLabelText(/Age/i), {
			target: { value: "25" },
		});
		fireEvent.click(screen.getByText(/Submit/i));

		expect(screen.getByText(/Submitting your data/i)).toBeInTheDocument();
	});
});
