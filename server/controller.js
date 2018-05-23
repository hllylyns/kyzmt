module.exports = {
    createEvent: (req, res, next) => {
        console.log(req.body);
        const dbInstance = req.app.get('db');
        const {eventName, description, location}= req.body;
        const {id} = req.user; //need this to be the user serial key, not the id from auth0 how to do that? 

        dbInstance.create_event([eventName, description, location, id])
            .then(()=> res.status(200).send('event created'))
            .catch(()=> res.status(500).send('event NOT created'));
    },
    // readEvents finds all events CREATED by the user, not events they have been invited to.
    readUserEvents: (req, res, next)=>{   
        const dbInstance = req.app.get('db');
        const {id}=req.user;
        
        dbInstance.events_by_user(id)
            .then(()=> res.status(200).send(events))
            .catch(()=> res.status(500).send('events NOT found'));
    }, 









    //before fine-tuning methods below, create sql tables for invites, responses, and event_times

    //readUserInvites finds all events that the user is invited to - events created by other users.
    readUserInvites: (req, res, next)=>{
        const dbInstance = req.app.get('db');
        const {id}=req.user;

        dbInstance.invites_to_user(id)
            .then(()=> res.status(200).send(events))
            .catch(()=> res.status(500).send('invites NOT found'));
    }

}