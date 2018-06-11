import React, { Component } from 'react';
import axios from 'axios';

class Popup extends Component  {
    constructor(props) {
        super(props);

        this.state = {
            eventName: props.event.eventName,
            description: props.event.eventDescription,
            location: props.event.eventLocation,
            showPopup: props.event.showPopup,
            params: props.event.eventid
        }
    }
    updateEventName(e) {
        this.setState({ eventName: e })
    }
    updateDescription(e) {
        this.setState({ description: e })
    }
    updateLocation(e) {
        this.setState({ location: e })
    }

    handleUpdateFn() {
        console.log(this.state)
        let { eventName, description, location } = this.state;
        console.log(this.state);
        axios.put(`/event-view/${this.props.eventid}`, { eventName, description, location }).then(res => {
            this.props.reset();
            console.log('event updated!')
        })
        this.props.popup();
    }

    render() {
        console.log(this.props.eventid)
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <p>Event Name</p>
                    <input className="popedits"
                        value={this.state.eventName}
                        onChange={e => this.updateEventName(e.target.value)}>
                    </input>
                    <p>Description</p>
                    <input className="popedits"
                        value={this.state.description}
                        onChange={e => this.updateDescription(e.target.value)}>
                    </input>
                    <p>Location</p>
                    <input className="popedits"
                        value={this.state.location}
                        onChange={e => this.updateLocation(e.target.value)}>
                    </input><br />
                    <button onClick={() => this.handleUpdateFn()}>SAVE</button>
                    <button onClick={this.props.cancelChanges}>CANCEL</button>
                </div>
            </div>
        );
    }
}

export default Popup;