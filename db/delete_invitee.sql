delete from responses
where users_id = $2
and events_id = $1;

delete from invitees
where users_id = $2
and events_id = $1;