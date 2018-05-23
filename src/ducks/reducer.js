import axios from 'axios';

const initialState = {
    user: {},
    event:{
        eventName:"",
        description:"",
        location:""
    }
}

const GET_USER = 'GET_USER';
const CREATE_EVENT = 'CREATE_EVENT'

export function getUser() {
    let userData = axios.get('/auth/me').then( res => {
        return res.data;
    })
    return {
        type: GET_USER,
        payload: userData
    }
}

export function createEvent(eventName, description, location){
    let event = {eventName, description, location}
    return{
        type: CREATE_EVENT,
        payload: event
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload})
        case CREATE_EVENT:
            return Object.assign({}, state, {event: action.payload})
        default:
          return state;
    }
}