const Clarifai = require('clarifai');
const clarifaiApp = new Clarifai.App({
	apiKey: process.env.CLARIFAI_KEY
});
const model = 'bd367be194cf45149e75f01d59f77ba7';

const IngredientsService = {
	getIngredients(image) {
		return clarifaiApp.models
			.predict(model, image)
			.then(results => results)
			.catch(err => err);
	},
	handleIngredients(results) {
		const data = results.outputs[0].data.concepts;

		const ingredients = data
			.filter(ingredient => Math.floor(ingredient.value * 100) >= 83)
			.map(ingredient => {
				const name = ingredient.name.replace(/\s+/g, '');
				const value = Math.floor(ingredient.value * 100);
				return {
					name,
					value
				};
			})
			.slice(0, 6);
		return ingredients;
	}
};

module.exports = IngredientsService;
