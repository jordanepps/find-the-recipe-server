const express = require('express');
const IngredientsService = require('./ingredients-service');

const ingredientsRouter = express.Router();
const jsonBodyParser = express.json();

ingredientsRouter.route('/').get(jsonBodyParser, (req, res, next) => {
	const { image } = req.query;
	const imageLink = { image };

	for (const [key, value] of Object.entries(imageLink))
		if (value == null)
			return res.status(400).json({
				error: `Missing ${key} in request parameter`
			});

	IngredientsService.getIngredients(imageLink.image)
		.then(results => {
			const ingredients = IngredientsService.handleIngredients(results);
			res.send(ingredients).end();
		})
		.catch(err => {
			res.status(400).json({ error: 'input provided is not a valid image' });
		});
});

module.exports = ingredientsRouter;
