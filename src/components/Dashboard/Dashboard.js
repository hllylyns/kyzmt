import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            myEvents: [],
            myInvites: []
        }
    }

    componentDidMount() {
        axios.get('/dashboard').then(res => {
            console.log(res.data)
            // let eventNames = res.data.map(e => e.event_name)
            this.setState({ myEvents: res.data.map((e, i) => e) })
        })

        axios.get('/invites').then(res => {
            console.log(res.data)
            let invites = res.data.filter((e, i) => {
                if (e.users_id !== e.users_id_seq) {
                    return true;
                }
            })
            // console.log(invites)
            this.setState({ myInvites: invites }, () => console.log(this.state.myInvites))
        })
        // console.log(this.state.myInvites)
    }

    render() {

        return (
            <div>
                <Header />
                <div className="dashbox">
                    {/* <h2>myEvents</h2> */}
                    <ul>
                        {this.state.myEvents.map((event, i) => {
                            if (event.event_name) { //this one is for the finalized event, could potentially store differently
                                if (event.time_stamp) {
                                    return (
                                        <div className="eventlist">
                                            <li><Link to={`/event-view/${event.id}`} className="dashlink"
                                                key={event.id}>{event.event_name + " (finalized)"} </Link>
                                            </li>
                                        </div>
                                    )
                                } else {
                                    return (//these events below are not finalized, could be styled a different color perhaps
                                        <div className="eventlist">
                                            <li><Link to={`/event-view/${event.id}`} className="dashlink"
                                                key={event.id}>{event.event_name} </Link>
                                            </li>
                                        </div>
                                    )
                                }
                            }
                        })}
                    </ul>
                </div>
                <div className="dashbox">
                    {/* <h2>RSVP</h2> */}
                    <ul>
                        {this.state.myInvites.map((event, i) => {
                            return (
                                <div className="eventlist">
                                    <li><Link to={`/invite-view/${event.id}`} className="dashlink"
                                        key={event.id}>{event.event_name} </Link>
                                    </li>
                                </div>
                            )
                        })}
                    </ul>
                </div><br />
                <Link to='/event/details'> <button className="create">CREATE KYZMT</button></Link>

            </div>
        )
    }
}


export default Dashboard;