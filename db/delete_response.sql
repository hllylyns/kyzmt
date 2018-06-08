delete from responses 
 where users_id = $1
 and events_id = $2
 and event_times_id = $3;