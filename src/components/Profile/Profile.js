import React, { Component } from 'react';
// import { getUser } from './../../ducks/reducer';
// import { connect } from 'react-redux';
import Header from '../Header/Header';
import axios from 'axios';

class Profile extends Component {
    constructor(){
        super();

        this.state={
            user: {}
        }
    }
    componentDidMount() {
        axios.get('/profile').then(res=>{
            this.setState({
                user: res.data[0]
            })
        })
    }


    render() {
        console.log(this.state.user)
        let { name, photo, phone, email } = this.state.user;
        return (
            <div>
                <Header />
                <h2>User Profile</h2>
                <div className="profilephoto">
                    <img src={photo} alt="profle" />
                </div>
                <p>Name: {name}</p>
                <p>Email: {phone}</p>
                <p>Phone: {email}</p>
            </div>
        )
    }
}

export default Profile;