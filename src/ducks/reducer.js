import axios from 'axios';

const initialState = {
    user: {},  
    event:{
        eventName:"",
        description:"",
        location:"", 
        startTime:"",
        duration:""
    },
    inviteInput: '',
    invitesList: [],
    timeInput: '',
    timesList: []
}

const GET_USER = 'GET_USER';
const CREATE_EVENT = 'CREATE_EVENT';
const FULFILLED = "_FULFILLED";
const TIME_INPUT = "HANDLE_TIME_INPUT";
const SELECT_TIME = "SELECT_TIME";
const REMOVE_SELECTED_TIME = "REMOVE_SELECTED_TIME";
const COMPLETE_KYZMT = "COMPLTE_KYZMT";
const CANCEL_CREATE = "CANCEL_CREATE";
const INVITEE_INPUT = "INVITEE_INPUT";
const SELECT_INVITEE = "SELECT_INVITEE";
const REMOVE_SELECTED_INVITEE = "REMOVE_SELECTED_INVITEE";

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER + FULFILLED:
            return Object.assign({}, state, {user: action.payload})
        case CREATE_EVENT:
            let event = Object.assign({}, state.event, action.payload)
            return Object.assign({}, state, {event})
        case TIME_INPUT:
            return Object.assign({}, state, {timeInput: action.payload})
        case SELECT_TIME:
            return Object.assign({}, state, {timesList: [...state.timesList, action.payload]})
        case REMOVE_SELECTED_TIME:
            return Object.assign({}, state, {timesList: action.payload})
        case INVITEE_INPUT:
            return Object.assign({}, state, {inviteInput: action.payload})
        case SELECT_INVITEE:
            return Object.assign({}, state, {invitesList: [...state.inviteList, action.payload]})
        case REMOVE_SELECTED_INVITEE:
            return Object.assign({}, state, {invitesList: action.payload})
        case COMPLETE_KYZMT:
            return Object.assign({}, state, {event: action.payload})
        case CANCEL_CREATE:
            let resetEvent = Object.assign({}, state, {event: action.payload})
            let timesList = Object.assign({}, state, {timesList: []})
            return Object.assign({}, state, {event, timesList})
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

export function selectTime(times){
        return{
            type: SELECT_TIME,
            payload: times
        }
    // }else{
    //     //let the user know that they are entering an invalid date somehow (send an alert/warning that isn't annoying)
    // }
}

export function removeSelectedTime(newTimesList){
        return {
            type: REMOVE_SELECTED_TIME,
            payload: newTimesList
        }
}

export function inviteInput(user){
    return{
        type: INVITEE_INPUT,
        payload: user
    }
}

export function selectInvitee(users){
        return{
            type: SELECT_INVITEE,
            payload: users
        }
}

export function removeSelectedInvitee(newInvitesList){
        return {
            type: REMOVE_SELECTED_INVITEE,
            payload: newInvitesList
        }
}

export function cancelCreate(){
    let event = {
        eventName:"",
        description:"",
        location:"", 
        startTime:"",
        duration:""
    }
    return {
        type: CANCEL_CREATE,
        payload: event
    }
}

export function completeKyzmt(){
    let {event, timesList, invitesList} = this.state;
    axios.post('/event', {event, timesList, invitesList}).then(res=>{  
        console.log('event created! yay!').catch((error)=>{
            console.log(error)
            res.status(500).send('event NOT created');
        })
    })

    let resetEvent = {
        eventName:"",
        description:"",
        location:"", 
        startTime:"",
        duration:""
    }
    return {
        type: COMPLETE_KYZMT,
        payload: resetEvent
    }
}