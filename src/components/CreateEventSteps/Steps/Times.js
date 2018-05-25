import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {completeKyzmt, selectTime, timeInput} from '../../../ducks/reducer';
import { Link } from 'react-router-dom';


class Times extends Component {
    constructor(){
        super();

        this.state = {
            timeInput: '',
            timesList: []
        }

        this.handleSelectTime = this.handleSelectTime.bind(this);
        this.handleTimeInput = this.handleTimeInput.bind(this);
       
    }

    handleTimeInput(time){
        this.setState({timeInput:time})
    }

    handleSelectTime(time){
        console.log(time);
        let newTime = new Date(this.state.timeInput)
        let day = newTime.toDateString()
        let timeRead = newTime.toLocaleTimeString()
        let displayTime = day + ' ' + timeRead
        if (displayTime!= "Invalid Date Invalid Date"){
            this.setState({
                timesList: [...this.state.timesList, displayTime]
            })
        }else{
            //let the user know that they are entering an invalid date somehow (send an alert/warning that isn't annoying)
        }
        this.props.selectTime(this.state.timeInput);
    }

    removeSelectedTime(e){
        var newTimesList =  [...this.state.timesList];
        var index = newTimesList.indexOf(e.target.value)
        newTimesList.splice(index, 1)
        this.setState({timesList: newTimesList})
    }

    render() {
        let times = this.state.timesList.map((element,i)=>{
            return(
                <div>
                {element}<button className="deletebox" onClick={e=>this.removeSelectedTime(e)}>x</button>
                </div>
            )
            // console.log(element);
        })
        return (
            <div>
                <h1>Choose Dates</h1>
                <input id="datetime" type="datetime-local" onInput={(e) => this.handleTimeInput(e.target.value)} className="timebox"/>
                <button onClick={this.handleSelectTime}>ADD TIME</button><br/>
                <h2>Selected Times</h2><br/>
                 {times}
               <Link to = '/dashboard'> <button onClick={this.props.completeKyzmt}>COMPLETE KYZMT</button></Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let {timeInput, timesList} = state
    return {
        timeInput, 
        timesList
    }
}

export default connect(mapStateToProps, {completeKyzmt, selectTime, timeInput})(Times);