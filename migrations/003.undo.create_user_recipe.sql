ALTER TABLE user_recipe
  DROP COLUMN IF EXISTS user_id;

ALTER TABLE user_recipe
  DROP COLUMN IF EXISTS recipe_id;

DROP TABLE IF EXISTS user_recipe;