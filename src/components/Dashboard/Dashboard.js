import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../Header/Header';

class Dashboard extends Component{
//maps over events and invites and displays names - names are links to individual views
    render(){
        return(
            <div>
            <Header/>
            {/* <h1>Dash</h1> */}
            <Link to='/event/details'> <button className="create">CREATE KYZMT</button></Link><br/>
            <h2 className = "dashbox">Pending</h2>
            <h2 className = "dashbox">Confirmed</h2>
            <h2 className = "dashbox">RSVP</h2>
            </div>
        )
    }
}


export default Dashboard;