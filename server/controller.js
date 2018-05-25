module.exports = {
    createEvent: (req, res, next) => {
        console.log(req.body);
        const dbInstance = req.app.get('db');
        const {eventName, description, location, startTime, duration}= req.body; //does this need to be req.body.event?
        const {id} = req.user;

        dbInstance.create_event([eventName, description, location, id])
            .then(([id])=> {
                // for loop 
                return dbInstance.create_times([id.id, startTime, duration]
                )}) ///how do I make multiple start times?!? push times into an array of times on front end?  then for loop and dbInstance for every time? better suggestions?
            //return dbInstance after for loop
            ////can use more .thens to finish creating event! i.e. dbInstance.create_invites

            //return Promise.all(arr.map(e=>db.create_time))map over times array call db.create_time pass in stuff, .thn that returns first response[0] to get a normal array 
            .then(()=> res.status(200).send('event created'))
            .catch((error)=> {
                console.log(error)
                res.status(500).send('event NOT created')});
        
    },






    // readEvents finds all events CREATED by the user, not events they have been invited to.
    readUserEvents: (req, res, next)=>{   
        const dbInstance = req.app.get('db');
        // const {id}=req.user;
        let id = 1;
        
        dbInstance.events_by_user([id])
            // .then(([id])=> dbInstance.invites_to_user()) ///invites to user will have to use a join to get event info from event id
            .then(events=> res.status(200).send(events))
            .catch(()=> res.status(500).send('events NOT found'));
    }
  

}