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
            return Object.assign({}, state, {invitesList: [...state.invitesList, action.payload]})
        case REMOVE_SELECTED_INVITEE:
            return Object.assign({}, state, {invitesList: state.invitesList.filter((e, i)=> i!== action.payload)})
        case COMPLETE_KYZMT:
            return Object.assign({}, state, {event: action.payload})
            // let resetEvent = Object.assign({}, state, {event: initialState.event})
            // let resetTimesList = Object.assign({}, state, {timesList: initialState.timesList})
            // let resetInvitesList = Object.assign({}, state, {invitesList: initialState.invitesList})
            // return Object.assign({}, state, {resetEvent, resetTimesList, resetInvitesList})
        case CANCEL_CREATE:
            let resetEvent = Object.assign({}, state, {event: initialState.event})
            let resetTimesList = Object.assign({}, state, {timesList: initialState.timesList})
            let resetInvitesList = Object.assign({}, state, {invitesList: initialState.invitesList})
            return Object.assign({}, state, {resetEvent, resetTimesList, resetInvitesList})
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

export function selectInvitee(user){
        return{
            type: SELECT_INVITEE,
            payload: user
        }
}

export function removeSelectedInvitee(i){
        return {
            type: REMOVE_SELECTED_INVITEE,
            payload: i
        }
}

export function cancelCreate(){
    let reset = {};
    return {
        type: CANCEL_CREATE,
        payload: reset
    }
}

export function completeKyzmt(timesList, invitesList, event){
    console.log(invitesList)
    axios.post('/event', {timesList, invitesList, event}).then(res=>{  
        console.log('event created! yay!')
        })
        // .catch((error)=>{
        //     console.log(error)
        //     res.status(500).send('event NOT created');
    // })

    let resetEvent = {
        eventName:"",
        description:"",
        location:"", 
        startTime:"",
        duration:""
    }

    //need to reset invites and times lists

    return {
        type: COMPLETE_KYZMT,
        payload: resetEvent
    }
}