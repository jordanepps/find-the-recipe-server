const app = require('../src/app');

describe('App', () => {
	it('GET / responds with 200 containing "Find The Recipe API!"', () => {
		return supertest(app)
			.get('/')
			.expect(200, 'Find The Recipe API!');
	});
});
