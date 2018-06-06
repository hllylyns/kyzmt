import React, {Component} from 'react';
import {getUser} from './../../ducks/reducer';
import {connect} from 'react-redux';

class Profile extends Component{
    componentDidMount(){
        this.props.getUser();
    }
    

    render(){
        console.log(this.props)
        let {user_name, img}=this.props.user;
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