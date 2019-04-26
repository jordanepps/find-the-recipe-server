const fetch = require('node-fetch');
const endpoint = 'https://api.edamam.com/search?';
const endpointKeys = `&app_id=${process.env.EDAMAM_ID}&app_key=${
	process.env.EDAMAM_KEY
}`;

const RecipesService = {
	getRecipes(ingriedients) {
		const ingridentsParam = `q=${ingriedients.split(' ').join('%20')}`;
		const recipeRequest = `${endpoint}${ingridentsParam}${endpointKeys}`;
		return fetch(recipeRequest, {
			headers: { 'content-type': 'application/json' }
		})
			.then(res => res.json())
			.catch(err => err);
	},
	formatRecipe(obj) {
		const { recipe } = obj;
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
	}
};

module.exports = RecipesService;
