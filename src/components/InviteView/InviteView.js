import React, { Component } from 'react';
import Header from '../Header/Header';
import axios from 'axios';

class InviteView extends Component {
    constructor() {
        super();

        this.state = {
            eventName: '',
            eventDescription: '',
            eventLocation: '',
            times: [],
            invitees: [],
            params: 0
        }

    }

    componentDidMount() {
        axios.get(`/invite-view/${this.props.match.params.id}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    eventName: res.data.event_name,
                    eventDescription: res.data.event_description,
                    eventLocation: res.data.location,
                    params: this.props.match.params.id,
                    times: res.data.times,
                    invitees: res.data.users
                })
                console.log(this.state)
        
            })
            
        // axios.get(`/event-times/${this.props.match.params}`).then(res=>{
        //     console.log(res.data) //this will get the event times
        // })
        //axios.get to retrieve other invitees to display

        //the axios.get and controller for event view and invite view can be the same

        // axios.post(`/event-responses/${this.props.match.params}`).then(res=>{
        //     console.log(res.data)
        // })//this will create all of the responses/rsvps

        ///axios.delete to delete responses

    }


    render() {
        let eventTimes = this.state.times.map((e, i) => {
            console.log(e.id)
            let newTime = new Date(e.start_time)
            let day = newTime.toDateString()
            let timeRead = newTime.toLocaleTimeString()
            let displayTime = day + ' ' + timeRead
            return (

                <div key={i}>
                    <button onClick={() => this.handleSelectTime(e.id)} className="deletebox">select</button>{displayTime}
                </div>
            )
        })

        let invitees = this.state.invitees.map((e,i)=>{
            return(
                <div key={i} className="circular--landscape">
                <img src={e.photo} alt={e.name}/>
                <p>{e.name}</p>
                </div>
            )
        })

        return (
            <div>
                <Header />
                <div>
                    <h1>{this.state.eventName}</h1>
                    <p>{this.state.eventDescription}</p>
                    <h2>{this.state.eventLocation}</h2>
                </div>
                <div>
                {invitees}
                {eventTimes}
                </div>
                <div>
                    <button onClick={this.handleSubmitResponse}>SUBMIT RSVP</button>
                    <button /*onClick={this.handleUpdateResponse}*/>CHANGE RSVP</button>
                </div>
            </div>
        )
    }
}

export default InviteView;
