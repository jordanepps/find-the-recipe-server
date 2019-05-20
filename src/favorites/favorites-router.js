const express = require('express');
const FavoritesService = require('./favorites-service');
const RecipesService = require('../recipes/recipes-service');
const AuthService = require('../auth/auth-service');
const { requireAuth } = require('../middleware/jwt-auth');

const favoritesRouter = express.Router();
const jsonBodyParser = express.json();

favoritesRouter
	.route('/')
	.all(requireAuth)
	.post(jsonBodyParser, (req, res, next) => {
		const {
			calories,
			cautions,
			health_labels,
			id,
			image,
			ingredient_lines,
			name,
			servings,
			source,
			source_url
		} = req.body.recipe;

		const auth = req.get('Authorization');
		const payload = AuthService.verifyJwt(auth.slice(7, auth.length));

		const newRecipe = {
			recipe_name: name,
			calories: parseInt(calories),
			cautions,
			health_labels,
			recipe_code: id,
			image,
			ingredient_lines,
			servings,
			source,
			source_url
		};

		for (const [key, value] of Object.entries(newRecipe))
			if (value == null)
				return res.status(400).json({
					error: `Missing '${key}' in request body`
				});

		RecipesService.insertRecipe(req.app.get('db'), newRecipe)
			.then(recipe =>
				AuthService.getUserWithUserName(req.app.get('db'), payload.sub).then(
					user =>
						FavoritesService.insertFavorite(req.app.get('db'), user, recipe)
				)
			)
			.then(fav => {
				if (fav) return res.status(204).end();
			});
	})
	.get(jsonBodyParser, (req, res, next) => {
		const { recipe_code } = req.query;
		const auth = req.get('Authorization');
		const payload = AuthService.verifyJwt(auth.slice(7, auth.length));

		AuthService.getUserWithUserName(req.app.get('db'), payload.sub)
			.then(user => {
				return FavoritesService.getFavoriteByUser(
					req.app.get('db'),
					user.id,
					recipe_code
				);
			})
			.then(fav => {
				return fav.length >= 1
					? res.end()
					: res.status(404).send('Recipe not in user favorite');
			});
	})
	.delete(jsonBodyParser, (req, res, next) => {
		const { recipe } = req.body;
		const auth = req.get('Authorization');
		const payload = AuthService.verifyJwt(auth.slice(7, auth.length));

		AuthService.getUserWithUserName(req.app.get('db'), payload.sub)
			.then(user =>
				FavoritesService.removeFavorite(req.app.get('db'), user, recipe)
			)
			.then(() => {
				res.end();
			});

		// FavoritesService.removeFavorite(req.app.get('db'), '', recipe).then(r => {
		// 	console.log(r);

		// 	res.end();
		// });
	});
module.exports = favoritesRouter;
