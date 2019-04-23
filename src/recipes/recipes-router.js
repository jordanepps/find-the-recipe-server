const express = require('express');
const path = require('path');
const RecipesService = require('./recipes-service');

const recipesRouter = express.Router();
const jsonBodyParser = express.json();

recipesRouter.route('/').post(jsonBodyParser, (req, res, next) => {
	const { image_link } = req.body;
	const image = { image_link };

	for (const [key, value] of Object.entries(image))
		if (value == null)
			return res.status(400).json({
				error: `Missing '${key}' in request body`
			});

	RecipesService.getIngredients(image_link).then(results => {
		res.send(results).end();
	});

	// res.status(201).end();
});

module.exports = recipesRouter;
