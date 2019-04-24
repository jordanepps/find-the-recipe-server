const fetch = require('node-fetch');
const endpoint = 'https://api.edamam.com/search?';
const endpointKeys = `&app_id=${process.env.EDAMAM_ID}&app_key=${
	process.env.EDAMAM_KEY
}`;

const RecipesService = {
	getRecipes(ingriedients) {
		const ingridentsParam = `q=${ingriedients.split(' ').join('+')}`;
		const recipeRequest = `${endpoint}${ingridentsParam}${endpointKeys}`;
		return fetch(recipeRequest, {
			headers: { 'content-type': 'application/json' }
		})
			.then(res => res.json())
			.catch(err => err);
	}
};

module.exports = RecipesService;
