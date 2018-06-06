delete from invitees
where events_id = $1;

delete from responses
where events_id = $1;

delete from event_times
where events_id = $1;

delete from events
where id = $1;

