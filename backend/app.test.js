const request = require("supertest");
const app = require("./app");
const User = required("../models/users");

it("POST /signin", async () => {
	const res = await request(app).post("/signin");

	expect(res.statusCode).toBe(200);
});

describe("POST /users/signin", () => {
	it("should authenticate a user", async () => {
		const data = { username: "okok", password: "ok" };
		const response = await request(app)
			.post("/users/signin")
			.send(data)
			.expect(200);
		console.log(response.status, response.body);
		expect(response.body.result).toBe(true);
	});
});
