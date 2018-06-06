import React, {Component} from 'react';
// import axios from 'axios';

class PopFriend extends Component{
    render(){
        return(
            <div>
            <div>popfriend</div>
            <button onClick={this.props.cancelChanges}>CANCEL</button>
            </div>
        )
    }
}

export default PopFriend;