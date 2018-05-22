import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Dashboard extends Component{
//maps over events and invites and displays names - names are links to individual views
    render(){
        return(
            <div>
            <h1>Dash</h1>
            <Link to='/event/details'> <button>CREATE KYZMT</button></Link>
            <h1>Pending Events</h1>
            <h1>Confirmed Events</h1>
            <h1>Invitations</h1>
            </div>
        )
    }
}


export default Dashboard;