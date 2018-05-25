INSERT INTO events
(event_name, event_description, location, users_id_seq)
VALUES
($1, $2, $3, $4)
RETURNING id;


