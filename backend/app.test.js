const request = require("supertest");
const app = require("./app");

describe("DELETE /users/:token", () => {
	it("should delete a user", async () => {
		const token = "QSAc-ea3EGgOYy-nryBbXzLCVaBjes7B";
		const response = await request(app).delete(`/users/${token}`).expect(200);
		console.log(response.status, response.body);

		// Vérifie que la réponse correspond à l'objet attendu
		expect(response.body).toMatchObject({
			word: {
				word: expect.any(String),
				meaning: expect.any(String),
				furigana: expect.any(String),
				romaji: expect.any(String),
				level: expect.any(Number),
			},
		});
	});
});
