const Clarifai = require('clarifai');
const clarifaiApp = new Clarifai.App({
	apiKey: process.env.CLARIFAI_KEY
});
const model = 'bd367be194cf45149e75f01d59f77ba7';

const RecipesService = {
	getIngredients(image) {
		return clarifaiApp.models
			.predict(model, image)
			.then(results => {
				return results;
			})
			.catch(error => {
				console.log(error);
			});
	}
};

module.exports = RecipesService;
