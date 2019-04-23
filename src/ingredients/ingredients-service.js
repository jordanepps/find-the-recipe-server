const Clarifai = require('clarifai');
const clarifaiApp = new Clarifai.App({
	apiKey: process.env.CLARIFAI_KEY
});
const model = 'bd367be194cf45149e75f01d59f77ba7';

const IngredientsService = {
	getIngredients(image) {
		return clarifaiApp.models
			.predict(model, image)
			.then(results => {
				return results;
			})
			.catch(err => err);
	},
	handleIngredients(results) {
		const data = results.outputs[0].data.concepts;

		const ingredients = data.map(ingredient => {
			return {
				name: ingredient.name,
				value: Math.floor(ingredient.value * 100)
			};
		});

		return ingredients;
	}
};

module.exports = IngredientsService;
