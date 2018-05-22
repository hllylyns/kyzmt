import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Details from './Steps/Details';
import Invite from './Steps/Invite';
import TimeOptions from './Steps/TimeOptions';


class CreateEvent extends Component {


    render() {
        return (
            <div>
                <div>New Event</div>
                <Link to='/'><button className='cancel'>Cancel</button></Link>
                <Switch>
                    <Route component={Details} path='/event/details' />
                    <Route component={Invite} path='/event/invite' />
                    <Route component={TimeOptions} path='/event/times' />
                </Switch>
                
            </div>
        );
    }
}

export default CreateEvent;