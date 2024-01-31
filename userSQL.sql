CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE description (
    email VARCHAR(50) REFERENCES users(email),
    name VARCHAR(50) NOT NULL,
    hobby VARCHAR(50) NOT NULL
);