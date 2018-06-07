import React, { Component } from 'react';
import { getUser } from './../../ducks/reducer';
import { connect } from 'react-redux';
import Header from '../Header/Header';

class Profile extends Component {
    // constructor(){
    //     super();

    //     this.state={

    //     }
    // }
    componentDidMount() {
        this.props.getUser();
    }


    render() {
        console.log(this.props.user)
        let { name, photo, phone, email } = this.props.user;
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

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUser })(Profile);