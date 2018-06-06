import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            myEvents: [],
            rsvp: []
        }
    }
    //potentially I could put event info on props in component did mount, then map over events in render 
    //instead of putting on state. This makes state obsolete. And then I could access all these props in EventView, hopefully. 
    //how does event view component know which event info to display????
    componentDidMount() {
        axios.get('/dashboard').then(res => {
            console.log(res.data)
            // let eventNames = res.data.map(e => e.event_name)
            this.setState({ myEvents: res.data.map((e, i) => e) })
        })//if event/req.data property time is truthy, this.setState confirmed, if null/false, setState myEvents
        //nest .then axios.get to retrieve all invitations (events from intitees table where user id is current user id)
        //if user_id_seq is equal not current user, display in rsvp as a link to /invite-view/params 
        //
    }

    render() {
        console.log(this.state.myEvents[0])
        // let myEvents = this.state.myEvents.map((element, i) => {
        //     return (
        //         <ul>
        //         <div key={i}>
        //             <Link to='/event-view'>
        //                 <li className="eventlist">{element}</li>
        //             </Link>
        //         </div>
        //         </ul>
        //         )
        // })

        // let confirmed = this.state.confirmed.map((element, i) => {
        //     return (<div> <Link to='/event-view'>{element}</Link><br /> </div>)
        // })

        // let rsvp = this.state.rsvp.map((element, i) => {
        //     return (<Link to='/event-view'>{element}</Link>)
        // })  //maps over events and invites and displays names - names are links to individual views

        return (
            <div>
                <Header />
                <div className="dashbox">
                    <h2>myEvents</h2>
                    <ul>
                        {this.state.myEvents.map((event, i) => {
                            return (
                                // <ProvidesEventInfo key={event.id}
                                //                    eventName={event.event_name}
                                //                    description={event.event_description}
                                //                    location={event.location}
                                //                    />
                                // <Route component={EventView} path='/event-view' />
                                <div className="eventlist">
                                    <li><Link to={`/event-view/${event.id}`} className="links"
                                        key={event.id}>{event.event_name} </Link>
                                    </li>
                                </div>
                            )
                        })}
                    </ul>
                </div>
                <div className="dashbox">
                    <h2>RSVP</h2>
                    <ul>
                        <div className="eventlist">
                            <li></li>
                            {/* <p className="eventlist">{rsvp}</p> */}
                        </div>
                    </ul>
                </div><br />
                <Link to='/event/details'> <button className="create">CREATE KYZMT</button></Link>

            </div>
        )
    }
}


export default Dashboard;