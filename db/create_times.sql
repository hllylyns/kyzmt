INSERT INTO event_times
(events_id, start_time)
VALUES
($1, $2)
RETURNING *;