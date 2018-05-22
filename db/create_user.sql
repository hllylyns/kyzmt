INSERT INTO users
(name, photo, auth_id)
VALUES
($1, $2, $3)
RETURNING *;

