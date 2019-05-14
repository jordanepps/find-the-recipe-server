const express = require('express');
const RecipesService = require('./recipes-service');

const recipesRouter = express.Router();
const jsonBodyParser = express.json();

recipesRouter.route('/').get(jsonBodyParser, (req, res, next) => {
	const { i, r } = req.query;

	if (i == null && r == null)
		return res
			.status(400)
			.json({ error: `Missing 'i' or 'r' in request parameter` });

	if (r == null && i != null) {
		let recipes;
		RecipesService.getRecipes(i)
			.then(results => {
				recipes = results.hits;
				const formattedRecipes = recipes.map(RecipesService.formatRecipe);
				res.send(formattedRecipes).end();
			})
			.catch(err => {
				res.status(400).json({ error: 'Ingredients provided are not valid' });
			});
	}

	if (i == null && r != null) {
		RecipesService.getRecipe(r)
			.then(results => {
				const formattedRecipe = results.map(RecipesService.formatRecipe);

				res.send(formattedRecipe[0]).end();
			})
			.catch(err => {
				res.status(400).json({ error: 'Recipe provided is not valid' });
			});
	}
});

module.exports = recipesRouter;
