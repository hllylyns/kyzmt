require('dotenv').config();
const controller = require('./controller'),
    express = require('express'),
    massive = require('massive'),
    session = require('express-session'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0'),
    bodyParser = require('body-parser'),
    twilio = require('twilio');

//.env
const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING,
    REACT_APP_LOGIN,
    SUCCESS_REDIRECT,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    MY_PHONE_NUMBER,
    TWILIO_PHONE
} = process.env;

//middleware - express, massive, bodyparser
const app = express();

app.use(express.static(`${__dirname}/../build`));
massive(CONNECTION_STRING).then((db) => {
    // db.seed().then(()=>console.log('refresh db')); /// should be deleted when running final tests.
    console.log('connected to database');
    app.set('db', db);
})

app.use(bodyParser.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());

app.use(passport.session());

//middleware - Auth0
passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, (accessToken, refreshToken, extraParams, profile, done) => {
    let db = app.get('db');
    let { displayName, picture, id } = profile;
    db.find_user([id]).then((foundUser) => {
        if (foundUser[0]) {
            done(null, foundUser[0].id)
        } else {
            db.create_user([displayName, picture, id]).then((user) => {
                done(null, user[0].id)
            })
        }
    })
}))

passport.serializeUser((id, done) => {
    done(null, id);

})

passport.deserializeUser((id, done) => {
    app.get('db').find_session_user([id]).then((user) => {
        done(null, user[0])
    })
})

app.use((req, res, next) => {
    req.user = {
        id: 1,
        name: 'Holly Lyons Florence',
        email: null,
        phone: null,
        photo: 'https://lh3.googleusercontent.com/-uggqQdD8CJ4/AAAAAAAAAAI/AAAAAAAAAcA/Rp6OnSBONtc/photo.jpg',
        auth_id: 'google-oauth2|114896173457977598129'
    }
    next()
})

app.get('/login', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: SUCCESS_REDIRECT
}))

app.get('/auth/me', function (req, res) {
    if (req.user) {
        res.status(200).send(req.user);
    } else {
        res.status(401).send('No access')
    }
})

//initialize twilio
const accountSid = TWILIO_ACCOUNT_SID,
    authToken = TWILIO_AUTH_TOKEN,
    client = new twilio (accountSid, authToken);


//endpoints
app.post('/event', controller.createEvent);
app.get('/dashboard', controller.readUserEvents);
app.get('/invites', controller.readUserInvites)
app.put('/event-view/:id', controller.editEvent);
app.get('/event/results', controller.searchFriends); //is 'event' the correct endpoint? 
app.get('/event-view/:id', controller.getEvent);
app.get('/invite-view/:id', controller.getEventRsvp);
app.delete('/event-view/:id', controller.deleteEvent);
app.delete('/time-view/:id', controller.deleteATime);
app.post('/event-view/:id', controller.addEventTime);
app.delete('/delete-invitee/:id/:user', controller.deleteInvitee);
app.put('/event-finalize/:id', controller.finalizeEventTime);
app.delete('/invite-view/:events_id/:id', controller.deleteRsvp);
app.post('/invite-view/:events_id', controller.addRsvp);
app.get('/profile', controller.getProfile);
app.put('/profile', controller.editUserProfile);

//twilio endpoints
app.get('/testtwilio', function (req, res) {
    client.messages
        .create({
            to: MY_PHONE_NUMBER,
            from: TWILIO_PHONE,
            body: 'These are not the drones you are looking for'
        })
        .then((message) => console.log(message.sid))
        .catch((error) => {
            console.log(error)
            res.status(500).send('twilio not working')
        })
})
app.get('/event-finalize/:eventName/:p', function (req, res) {
    const {eventName, p} = req.params;
    const {name} = req.user;

    client.messages
        .create({
            to: '+1'+p,
            from: TWILIO_PHONE,
            body: `${name} has finalized the Kyzmt event details for ${eventName}: https://wwww.kyzmt.com`
        })
        .then((message) => console.log(message.sid))
        .catch((error) => {
            console.log(error)
            res.status(500).send('twilio not working')
        })
})
app.get('/event-cancel/:eventName/:p', function (req, res) {
    const {eventName, p} = req.params;
    const {name} = req.user;

    client.messages
        .create({
            to: '+1'+p,
            from: TWILIO_PHONE,
            body: `${name} has cancelled the Kyzmt event ${eventName}. Please contact ${name} if you have any questions. https://wwww.kyzmt.com`
        })
        .then((message) => console.log(message.sid))
        .catch((error) => {
            console.log(error)
            res.status(500).send('twilio not working')
        })
})
app.get('/create-kyzmt/:eventName/:p', function (req, res) {
    const {eventName, p} = req.params;
    const {name} = req.user;

    client.messages
        .create({
            to: '+1'+p,
            from: TWILIO_PHONE,
            body: `${name} has invited you to the Kyzmt event ${eventName}. Check it out at: https://wwww.kyzmt.com`
        })
        .then((message) => console.log(message.sid))
        .catch((error) => {
            console.log(error)
            res.status(500).send('twilio not working')
        })
})






//port
app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`)
})