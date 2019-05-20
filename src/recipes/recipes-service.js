const fetch = require('node-fetch');
const endpoint = 'https://api.edamam.com/search?';
const endpointKeys = `&app_id=${process.env.EDAMAM_ID}&app_key=${
	process.env.EDAMAM_KEY
}`;

const RecipesService = {
	// getAllRecipes(db) {
	// 	return db.from('recipes').select('*');
	// },
	getRecipeById(db, id) {
		return db
			.from('recipes')
			.select('*')
			.where('id', id)
			.first();
	},
	getRecipes(ingriedients) {
		const ingridentsParam = `q=${ingriedients.split(' ').join('%20')}`;
		const recipeRequest = `${endpoint}${ingridentsParam}${endpointKeys}`;
		return fetch(recipeRequest, {
			headers: { 'content-type': 'application/json' }
		})
			.then(res => res.json())
			.catch(err => err);
	},
	getRecipe(recipe) {
		const request = `${endpoint}r=${encodeURIComponent(recipe)}${endpointKeys}`;
		return fetch(request, {
			headers: { 'content-type': 'application/json' }
		})
			.then(res => res.json())
			.catch(err => err);
	},
	formatRecipe(obj) {
		const { recipe } = obj;
		if (!recipe) {
			return {
				id: obj.uri,
				name: obj.label,
				image: obj.image,
				source: obj.source,
				source_url: obj.url,
				share_url: obj.shareAs,
				health_labels: obj.healthLabels,
				cautions: obj.cautions,
				servings: obj.yield,
				calories: obj.calories,
				ingredient_lines: obj.ingredientLines
			};
		}
		return {
			id: recipe.uri,
			name: recipe.label,
			image: recipe.image,
			source: recipe.source,
			source_url: recipe.url,
			share_url: recipe.shareAs,
			health_labels: recipe.healthLabels,
			cautions: recipe.cautions,
			servings: recipe.yield,
			calories: recipe.calories,
			ingredient_lines: recipe.ingredientLines
		};
	},
	insertRecipe(db, newRecipe) {
		return db
			.insert(newRecipe)
			.into('recipes')
			.returning('*')
			.then(([recipe]) => recipe)
			.then(recipe => RecipesService.getRecipeById(db, recipe.id));
	}
};

module.exports = RecipesService;
