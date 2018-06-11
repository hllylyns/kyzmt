import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createEvent } from '../../../ducks/reducer';
import { Link } from 'react-router-dom';



class Details extends Component {


    handleCheckName= (e)=>{
        if(!this.props.eventName){
            alert('Event Name Required')
            e.preventDefault();
        }else{
            /// browser history? need help with this.
        }
        console.log(this.props.eventName)
    }

    render() {
    


        return (
            <div className="createevent">
                <h1>New Event</h1>
                <p>Event Name*</p>
                <input value={this.props.eventName}
                    onChange={(e) => this.props.createEvent("eventName", e.target.value)} />
                <p>Description</p>
                <input value={this.props.description}
                    onChange={(e) => this.props.createEvent("description", e.target.value)} />
                <p>Location</p>
                <input value={this.props.location}
                    onChange={(e) => this.props.createEvent("location", e.target.value)} /> <br/>
              <Link to='/event/invite'> <button onClick={this.handleCheckName}>NEXT</button></Link>
              {/* <Particles/> */}
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