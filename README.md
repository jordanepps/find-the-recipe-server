# Fine The Recipe Server

## Table of Cotents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Server Structure](#app-structure)
- [Data Models](#data-models)
  - [Ingredients Schema](#ingredients-schema)
  - [Recipes Schema](#recipes-schema)
  - [User Schema](#user-schema)
- [API Endpoints](#api-endpoints)
  - [Ingredients](#Ingredients)
  - [Recipes](#Recipes)
  - [Users](#Users)
  - [Authentication](#Authentication)
  - [Favorites](#Favorites)

## Introduction

This is the server docmentation for [Find The Recipe](https://jordans-recipe-app.now.sh/), an app that uses AI to detect ingredients in an image and returns matching recipes.

## Tech Stack

Find The Recipe is powered by the following,

- Node
- Express
- Postgres
- Morgan
- BCryptJS
- JSONWebToken
- Mocha
- Chai
- Clarifai
- DotEnv
- knex
- xss

## App Structure

Find The Recipe follows Node's convention of processing codes from top to bottom and left to right. The most-used routes will be placed at top, followed by lesser-used routes, and finally error handlers.

Route hierarchy is as follows,

```
Ingredients
Recipes
Users
Authentication
Favorites
Error Handlers
```

Application data is persisted via Postgres. RESTful API architecture is also used for data creation and retrieval.

## Data Models

<!-- Acceptable Losses employs Mongoose document schema to construct its data models: users, accounts (such as a bill and its payment history), and income. User documents dictates the existence of other documents as a user ID is required for their creation. -->

### Ingredients Schema

```
image: {
    type: String,
    required: true
}
```

Provided `image` is stored as a string, its route handlers will send the data to the Clarifai API and return ingredients formatted by the handler.

### Recipes Schema

```
i:{
    type: String,
    required: false
},
r:{
    type: String,
    required: false
}
```

Either `i` (ingredients) or `r` (recipe id) is sent to the route handler. `i` will return a max of 10 possible recipes formated. `r` returns a single recipe based on a matching id.

### User Schema

```
user_name: {
  type: String,
  required: true,
  unique: true
},
password: {
    type: String,
    required: true
},
full_name: {
    type: String,
     required: true}
}
```

## API Endpoints

All requests and responses are in JSON format.

| Action         | Path                                                       |
| -------------- | ---------------------------------------------------------- |
| Ingredients    | https://pacific-forest-23409.herokuapp.com/api/ingredients |
| Recipes        | https://pacific-forest-23409.herokuapp.com/api/recipes     |
| Users          | https://pacific-forest-23409.herokuapp.com/api/users       |
| Authentication | https://pacific-forest-23409.herokuapp.com/api/auth        |
| Favorites      | https://pacific-forest-23409.herokuapp.com/api/favorites   |

### Ingredients

`GET` request to `/` with `image` parameter will return an array of ingredients. It will be rejected if the link is not valid or if no food can be recognized/

### Recipes

`GET` request to endpoint `/` requires either `i` or `r` parameter. `i` will return an array of recipe objects. `r` will return a single recipe object.

### Users

`POST` request to endpoint `/` is for creating user documents. It accepts the following request body,

```
{
  user_name,
  password,
  full_name,
```

`user_name` will be rejected if it is not unique. Once a user document is successfully created, this will be the server's response.

```
{
  id,
  user_name,
  full_name,

}
```

### Authentication

`POST` to `/login` endpoint for creation of JWT. It accepts the following request body,

```
{
  username,
  password
}
```

This endpoint takes in the username and verifies the password. When validated, the server will respond with a token,

```
{
  authToken
}
```

### Favorites

`POST` to `/` save the selected recipe to teh database and save a reference of the user and teh recipe id. It accepts the following request body,

```
{
    id,
    calories,
    cautions,
    health_labels,
    image,
    ingredient_lines,
    name,
    servings,
    srouce,
    source_url
}
```

`GET` to `/` will return an array of recipe objects the authorized user has saved to favorites.

`DELETE` to `/` will remove the recipe from the authorized users favorite.
