update events
set event_name = $2,
event_description= $3,
location = $4
where id = $1;