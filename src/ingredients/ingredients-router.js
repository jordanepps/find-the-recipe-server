const express = require('express');
const path = require('path');
const IngredientsService = require('./ingredients-service');

const ingredientsRouter = express.Router();
const jsonBodyParser = express.json();

ingredientsRouter.route('/').post(jsonBodyParser, (req, res, next) => {
	const { image_link } = req.body;
	const image = { image_link };

	for (const [key, value] of Object.entries(image))
		if (value == null)
			return res.status(400).json({
				error: `Missing '${key}' in request body`
			});

	IngredientsService.getIngredients(image_link)
		.then(results => {
			res.send(results).end();
		})
		.catch(error => {
			res.status(400).json({ error: 'input provided is not a valid image' });
		});

	// res.status(201).end();
});

module.exports = ingredientsRouter;
