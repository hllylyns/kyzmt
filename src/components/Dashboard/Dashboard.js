import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            pending: [],
            confirmed: [],
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
            this.setState({ pending: res.data.map((e, i) => e) })
        })//if event/req.data property time is truthy, this.setState confirmed, if null/false, setState pending
        //nest .then axios.get to retrieve all invitations (events from intitees table where user id is current user id)
        //
    }

    render() {
        console.log(this.state.pending[0])
        // let pending = this.state.pending.map((element, i) => {
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
                <Link to='/event/details'> <button className="create">CREATE KYZMT</button></Link><br />
                <div className="dashbox">
                    <h2>Pending</h2>
                    <ul>
                        {this.state.pending.map((event, i) => {
                            return (
                                // <ProvidesEventInfo key={event.id}
                                //                    eventName={event.event_name}
                                //                    description={event.event_description}
                                //                    location={event.location}
                                //                    />
                                // <Route component={EventView} path='/event-view' />
                                <div className="eventlist">
                                    <li><Link to="/event-view"
                                        key={event.id}
                                        eventName={event.event_name}
                                        description={event.event_description}
                                        location={event.location}>{event.event_name}</Link>
                                    </li>
                                </div>
                            )
                        })}
                    </ul>
                </div>
                <div className="dashbox">
                    <h2>Confirmed</h2>
                    <ul>
                    <div className="eventlist">
                    <li>Example</li>
                    <li>Example</li>
                    <li>Example</li>
                    {/* <p className="eventlist">{confirmed}</p> */}
                    </div>
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
                </div>

            </div>
        )
    }
}


export default Dashboard;