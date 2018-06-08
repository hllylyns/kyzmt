module.exports = {
    createEvent: (req, res, next) => {
        console.log(req.body);
        const dbInstance = req.app.get('db');
        const { eventName, description, location, startTime, duration } = req.body.event; //does this need to be req.body.event?
        const { timesList } = req.body;
        let { invitesList } = req.body;
        const { id } = req.user;
        invitesList = [...invitesList, req.user]
        console.log(invitesList)

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

    getEventRsvp: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params;
        const {id:user} = req.user;

        dbInstance.get_event([id])
            .then(([event]) => {
                dbInstance.get_event_times([id])
                    .then((times) => {
                        event.times = times
                        dbInstance.get_event_invitees([id])
                            .then((invites) => {
                                event.invites = invites
                                dbInstance.join_invitees_on_events([id])
                                    .then((users) => {
                                        event.users = users
                                        dbInstance.responses_by_user([id, user])
                                        .then((responses)=>{
                                            event.responses = responses
                                            res.status(200).send(event)
                                        })
                                        
                                    })
                            })
                    })
            })
            .catch((error) => {
                console.log(error)
                res.status(500).send('invitees NOT got')
            })


    },

    getEvent: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params;

        dbInstance.get_event([id])
            .then(([event]) => {
                dbInstance.get_event_times([id])
                    .then((times) => {
                        event.times = times
                        dbInstance.get_event_invitees([id])
                            .then((invites) => {
                                event.invites = invites
                                dbInstance.join_invitees_on_events([id])
                                    .then((users) => {
                                        event.users = users
                                        dbInstance.get_event_responses([id])
                                            .then((responses) => {
                                                event.responses = responses
                                                res.status(200).send(event)
                                            })
                                    })

                            })
                    })
            })
            .catch((error) => {
                console.log(error)
                res.status(500).send('invitees NOT got')
            })
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

    readUserInvites:( req, res, next)=>{
        const dbInstance = req.app.get('db');
        const {id} = req.user

        dbInstance.events_by_invitee([id])
        .then(events=>res.status(200).send(events))
        .catch(()=> res.status(500).send('invites not found'));
    },

    deleteRsvp:(req, res, next)=>{
        const dbInstance = req.app.get('db');
        const {id} = req.user;
        const {events_id} = req.params;
        const {id:event_times_id} = req.params;

        dbInstance.delete_response([id, events_id, event_times_id])
        .then(()=>res.status(200).send('rsvp deleted'))
        .catch(()=> res.status(500).send('delete fail'));
    },
    
    addRsvp:(req, res, next)=>{
        const dbInstance = req.app.get('db');
        const {id} = req.user;
        const {events_id} = req.params;
        const {id:event_times_id} = req.body

        dbInstance.add_response([id, events_id, event_times_id])
        .then(()=>res.status(200).send('rsvp posted'))
        .catch(()=> res.status(500).send('rsvp fail'));
    },

    editEvent: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params
        const { eventName, description, location } = req.body; 

        dbInstance.edit_event([id, eventName, description, location])
            .then(() => res.status(200).send('event updated'))
            .catch((error) => {
                console.log(error)
                res.status(500).send('event NOT updated')
            });
    },

    deleteEvent: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params

        dbInstance.delete_event([id])
            .then(() => res.status(200).send('event deleted'))
            // .then(([event])=>{
            //     dbInstance.delete_event_times([id])
            //     .then((times)=>{
            //         dbInstance.delete_event_invitees([id])
            //         .then((invites)=>{
            //             dbInstance.delete_event_responses([id])
            //             res.status(200).send('event delete complete')
            //         })
            //     })
            // })
            .catch((error) => {
                console.log(error)
                res.status(500).send('delete not complete')
            })
    },

    deleteATime: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params


        dbInstance.delete_time([id])
            .then(() => res.status(200).send('time deleted'))
            .catch((error) => {
                console.log(error)
                res.status(500).send('time not deleted from db')
            })
    },

    addEventTime: (req, res, next)=>{
        const dbInstance = req.app.get('db');
        const {id} = req.params
        const {time} = req.body
        console.log(id)

        dbInstance.create_times([id, time])
                .then(() => res.status(200).send('event created'))
                .catch((error) => {
                    console.log(error)
                    res.status(500).send('event NOT created')
                })
    },

    deleteInvitee:(req, res, next)=>{
        const dbInstance = req.app.get('db');
        const {id, user} = req.params
        console.log(id, user)

        dbInstance.delete_invitee([id, user])
                .then(() => res.status(200).send('invitee deleted from event'))
                .catch((error) => {
                    console.log(error)
                    res.status(500).send('invitee not deleted')
                })
    },

    finalizeEventTime: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params
        const {time} = req.body

        dbInstance.update_event_time([id, time])
            .then(() => res.send(200).send('event finalized'))
            .catch((error) => {
                console.log(error)
                res.status(500).send('event not Finalized')
            })
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
    }
};


//need delete that deletes response from specific user
//need delete that deletes all things for an event id from db