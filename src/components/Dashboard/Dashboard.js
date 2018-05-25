import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../Header/Header';

class Dashboard extends Component{
    constructor(){
        super();

        this.state = {
            pending:[],
            confirmed:[],
            rsvp:[]
        }
    }

    // componentDidMount(){
    //     axios.get().then()//if event/req.data property time is truthy, this.setState confirmed, if null/false, setState pending
    //     //nest .then axios.get to retrieve all invitations (events from intitees table where user id is current user id)
    //     //
    // }

    render(){
        //maps over events and invites and displays names - names are links to individual views
        return(
            <div>
            <Header/>
            {/* <h1>Dash</h1> */}
            <Link to='/event/details'> <button className="create">CREATE KYZMT</button></Link><br/>
            <h2 className = "dashbox">Pending</h2>
            <h2 className = "dashbox">Confirmed</h2>
            <h2 className = "dashbox">RSVPS</h2>
            </div>
        )
    }
}


export default Dashboard;