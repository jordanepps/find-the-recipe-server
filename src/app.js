require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const ingredientsRouter = require('./ingredients/ingredients-router');
const recipesRouter = require('./recipes/recipes-router');

const app = express();

app.use(
	morgan(NODE_ENV === 'production' ? 'tiny' : 'common', {
		skip: () => NODE_ENV === 'test'
	})
);
app.use(cors());
app.use(helmet());

app.use('/api/ingredients', ingredientsRouter);
app.use('/api/recipes', recipesRouter);

app.get('/', (req, res) => {
	res.send('Find The Recipe API!');
});

app.use(function errorHandler(error, req, res, next) {
	let response =
		NODE_ENV === 'production'
			? { error: { message: 'server error' } }
			: { message: error.message, error };
	res.status(500).json(response);
});

module.exports = app;
