SELECT * FROM invitees
WHERE users_id = $1;

-- need to make this a join to get event info using events_id