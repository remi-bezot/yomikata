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

const request = require("supertest");
const app = require("./app");

describe("POST /users/signup", () => {
	it("should authenticate a user", async () => {
		const data = {
			username: "mohamed",
			password: "mohamed",
			mail: "Kesroui@gmail.com",
			phoneNumber: "056853329",
		};

		const response = await request(app)
			.post("/bars/users/signup")
			.send(data)
			.expect(200);
		console.log(response.status, response.body);

		if (response.body.result) {
			expect(response.body.result).toBe(true);
		} else {
			expect(response.body.result).toBe(false);
			expect(response.body.error).toBe("User already exists");
		}
	});
});
