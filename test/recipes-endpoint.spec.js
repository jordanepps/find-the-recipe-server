const app = require('../src/app');

describe('Recipes Endpoint', () => {
	describe('POST /api/recipes', () => {
		it(`responds with 400 when 'image_link' is missing`, () => {
			return supertest(app)
				.post('/api/recipes')
				.expect(400, { error: `Missing 'image_link' in request body` });
		});
	});
});
