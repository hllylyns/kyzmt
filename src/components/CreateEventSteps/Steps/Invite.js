import React, { Component } from 'react';
import {Link } from 'react-router-dom';

class Invite extends Component {
    // constructor(){
    //     super();

    //     this.state={
    //         friend:
    //     }
    // }
    
    // handleInvite(value) {
    //     this.setState({ });
    // }
    render() {
        return (
            <div>
                <p>Invite Friends </p>
                {/* <input value={this.state.friend}
                    onChange={(e) => this.handleInvite(e.target.value)} /> */}
                <Link to='/event/times'><button /*onClick={this.props.inviteFriends}*/>NEXT</button></Link>
            </div>
        );
    }
}

export default Invite;