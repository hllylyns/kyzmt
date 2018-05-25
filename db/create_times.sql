INSERT INTO event_times
(events_id, start_time, duration)
VALUES
($1, $2, $3)
RETURNING *;