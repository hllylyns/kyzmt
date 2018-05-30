import React, {Component} from 'react';
import Header from '../Header/Header';

///this component needs to be able to PUT things. do i need to set everything onto state so the user can 
//manipulate it and send back? they could update state and then submit changes will do an axios.put

class CreateEvent extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        //this will get all the invitees for each event (invitees table)
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

    handleCancelEvent(){
        //this will do a pop up to ask if you're sure you want to cancel
        //this will ask if you want to send a twilio to your invitees to let them know that it it canceled
        //this will
    }

    render(){

        return (
            <div>
                <Header/>
                <div>
                <h1>{this.props.eventName}</h1>
                <h2>{/*a way to get the event details off of props*/}Event Details</h2>
                <h2>{/*location*/}Location</h2>
                <div>
                <p>{/*times*/}Times</p> <button onClick= {this.handleFinalizeTime}>finalize time</button>
                </div> <br/>
                <button onClick ={this.handleEditEvent}>EDIT</button> 
                <button onClick = {this.handleCancelEvent}>CANCEL KYZMT</button>
                </div>
            </div>
        )
    }
}

export default CreateEvent;
