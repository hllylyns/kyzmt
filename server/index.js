require('dotenv').config();
const controller = require('./controller'),
    express = require('express'),
    massive = require('massive'),
    session = require('express-session'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0'),
    bodyParser = require('body-parser');

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING, 
    REACT_APP_LOGIN, 
    SUCCESS_REDIRECT
} = process.env;

const app = express();

app.use( express.static( `${__dirname}/../build` ) );

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
app.put('/event-view/:id', controller.finalizeEventTime);
app.delete('/invite-view/:events_id/:id', controller.deleteRsvp);
app.post('/invite-view/:events_id', controller.addRsvp)


app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`)
})