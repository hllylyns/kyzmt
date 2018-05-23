import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { createEvent } from '../../../ducks/reducer';
import { Link } from 'react-router-dom';

class Details extends Component {
    constructor() {
        super();

        this.state = {
            eventName: "",
            description: "",
            location: "",
        }
        this.handleEventName = this.handleEventName.bind(this);
        this.handleEventDesc = this.handleEventDesc.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
    }

    // componentDidMount()

    handleEventName(value) {
        this.setState({ eventName: value });
    }

    handleEventDesc(value) {
        this.setState({ description: value });
    }

    handleLocation(value) {
        this.setState({ location: value });
    }

    handlecreateEvent(){
        // axios.post('/event', { /*what goes in here?*/}).then(results =>{
        //     e.preventDefault();
        //     this.props.createEvent(this.state./*??*/);
        // }) 
        // write out axios post endpoint to create event. use this.props.createEvent from Reducer
    }

    render() {
        return (
            <div>
                <h1>New Event</h1>
                <p>Event Name</p>
                <input value={this.state.eventName}
                    onChange={(e) => this.handleEventName(e.target.value)} />
                <p>Description</p>
                <input value={this.state.description}
                    onChange={(e) => this.handleEventDesc(e.target.value)} />
                <p>Location</p>
                <input value={this.state.location}
                    onChange={(e) => this.handleLocation(e.target.value)} /> <br/>
               <Link to = '/event/invite'> <button onClick={this.handlecreateEvent}>NEXT</button></Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let {eventName, description, location} = state; 
    return {
        eventName: state.event.eventName,
        discription: state.event.description,
        location: state.event.location
    }
}

export default connect(mapStateToProps, { createEvent })(Details);