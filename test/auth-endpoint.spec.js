const knex = require('knex');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Auth endpoint', () => {
	let db;

	const testUsers = helpers.makeUsersArray();
	const testUser = testUsers[0];

	before('make knex instance', () => {
		db = knex({
			client: 'pg',
			connection: process.env.TEST_DB_URL
		});
		app.set('db', db);
	});

	after('disconnect from db', () => db.destroy());

	before('cleanup', () => helpers.cleanTables(db));

	afterEach('cleanup', () => helpers.cleanTables(db));

	describe('POST /api/auth/login', () => {
		beforeEach('insert users', () => helpers.seedUsers(db, testUsers));

		const requiredFields = ['user_name', 'password'];

		requiredFields.forEach(field => {
			const loginAttemptBody = {
				user_name: testUser.user_name,
				password: testUser.password
			};

			it(`responds with 400 required error when '${field}' is missing`, () => {
				delete loginAttemptBody[field];

				return supertest(app)
					.post('/api/auth/login')
					.send(loginAttemptBody)
					.expect(400, {
						error: `Missing '${field}' in request body`
					});
			});
		});

		it(`responds 400 'invalid username or password' when bad username`, () => {
			const userInvalidUser = { user_name: 'user-not', password: 'existy' };
			return supertest(app)
				.post('/api/auth/login')
				.send(userInvalidUser)
				.expect(400, { error: `Incorrect username or password` });
		});

		it(`responds 400 'invalid username or password' when bad password`, () => {
			const userInvalidPass = {
				user_name: testUser.user_name,
				password: 'incorrect'
			};
			return supertest(app)
				.post('/api/auth/login')
				.send(userInvalidPass)
				.expect(400, { error: `Incorrect username or password` });
		});
	});

	describe('POST /api/auth/refresh', () => {
		beforeEach('insert users', () => helpers.seedUsers(db, testUsers));

		it('responds 200 and JWT auth token using secret', () => {
			const expectedToken = jwt.sign(
				{ user_id: testUser.id },
				process.env.JWT_SECRET,
				{
					subject: testUser.user_name,
					expiresIn: process.env.JWT_EXPIRY,
					algorithm: 'HS256'
				}
			);

			return supertest(app)
				.post('/api/auth/refresh')
				.set('Authorization', helpers.makeAuthHeader(testUser))
				.expect(200);
		});
	});
});
