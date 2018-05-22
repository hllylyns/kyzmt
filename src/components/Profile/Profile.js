import React, {Component} from 'react';
import {getUser} from './../../ducks/users';
import {connect} from 'react-redux';

class Profile extends Component{
    componentDidMount(){
        this.props.getUser();
    }
    
    bankBalance() {
        return '$' + Math.floor((Math.random() + 1) * 1000) + '.00';
    }

    render(){
        console.log(this.props)
        let {user_name, img, auth_id}=this.props.user;
        return(
            <div>
                <h2>User Profile</h2>
                <hr />
            {
                user_name ?
                <div>
                <img src={img} alt=""/>
                <p>Name: {user_name}</p> 
                
                </div>
                :
                <p>Please login</p>
            }
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, {getUser})(Profile);