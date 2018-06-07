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

        // axios.get to get all of the responses for this event to display checked boxes (including
    //      responses from other users)
        // maybe axios.get puts responses on a responses array on state, then when mapping in eventTimes, it checks
        //to see if the time already exists on the responses array , if it does exist then 
        //"clicked" prop on input is true, otherwise, false. Some wires will probs get crossed
        //in attempting to do this. Should get the help of Tommy. 
        ///idk if this will work - but perhaps you just put on state when clicked rather than onMount?
        //will these clicked times stay indefinitely? 
    }

    handleClick(event, time){
        console.log(event.target.checked);
        console.log(time)
        let {id, start_time, events_id} = time;
        console.log(id, events_id)
        if(event.target.checked === true){
            axios.post(`/invite-view/${events_id}/${id}`, {start_time}).then(res=>{
                console.log('rsvp sent')
                this.componentDidMount()})
        }else if (event.target.checked === false){
            axios.delete(`/invite-view/${time.id}/${id}`).then(res=>{
                console.log('rsvp deleted')
                this.componentDidMount()})
        }

    }


    render() {
        let eventTimes = this.state.times.map((e, i) => {
            console.log(e)
            let newTime = new Date(e.start_time)
            let day = newTime.toDateString()
            let timeRead = newTime.toLocaleTimeString()
            let displayTime = timeRead + ' ' + day
            return (

                <div key={i}>
                    <label className="container">
                    {displayTime}
                    <input type="checkbox" name={displayTime} value={e} onChange={(event)=>this.handleClick(event, e)}/>
                <span className="checkmark"></span>
                </label>
                </div>
                    )
                })
        
        let invitees = this.state.invitees.map((e,i)=>{
            return (
                <div key={i} className="circular--landscape">
                        <img src={e.photo} alt={e.name} />
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
                        </div>
                        <div  className= "rsvpbox">
                            {eventTimes}
                        </div>
                        {/* <div>
                            <button onClick={this.handleSubmitResponse}>SUBMIT RSVP</button>
                            <button onClick={this.handleUpdateResponse}>CHANGE RSVP</button>
                        </div> */}
                    </div>
                    )
                }
            }
            
            export default InviteView;
