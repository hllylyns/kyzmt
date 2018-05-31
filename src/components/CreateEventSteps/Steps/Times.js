import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeKyzmt, selectTime, timeInput, removeSelectedTime } from '../../../ducks/reducer';
import { Link } from 'react-router-dom';


class Times extends Component {
    constructor() {
        super();

        this.state = {
            timeInput: ''
        }

        this.handleSelectTime = this.handleSelectTime.bind(this);
        this.handleTimeInput = this.handleTimeInput.bind(this);

    }

    handleTimeInput(time) {
        this.setState({ timeInput: time })
        this.props.timeInput(this.state.timeInput)
    }

    handleSelectTime() {
        // console.log(time);
        let newTime = new Date(this.state.timeInput)
        let day = newTime.toDateString()
        let timeRead = newTime.toLocaleTimeString()
        let displayTime = day + ' ' + timeRead
        if (displayTime !== "Invalid Date Invalid Date") {
           this.props.selectTime(displayTime)
            //let the user know that they are attempting to enter an invalid date somehow (send an alert/warning that isn't annoying)
            ///code to refuse addition of a new time entry if the time already exists (no duplicate time entries for same event)
        }
    }

    // handleCompleteKyzmt(){
    //     let {event, timesList}= this.props;
    //     axios.post('/event', {event, timesList}).then(res=>{  
    //         console.log('event created! yay!')
    //         this.completeKyzmt();
    //     })///does this need to be in redux? so I don't have to get event and timesList off of props?
    //     ///should send a notification to user that their event has been created successfully
    // }

    removeSelectedTime(e) {
        let newTimesList = [...this.props.timesList];
        let index = newTimesList.indexOf(e.target.value)
        newTimesList.splice(index, 1)
        this.props.removeSelectedTime(newTimesList)
    }

    render() {
        let times = this.props.timesList.map((element, i) => {
            return (
                <div>
                    {element}<button className="deletebox" onClick={e => this.removeSelectedTime(e)}>x</button>
                </div>
            )
        })
        return (
            <div>
                <h1>Choose Dates</h1>
                <input id="datetime" type="datetime-local" onInput={(e) => this.handleTimeInput(e.target.value)} className="timebox" />
                <button onClick={this.handleSelectTime}>ADD TIME</button><br />
                <h2>Selected Times</h2><br />
                {times}
                <Link to='/dashboard'> <button onClick={()=>this.props.completeKyzmt(this.props.timesList, this.props.invitesList, this.props.event)}>COMPLETE KYZMT</button></Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { timeInput, timesList, invitesList, event } = state;
    return {
        timeInput,
        timesList,
        invitesList,
        event
    }
}

export default connect(mapStateToProps, { completeKyzmt, selectTime, timeInput, removeSelectedTime })(Times);