const bcrypt = require('bcryptjs');
const testBurgerImage = `https://clarifai.com/cms-assets/20180320212159/food-003.jpg`;

function makeUsersArray() {
	return [
		{
			id: 1,
			user_name: 'test-user-1',
			full_name: 'Test User 1',
			password: 'password'
		},
		{
			id: 2,
			user_name: 'test-user-2',
			full_name: 'Test User 2',
			password: 'password'
		},
		{
			id: 3,
			user_name: 'test-user-3',
			full_name: 'Test User 3',
			password: 'password'
		},
		{
			id: 4,
			user_name: 'test-user-4',
			full_name: 'Test User 4',
			password: 'password'
		}
	];
}

function makeTestBurgerIngredients() {
	return [
		{
			name: 'bacon',
			value: 97
		},
		{
			name: 'cheese',
			value: 93
		},
		{
			name: 'bun',
			value: 86
		},
		{
			name: 'cheddar',
			value: 86
		},
		{
			name: 'onion',
			value: 83
		},
		{
			name: 'beef',
			value: 83
		}
	];
}

function makeFixtures() {
	const testUsers = makeUsersArray();
}

function cleanTables(db) {
	return db.raw(
		`TRUNCATE
      users,
      recipes,
      user_recipe
      RESTART IDENTITY CASCADE`
	);
}

function seedUsers(db, users) {
	const preppedUsers = users.map(user => ({
		...user,
		password: bcrypt.hashSync(user.password, 1)
	}));
	return db
		.into('users')
		.insert(preppedUsers)
		.then(() =>
			// update the auto sequence to stay in sync
			db.raw(`SELECT setval('users_id_seq', ?)`, [users[users.length - 1].id])
		);
}

module.exports = {
	testBurgerImage,
	makeTestBurgerIngredients,
	makeUsersArray,
	makeFixtures,
	cleanTables,
	seedUsers
};
