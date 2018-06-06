SELECT * FROM invitees

join events
on invitees.events_id = events.id

where users_id = $1;
