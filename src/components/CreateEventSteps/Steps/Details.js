import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { createEvent } from '../../../ducks/reducer';
import { Link } from 'react-router-dom';

class Details extends Component {
    constructor() {
        super();

        this.state = {
            event_name: "",
            event_description: "",
            location: "",
        }
        this.handleEventName = this.handleEventName.bind(this);
        this.handleEventDesc = this.handleEventDesc.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
    }

    // componentDidMount()

    handleEventName(value) {
        this.setState({ event_name: value });
    }

    handleEventDesc(value) {
        this.setState({ event_description: value });
    }

    handleLocation(value) {
        this.setState({ location: value });
    }

    handlecreateEvent(){
        axios.post('/event').then() 
        // write out axios post endpoint to create event. use createEvent from Reducer
    }

    render() {
        return (
            <div>
                <h1>New Event</h1>
                <p>Event Name</p>
                <input value={this.state.event_name}
                    onChange={(e) => this.handleEventName(e.target.value)} />
                <p>Description</p>
                <input value={this.state.event_description}
                    onChange={(e) => this.handleEventDesc(e.target.value)} />
                <p>Location</p>
                <input value={this.state.location}
                    onChange={(e) => this.handleLocation(e.target.value)} /> <br/>
               <Link to = '/event/invite'> <button onClick={this.handlecreateEvent}>NEXT</button></Link>
            </div>
        )
    }
}


export default connect(null, { createEvent })(Details);