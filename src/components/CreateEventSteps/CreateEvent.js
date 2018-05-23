import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
// import axios from 'axios';
import Details from './Steps/Details';
import Invite from './Steps/Invite';
import Times from './Steps/Times';
import Header from '../Header/Header';

class CreateEvent extends Component {


    render() {
        return (
            <div>
               <Header/>
                <Switch>
                    <Route component={Details} path='/event/details' />
                    <Route component={Invite} path='/event/invite' />
                    <Route component={Times} path='/event/times' />
                </Switch>
                <Link to='/dashboard'><button className='cancel'>CANCEL</button></Link>
            </div>
        );
    }
}

export default CreateEvent;