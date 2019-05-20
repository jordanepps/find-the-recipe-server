CREATE TABLE recipes
(
    id SERIAL PRIMARY KEY,
    recipe_code TEXT NOT NULL,
    recipe_name TEXT NOT NULL,
    image TEXT NOT NULL,
    source TEXT NOT NULL,
    source_url TEXT NOT NULL,
    health_labels TEXT NOT NULL,
    cautions TEXT NOT NULL,
    servings INTEGER NOT NULL,
    calories INTEGER NOT NULL,
    ingredient_lines TEXT NOT NULL
);