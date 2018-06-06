import React, { Component } from 'react';
import axios from 'axios';

class PopAddTime extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeToAdd: '',
            params: props.event.params
        }

        this.handleTimeInput = this.handleTimeInput.bind(this);
        this.handleAddEventTime = this.handleAddEventTime.bind(this);
    }

    handleTimeInput(time) {
        this.setState({ timeToAdd: time })
    }

    handleAddEventTime() {
        console.log(this.state)
        let time = this.state.timeToAdd;
        axios.post(`/event-view/${this.state.params}`, { time }).then(res => {
            console.log('time added')
        })
        this.props.popup();
    }


    render() {

        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <p>Add Time</p>
                    <input id="datetime" type="datetime-local" onInput={(e) => this.handleTimeInput(e.target.value)} className="timebox" />
                    <button onClick={this.handleAddEventTime}>ADD TIME</button>
                    <button onClick={this.props.cancelAddTime}>CANCEL</button>
                </div>
            </div>
        )
    }
}

export default PopAddTime;