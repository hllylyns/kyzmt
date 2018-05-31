import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import CreateEvent from './components/CreateEventSteps/CreateEvent';
import Profile from './components/Profile/Profile';
import EventView from './components/EventView/EventView';
// import InviteView from './components/InviteView/InviteView';

export default (
    <Switch>
        <Route path='/' component={Login} exact />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/event' component={CreateEvent} />
        <Route path='/event-view/:id' component={EventView} />
        <Route path='/profile' component={Profile} />
        {/* <Route path='/invite-view' component={InviteView} /> */}
    </Switch>
)