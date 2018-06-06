delete from responses
where event_times_id = $1;

delete from event_times
where id = $1;