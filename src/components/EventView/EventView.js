import React, {Component} from 'react';
import Header from '../Header/Header';
import axios from 'axios';

///this component needs to be able to PUT things. do i need to set everything onto state so the user can 
//manipulate it and send back? they could update state and then submit changes will do an axios.put

class CreateEvent extends Component{
    constructor(){
        super();

        this.state={
            event: {},
            times: [],
            isEditing: false
        }
    }
    componentDidMount(){
        axios.get(`/event-view/${this.props.match.params.id}`).then(res => {
            console.log(res.data)
            this.setState({event: res.data[0]})
        })//this will get all the invitees for each event (invitees table)
        //will also get their responses (responses table)
    }

    handleFinalizeTime(){
        //this will take the time off of state? (the selected time will have to populate somehow), it will do a 
        //axios .put or .post to insert/update event time from null to selected time
    }
    
    handleEditEvent(){
        //this will first allow the user to maniputlate state. 
        //you any need another function to take state and do an axios.put to submit changes in event details
        //to the database. will use event details from state? or redux? 
    }

    handleUpdateFn(){
        axios.put(`/event-view/${this.props.match.params.id}`, {}).then(res=>{
            this.setState({event: res.data[0]})
        });
    }

    handleCancelEvent(){
        //this will do a pop up to ask if you're sure you want to cancel
        //this will ask if you want to send a twilio to your invitees to let them know that it it canceled
        //this will send twilio
        //this will delete event info from database using event id. all db info connected with this id will be deleted
    }

    render(){

        return (
            <div>
                <Header/>
                <div>
                <h1>{this.state.event.event_name}</h1>
                <h2>{this.state.event.event_description}</h2>
                <h2>{this.state.event.location}</h2>
                </div>
                <div>
                <h2>{/*times*/}Times</h2> <button onClick= {this.handleFinalizeTime}>finalize time</button>
                </div> 
                <div>
                <button onClick ={this.handleEditEvent}>EDIT</button> 
                <button onClick = {this.handleCancelEvent}>CANCEL KYZMT</button>
                </div>
            </div>
        )
    }
}

export default CreateEvent;
