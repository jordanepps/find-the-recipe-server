const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Ingredients Endpoint', () => {
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
				.expect(400, { error: `Input provided is not a valid image` });
		});

		it('responds with 200 and ingredients array with valid image', () => {
			const testIngredients = helpers.makeTestBurgerIngredients();
			return supertest(app)
				.get(`/api/ingredients?image=${helpers.testBurgerImage}`)
				.expect(200, testIngredients);
		});
	});
});
