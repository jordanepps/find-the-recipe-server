const app = require('../src/app');

describe('Recipes Endpoint', () => {
	describe('Get /api/recipes', () => {
		it(`responds with 400 when 'i' is missing`, () => {
			return supertest(app)
				.get('/api/recipes')
				.expect(400, { error: `Missing 'i' or 'r' in request parameter` });
		});
	});
});
