select *
from users

join invitees
on users.id = invitees.users_id

where events_id = $1;
