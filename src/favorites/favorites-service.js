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
			.where('fav.id', id)
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
	},
	removeFavorite(db, user, recipe) {
		console.log(recipe.id);
		return db
			.from('recipes')
			.select('*')
			.where('recipe_code', recipe.id)
			.first()
			.then(recipe =>
				db
					.from('user_recipe')
					.where('recipe_id', recipe.id)
					.where('user_id', user.id)
					.del()
			)
			.then(() =>
				db
					.from('recipes')
					.where('recipe_code', recipe.id)
					.del()
			);
	},
	getAllFavoritesByUser(db, user) {
		return FavoritesService.getAllFavorites(db)
			.where('fav.user_id', user.id)
			.then(recipeFav => {
				let recipeIds = recipeFav.map(recipe => recipe.recipe_id);
				return recipeIds;
			})
			.then(recipeIds => {
				return db
					.from('recipes')
					.select('*')
					.whereIn('id', recipeIds);
			});
	}
};

module.exports = FavoritesService;
