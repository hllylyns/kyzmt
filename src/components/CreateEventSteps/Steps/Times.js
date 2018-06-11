import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeKyzmt, selectTime, timeInput, removeSelectedTime } from '../../../ducks/reducer';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Times extends Component {
    constructor() {
        super();

        this.state = {
            timeInput: '',
            completeButton: true
        }

        this.handleSelectTime = this.handleSelectTime.bind(this);
        this.handleCompleteKyzmt = this.handleCompleteKyzmt.bind(this);
    }
    handleTimeInput(e) {
        this.setState({
            timeInput: e
        })
        // this.props.timeInput(e.target.value)
    }

    handleSelectTime() {
        console.log(this.state.timeInput)
        let newTime = new Date(this.state.timeInput)
        let day = newTime.toDateString()
        let timeRead = newTime.toLocaleTimeString()
        let displayTime = day + ' ' + timeRead
        if (displayTime !== "Invalid Date Invalid Date") {
            this.props.selectTime(displayTime)
            //let the user know that they are attempting to enter an invalid date somehow (send an alert/warning that isn't annoying)
            ///code to refuse addition of a new time entry if the time already exists (no duplicate time entries for same event)
        }
        console.log(this.props.timesList)
    }

    handleCompleteKyzmt() {
        if (this.state.completeButton) {
            var retVal = window.confirm("Would you like to send a text notification to invited friends?");
            if (retVal == true) {
                //create event
                this.props.completeKyzmt(this.props.timesList, this.props.invitesList, this.props.event)
                //map over user phone numbers
                let phoneNumbers = this.props.invitesList.map((res, i) => {
                    if (res.phone) {
                        return res.phone
                    }
                })
                console.log(phoneNumbers)
                //sent a text to each invitee
                phoneNumbers.forEach((p, i) => {
                    axios.get(`/create-kyzmt/${this.props.event.eventName}/${p}`).then(res => {
                        console.log(`text sent to ${p}!`)
                        alert('Your guests have been sent a text invitation')
                    })
                })
            } else {
                this.setState({ completeButton: !this.state.completeButton })
            }
        } else {
            this.props.completeKyzmt(this.props.timesList, this.props.invitesList, this.props.event)
            alert('Your Kyzmt event has been created. If you would like to sent text notifications to friends later, you can do so from your user event view.')
            this.setState({completeButton: !this.state.completeButton})
        }
        ///should send a notification to user that their event has been created successfully
    } ///should also ask if they want to send to invitees. (sends text w a link or something)

    removeSelectedTime(e) {
        let newTimesList = [...this.props.timesList];
        let index = newTimesList.indexOf(e.target.value)
        newTimesList.splice(index, 1)
        this.props.removeSelectedTime(newTimesList)
    }

    render() {
        console.log(this.props)
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
                <Link to='/event/invite'><button>PREV</button></Link>
                <Link to='/dashboard'> <button onClick={() => this.handleCompleteKyzmt()}>COMPLETE KYZMT</button></Link>
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