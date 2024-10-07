import React from "react";
import {
	render,
	screen,
	fireEvent,
	waitFor,
	act,
	cleanup,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import APIComponent from "./index";

import { formData, dataResponse } from "../../common/common";

const renderApiComponent = (history) => {
	render(
		<Router history={history}>
			<APIComponent formData={formData} />
		</Router>
	);
};

describe("APIComponent", () => {
	let spyFetch = null;

	beforeEach(() => {
		spyFetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () =>
					Promise.resolve({
						dataResponse
					}),
			})
		);
		global.fetch = spyFetch;
	});

	afterEach(() => {
		spyFetch.mockClear();
		cleanup();
	});

	test("Submits the form data and redirects to details route", async () => {
		const history = createMemoryHistory();

		await act(async () => {
			renderApiComponent(history);
		});

		expect(screen.getByText(/Submitting your data/i)).toBeInTheDocument();

		expect(spyFetch).toHaveBeenCalledWith(
			"https://jsonplaceholder.typicode.com/posts",
			expect.objectContaining({
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			})
		);

		const bodyObject = JSON.parse(spyFetch.mock.calls[0][1].body);
		expect(bodyObject.name).toBe("John");
		expect(bodyObject.email).toBe("john@example.com");

		await waitFor(() => {
			expect(history.location.pathname).toBe("/submitted-details");
		});
	});

	test("Handles fetch failure and shows retry button", async () => {
		const history = createMemoryHistory();

		spyFetch.mockImplementationOnce(
			() =>
				new Promise((resolve, reject) => {
					setTimeout(() => reject(new Error("Fetch failed")), 500);
				})
		);

		await act(async () => {
			renderApiComponent(history);
		});

		await waitFor(() => {
			expect(
				screen.getByText(/Submitting your data/i)
			).toBeInTheDocument();
		});

		await waitFor(() => {
			expect(
				screen.getByText(/Something Went Wrong/i)
			).toBeInTheDocument();
			expect(screen.getByText(/Retry/i)).toBeInTheDocument();
		});
	});

	test("Retries submission when the retry button is clicked", async () => {
		const history = createMemoryHistory();
		spyFetch.mockImplementationOnce(() =>
			Promise.reject((resolve, reject) =>
				reject(new Error("Fetch failed"))
			)
		);

		await act(async () => {
			renderApiComponent(history);
		});

		await waitFor(() => {
			expect(
				screen.getByText(/Something Went Wrong/i)
			).toBeInTheDocument();
			expect(screen.getByText(/Retry/i)).toBeInTheDocument();
		});

		spyFetch.mockImplementationOnce(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve({}),
			})
		);

		fireEvent.click(screen.getByText(/Retry/i));

		expect(spyFetch).toHaveBeenCalledTimes(2);

		await waitFor(() => {
			expect(history.location.pathname).toBe("/submitted-details");
		});
	});
});
