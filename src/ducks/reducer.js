import axios from 'axios';

const initialState = {
    user: {},
    timeInput: '',
    timesList: [],    
    event:{
        eventName:"",
        description:"",
        location:"", 
        startTime:"",
        duration:""
    },
    eventTimes:{
        startTimes:[],
        durations:[]
    }
    
}

const GET_USER = 'GET_USER';
const CREATE_EVENT = 'CREATE_EVENT';
const FULFILLED = "_FULFILLED";
const COMPLETE_KYZMT = "COMPLTE_KYZMT";
const TIME_INPUT = "HANDLE_TIME_INPUT";
const SELECT_TIME = "SELECT_TIME";
const REMOVE_SELECTED_TIME = "REMOVE_SELECTED_TIME";

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER + FULFILLED:
            return Object.assign({}, state, {user: action.payload})
        case CREATE_EVENT:
            let event = Object.assign({}, state.event, action.payload)
            return Object.assign({}, state, {event})
        case COMPLETE_KYZMT:
            return Object.assign({}, state, {event: action.payload})
        case TIME_INPUT:
            return Object.assign({}, state, {timeInput: action.payload})
        case SELECT_TIME:
            return Object.assign({}, state, {timesList: [...state.timesList, action.payload]})
        default:
          return state;
    }
}

export function getUser() {
    let userData = axios.get('/auth/me').then( res => {
        return res.data;
    })
    return {
        type: GET_USER,
        payload: userData
    }
}

export function createEvent(props, key){
    return{
        type: CREATE_EVENT,
        payload: {
            [props] : key
        }
    }
}

export function timeInput(time){
    return{
        type: TIME_INPUT,
        payload: time
    }
}

export function selectTime(time){
        return{
            type: SELECT_TIME,
            payload: time
        }
    // }else{
    //     //let the user know that they are entering an invalid date somehow (send an alert/warning that isn't annoying)
    // }
}

export function removeSelectedTime(e){
    var newTimesList =  [...this.state.timesList];
    var index = newTimesList.indexOf(e.target.value)
    newTimesList.splice(index, 1)
        return {
            type: REMOVE_SELECTED_TIME,
            payload: newTimesList
        }
}

export function completeKyzmt(){
    axios.post('/event', {event}).then(res=>{  //do I need an event id in the endpoint/url string? event/:id? 
        console.log('event created! yay!')
    })
    let event = {
        eventName:"",
        description:"",
        location:"", 
        startTime:"",
        duration:""
    }
    return {
        type: COMPLETE_KYZMT,
        payload: event
    }
}