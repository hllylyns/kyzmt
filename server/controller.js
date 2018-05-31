module.exports = {
    createEvent: (req, res, next) => {
        console.log(req.body);
        const dbInstance = req.app.get('db');
        const { eventName, description, location, startTime, duration } = req.body.event; //does this need to be req.body.event?
        const { timesList } = req.body;
        const { invitesList } = req.body;
        const { id } = req.user;

        dbInstance.create_event([eventName, description, location, id])
            .then(([{ id }]) => {
                Promise.all([
                    ...timesList.map((time => {
                        return dbInstance.create_times([id, time, duration])
                    })),
                    ...invitesList.map((invite => {
                        return dbInstance.create_invitees([id, invite.id])
                    }))
                ])
                    .then(() => res.status(200).send('event created'))
                    .catch((error) => {
                        console.log(error)
                        res.status(500).send('event NOT created')
                    })
            })
            .catch((error) => {
                console.log(error)
                res.status(500).send('event NOT created')
            });

    },

    // readEvents finds all events CREATED by the user, .then all the events the user is invited to 
    readUserEvents: (req, res, next) => {
        const dbInstance = req.app.get('db');
        console.log(req.user)
        const { id } = req.user;


        dbInstance.events_by_user([id])
            // .then(([id])=> dbInstance.invites_to_user()) ///invites to user will have to use a join to get event info from event id
            .then(events => res.status(200).send(events))
            .catch(() => res.status(500).send('events NOT found'));
    },

    editEvent: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params
        const { eventName, description, location } = req.body.event; //does this need to be req.body.event?
        const { timesList } = req.body;

        dbInstance.edit_event([id, eventName, description, location])///needs to do a .then to edit-event times
            .then(() => res.status(200).send('event updated'))
            .catch((error) => {
                console.log(error)
                res.status(500).send('event NOT updated')
            });
    },

    searchFriends: (req, res, next) => {
        console.log(req.query)
        const dbInstance = req.app.get('db');
        let { q } = req.query;

        q = `%${q}%`;
        console.log(q);

        dbInstance.search_friends([q])
            .then((name) => {
                console.log(name)
                res.status(200).send(name)
            })
            .catch((error) => {
                console.log(error)
                res.status(500).send('user not found')
            });
    },

    getEvent: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params;

        dbInstance.get_event([id])
            // .then(([id])=>{
            //     return dbInstance.get_event_times([id])
            //     .then((times)=>res.status(200).send(times))}) //how do I get the times and events back? 
            .then((event) => res.status(200).send(event))
            .catch((error) => {
                console.log(error)
                res.status(500).send('event NOT updated')
            });
    }
};
