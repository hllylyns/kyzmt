import React, { Component } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import Popup from './Popup';
import PopFriend from './PopFriend';
import PopAddTime from './PopAddTime';

class CreateEvent extends Component {
    constructor() {
        super();

        this.state = {
            eventName: '',
            eventDescription: '',
            eventLocation: '',
            finalizedTime: '',
            times: [],
            invitees: [],
            responses: [],
            showPopup: false,
            showPopFriend: false,
            showPopTime: false,
            params: 0
        }
        this.cancelChanges = this.cancelChanges.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.togglePopAddTime = this.togglePopAddTime.bind(this);
        this.togglePopFriend = this.togglePopFriend.bind(this);
        this.cancelAddTime = this.cancelAddTime.bind(this);
        this.handleNotifyGuests = this.handleNotifyGuests.bind(this);
    }

    componentDidMount() {
        axios.get(`/event-view/${this.props.match.params.id}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    eventName: res.data.event_name,
                    eventDescription: res.data.event_description,
                    eventLocation: res.data.location,
                    times: res.data.times,
                    invitees: res.data.users,
                    params: this.props.match.params.id, 
                    responses: res.data.responses, 
                    finalizedTime: res.data.time_stamp
                })
                console.log(this.state)

            })
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        })
    }

    togglePopAddTime() {
        this.setState({
            showPopTime: !this.state.showPopTime
        })
        this.componentDidMount()
    }

    togglePopFriend() {
        this.setState({
            showPopFriend: !this.state.showPopFriend
        })
    }

    handleDeleteTime(id) {
        console.log(id)
        axios.delete(`/time-view/${id}`).then(res => {
            let newTimes = this.state.times.filter((e, i) => {
                return this.state.times !== e;
            })
            this.setState({
                times: newTimes
            })//removes event from state
            this.componentDidMount()
            console.log('time deleted')
        })
    }

    handleDeleteInvitee(user){
        console.log(user)
        //alert "are you sure you want to uninvite user.name"
        axios.delete(`/delete-invitee/${this.props.match.params.id}/${user}`).then(res=>{
            let newInviteList = this.state.invitees.filter((user,i)=>{
                return this.state.invitees !== user;
            })
            this.setState({
                invitees: newInviteList
            })
            this.componentDidMount()
            console.log('invitee uninvited')
        })
    }

    handleFinalizeTime(time) {
        //alert - do you want to choose this time and notify your guests?
        axios.put(`/event-finalize/${this.props.match.params.id}`, {time}).then(res=>{
            console.log('event time set')
        })
        this.componentDidMount()
     }

    handleCancelEvent() {
        var retVal = window.confirm("Do you want to cancel this event and notify your invited friends?");
        if( retVal == true ){
            axios.delete(`/event-view/${this.props.match.params.id}`).then(res => {
                console.log('event deleted')
                this.props.history.push('/dashboard')
            })
            let phoneNumbers = this.state.invitees.map((res, i)=>{
                if(res.phone){
                    return res.phone
                }
            })
            console.log(phoneNumbers)
            phoneNumbers.forEach((p, i)=>{
                axios.get(`/event-cancel/${this.state.eventName}/${p}`).then(res=>{
                        console.log(`text sent to ${p}!`)
                        alert('Your guests have been notified of event cancellation')
                    })
                })
           return true;
        }
        else{
           return false;
        }
    }

    cancelChanges() {
        this.setState({
            showPopup: !this.state.showPopup
        })
        this.componentDidMount()
    }

    cancelAddTime() {
        this.setState({
            showPopTime: !this.state.showPopTime
        })
        this.componentDidMount()
    }

    handleNotifyGuests(text){ ///this should go from props into pop out that allows user to type a selected body
        //options could be "finalize time," "alert to changes"

        let phoneNumbers = this.state.invitees.map((res, i)=>{
            if(res.phone){
                return res.phone
            }
        })
        console.log(phoneNumbers)
        phoneNumbers.forEach((p, i)=>{
            axios.get(`/event-finalize/${this.state.eventName}/${p}`).then(res=>{
                    console.log(`text sent to ${p}!`)
                    alert('Your guests have been notified of event changes')
                })
            })
        } 


    render() {
        
        let eventTimes = this.state.times.map((e, i) => {
            console.log(e.id)
            let newTime = new Date(e.start_time)
            let day = newTime.toDateString()
            let timeRead = newTime.toLocaleTimeString()
            let displayTime = day + ' ' + timeRead
            let responseArray = this.state.responses.filter((r, j)=>{
                if (r.event_times_id === e.id){
                    return r.users_id;
                }
            })
            console.log(responseArray)
            let photos = responseArray.map((res, i)=>{
                if  (e.id === res.event_times_id){
                    for (let j=0; j<this.state.invitees.length; j++){
                        if (this.state.invitees[j].users_id === res.users_id){
                            console.log(this.state.invitees[j].photo)
                            return this.state.invitees[j].photo
                        }
                    }
                }
            })
            console.log(photos)

            let mappedPhotos = photos.map(photo=>{
                return (
                    <div className="circular--landscapesmall">
                    <img src={photo}/>
                    </div>
                )
            })

            return (

                <div key={i}>
                    <button onClick={() => this.handleDeleteTime(e.id)} className="deletebox">x</button>
                    <button onClick={()=>this.handleFinalizeTime(e.start_time)} className="deletebox">finalize</button>
                    {displayTime}
                    {mappedPhotos}
                </div>
            )
        })

        let invitees = this.state.invitees.map((e,i)=>{
            return(
                <div key={i} className="circular--landscape">
                <img src={e.photo} alt={e.name}/>
                <p>{e.name}</p>
                <button onClick={()=>this.handleDeleteInvitee(e.users_id)} className="deletebox">x</button>
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
                    <button onClick={this.togglePopup}>EDIT INFO</button>
                </div>
                <div>
                    {invitees}
                    {eventTimes}
                    <button onClick={this.togglePopAddTime} className="deletebox">+ time</button>
                    <button onClick={this.togglePopFriend} className="deletebox">+ friend</button>
                    <button onClick={() => this.handleCancelEvent()}>CANCEL KYZMT</button>
                    <button onClick={this.handleNotifyGuests}>NOTIFY GUESTS</button>
                </div>
                <div>
                    <div>
                        {this.state.showPopup ?
                            <Popup
                                submitChange={this.loadUpdatedEvent}// text='Close Me'
                                eventName={this.state.eventName}
                                eventDescription={this.state.eventDescription}
                                location={this.state.eventLocation}
                                cancelChanges={this.cancelChanges}
                                updateEventName={this.updateEventName}
                                updateDescription={this.updateDescription}
                                updateLocation={this.updateLocation}
                                eventid={this.state.params}
                                event={this.state}
                                popup={this.togglePopup}
                                reset={this.componentDidMount}
                            />
                            : null
                        }
                    </div>
                    <div>
                        {this.state.showPopFriend ?
                            <PopFriend
                                event={this.state} />
                            : null
                        }
                    </div>
                    <div>
                        {this.state.showPopTime ?
                            <PopAddTime
                                event={this.state}
                                cancelAddTime={this.cancelAddTime}
                                popup={this.togglePopAddTime} />
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateEvent;
