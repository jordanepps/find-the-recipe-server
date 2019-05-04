CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    user_name TEXT NOT NULL,
    password TEXT NOT NULL
);