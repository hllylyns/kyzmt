DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
name VARCHAR(180),
email VARCHAR(200),
phone INT,
photo VARCHAR(900),
auth_id TEXT
);

CREATE TABLE IF NOT EXISTS events (
id SERIAL PRIMARY KEY,
event_name VARCHAR(200),
event_description VARCHAR(900),
location VARCHAR(500),
time INT,
users_id_seq INT REFERENCES users(id)
);



