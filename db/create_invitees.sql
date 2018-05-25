INSERT INTO invitees
(events_id, users_id)
VALUES
($1, $2)
RETURNING *;