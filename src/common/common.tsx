import { FormDataTypes, ResponseDataTypes } from "./types";

export const apiUrl: string = "https://jsonplaceholder.typicode.com/posts";
export const formData: FormDataTypes = {
	age: 25,
	email: "john@example.com",
	gender: "male",
	name: "John",
};
export const dataResponse: ResponseDataTypes = {
	id: "1",
	name: "John",
	email: "john@example.com",
	age: 25,
	gender: "male",
};
