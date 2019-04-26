const express = require('express');
const RecipesSerivce = require('./recipes-service');

const recipesRouter = express.Router();
const jsonBodyParser = express.json();

recipesRouter.route('/').get(jsonBodyParser, (req, res, next) => {
	const { i } = req.query;

	if (i == null)
		return res.status(400).json({ error: `Missing 'i' in request parameter` });

	let recipes;
	RecipesSerivce.getRecipes(i)
		.then(results => {
			recipes = results.hits;
			const formattedRecipes = recipes.map(RecipesSerivce.formatRecipe);
			res.send(formattedRecipes).end();
		})
		.catch(err => {
			res.status(400).json({ error: 'Ingredients provided are not valid' });
		});
});

module.exports = recipesRouter;
