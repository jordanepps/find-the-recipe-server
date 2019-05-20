const xss = require('xss');

const FavoritesService = {
	getAllFavorites(db) {
		return db
			.from('user_recipe AS fav')
			.select('fav.id', 'fav.user_id', 'fav.recipe_id')
			.leftJoin('users', 'fav.user_id', 'users.id')
			.leftJoin('recipes', 'fav.recipe_id', 'recipes.id');
	},

	getById(db, id) {
		return FavoritesService.getAllFavorites(db)
			.where('id', id)
			.first();
	},
	insertFavorite(db, user, favorite) {
		const userFavorite = { user_id: user.id, recipe_id: favorite.id };
		return db
			.insert(userFavorite)
			.into('user_recipe')
			.returning('*')
			.then(([favorite]) => favorite)
			.then(favorite => FavoritesService.getById(db, favorite.id));
	},
	getFavoriteByUser(db, userId, recipe_code) {
		return FavoritesService.getAllFavorites(db)
			.where('user_id', userId)
			.where('recipes.recipe_code', recipe_code);
	}
};

module.exports = FavoritesService;
