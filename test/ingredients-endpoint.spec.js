const app = require('../src/app');

describe('ingredients Endpoint', () => {
	describe('POST /api/ingredients', () => {
		it(`responds with 400 when 'image_link' is missing`, () => {
			return supertest(app)
				.post('/api/ingredients')
				.expect(400, { error: `Missing 'image_link' in request body` });
		});

		it(`responds with 400 when a broken link is provided`, () => {
			const badLink = { image_link: 'https://not-a-real-image.jpg' };
			return supertest(app)
				.post('/api/ingredients')
				.send(badLink)
				.expect(400, { error: `input provided is not a valid image` });
		});
	});
});
