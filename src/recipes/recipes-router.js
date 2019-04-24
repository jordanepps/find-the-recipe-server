const express = require('express');
const RecipesSerivce = require('./recipes-service');

const recipesRouter = express.Router();
const jsonBodyParser = express.json();

recipesRouter.route('/').get(jsonBodyParser, (req, res, next) => {
	const { i } = req.query;
	let recipes;
	RecipesSerivce.getRecipes(i)
		.then(results => {
			console.log(results.hits);
			recipes = results.hits;
			res.send(recipes).end();
		})
		.catch(err => {
			console.log(err);
		});
});

module.exports = recipesRouter;
