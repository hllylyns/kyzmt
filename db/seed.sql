-- DROP TABLE IF EXISTS events; these get used to clear tables at app use start. please use and then delete
-- DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
name VARCHAR(180),
email VARCHAR(200),
phone VARCHAR(10),
photo VARCHAR(900),
auth_id TEXT
);

CREATE TABLE IF NOT EXISTS events (
id SERIAL PRIMARY KEY,
event_name VARCHAR(200),
event_description VARCHAR(900),
location VARCHAR(500),
time TIMESTAMPTZ,
duration INTERVAL, 
-- not sure if the decided duration is needed on the event table? probably yes. not sure how this will affect other coding done as of 5/23
users_id INT REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS event_times (
id SERIAL PRIMARY KEY,
events_id INT REFERENCES events(id),
start_time TIMESTAMPTZ, 
duration INTERVAL
);
-- timestamp with 'z' should allow it to account for timezone, later versions don't need the z. not sure what version is being used where.

CREATE TABLE IF NOT EXISTS invitees (
id SERIAL PRIMARY KEY,
events_id INT REFERENCES events(id),
users_id INT REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS responses (
id SERIAL PRIMARY KEY, 
users_id INT REFERENCES users(id),
events_id INT REFERENCES events(id),
event_times_id INT REFERENCES event_times(id)
);

