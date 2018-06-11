import React, { Component } from 'react';
// import { getUser } from './../../ducks/reducer';
// import { connect } from 'react-redux';
import Header from '../Header/Header';
import axios from 'axios';
import EditableLabel from 'react-inline-editing';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            phone: '',
            photo: ''
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleFocusOut = this.handleFocusOut.bind(this);
    }
    componentDidMount() {
        axios.get('/profile').then(res => {
            this.setState({
                name: res.data[0].name,
                email: res.data[0].email,
                phone: res.data[0].phone,
                photo: res.data[0].photo
            })
        })

    }

    handleUpdate(e) {
        this.setState({phone: e})
     }
    handleFocusOut(phone) { 
        axios.put('/profile', {phone}).then(res=>{
            this.setState({phone: phone})
            console.log('phone number updated')
        })
    }

    render() {
        let { name, email, photo } = this.state;
        return (

            <div className="profilepage">
                <Header />
                <div className="profilebox">
                    <h1>User Profile</h1><hr />
                    <div className="userprofile">
                        <div className="profilephoto">
                            <img src={this.state.photo} alt="profle" />
                        </div>
                        <div className="profiletext">
                        <p>Name:</p> { this.state.name && <EditableLabel text={this.state.name}
                    labelClassName='myLabelClass'
                    inputClassName='myInputClass'
                    inputWidth='200px'
                    inputHeight='25px'
                    inputMaxLength='50'
                    labelFontWeight='bold'
                    inputFontWeight='bold'
                    onFocus={this.handleUpdate}
                    onFocusOut={this.handleFocusOut}
                />}
                        <p>Email:</p> { this.state.email && <EditableLabel text={this.state.email}
                    labelClassName='myLabelClass'
                    inputClassName='myInputClass'
                    inputWidth='200px'
                    inputHeight='25px'
                    inputMaxLength='50'
                    labelFontWeight='bold'
                    inputFontWeight='bold'
                    onFocus={this.handleUpdate}
                    onFocusOut={this.handleFocusOut}
                />}
                        <p>Phone:</p> { this.state.phone ?<p><EditableLabel text={this.state.phone}
                    labelClassName='myLabelClass'
                    inputClassName='myInputClass'
                    inputWidth='200px'
                    inputHeight='25px'
                    inputMaxLength='50'
                    labelFontWeight='bold'
                    inputFontWeight='bold'
                    onFocus={this.handleUpdate}
                    onFocusOut={(text)=>this.handleFocusOut(text)}
                /></p> :  <EditableLabel text="000000000"
                labelClassName='myLabelClass'
                inputClassName='myInputClass'
                inputWidth='200px'
                inputHeight='25px'
                inputMaxLength='50'
                labelFontWeight='bold'
                inputFontWeight='bold'
                onFocus={this.handleUpdate}
                onFocusOut={(text)=>this.handleFocusOut(text)}
            />}
                           

                        </div>
                    </div>

                </div>
                <p> <EditableLabel text={this.state.name} onFocusOut={(text) => this.handleUpdate(text)} /></p>
                
            </div>
        )
    }
}

export default Profile;