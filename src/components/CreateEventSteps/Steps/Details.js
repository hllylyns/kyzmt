import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createEvent } from '../../../ducks/reducer';
import { Link } from 'react-router-dom';

class Details extends Component {


    handleCheckName(){
        if(!this.props.eventName){
            alert('Event Name Required')
        }else{
            /// browser history? need help with this.
        }
        console.log(this.props.eventName)
    }

    render() {
        return (
            <div>
                <h1>New Event</h1>
                <p>Event Name</p>
                <input value={this.props.eventName}
                    onChange={(e) => this.props.createEvent("eventName", e.target.value)} />
                <p>Description</p>
                <input value={this.props.description}
                    onChange={(e) => this.props.createEvent("description", e.target.value)} />
                <p>Location</p>
                <input value={this.props.location}
                    onChange={(e) => this.props.createEvent("location", e.target.value)} /> <br/>
               <button onClick={()=>this.handleCheckName(this.props.eventName)}>NEXT</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let {eventName, description, location} = state.event; 
    return {
        eventName,
        description,
        location
    }
}

export default connect(mapStateToProps, { createEvent })(Details);