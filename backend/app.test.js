const request = require("supertest");
const app = require("./app");




describe("DELETE /users/:token", () => {
	it("should delete a user", async () => {
		const token = 'QSAc-ea3EGgOYy-nryBbXzLCVaBjes7B'
		const response = await request(app)
			.delete(`/users/${token}`)
			.expect(200);
		console.log(response.status, response.body);
		expect(response.body.result).toBe(true);
	});
});



