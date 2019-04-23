const app = require('../src/app');

describe('ingredients Endpoint', () => {
	describe('GET /api/ingredients', () => {
		it(`responds with 400 when 'image_link' is missing`, () => {
			return supertest(app)
				.get('/api/ingredients')
				.expect(400, { error: `Missing image in request parameter` });
		});

		it(`responds with 400 when a broken link is provided`, () => {
			const badLink = 'https://not-a-real-image.jpg';
			return supertest(app)
				.get(`/api/ingredients?image=${badLink}`)
				.expect(400, { error: `input provided is not a valid image` });
		});
	});
});
