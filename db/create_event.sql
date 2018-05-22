INSERT INTO event
(event_name, event_description, location, users_id)
VALUES
($1, $2, $3, $4)
RETURNING *;