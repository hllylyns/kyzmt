import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import {selectInvitee, inviteInput, removeSelectedInvitee} from '../../../ducks/reducer';
import {connect} from 'react-redux';
import UserSearch from './UserSearch';

class Invite extends Component {
    constructor(){
        super();

        this.state={
            inviteInput:''
        }

        this.handleInviteInput = this.handleInviteInput.bind(this);
        this.handleSelectInvitees = this.handleSelectInvitees.bind(this);

    }

    handleInviteInput(invitee) {
        this.setState({ inviteInput: invitee});
        this.props.inviteInput(this.state.inviteInput);
    }

    handleSelectInvitees(){
        // this.props.selectInvitee()
    }


    render() {
        let invitees = this.props.invitesList.map((element, i)=>{
            return (
                <div key={i}>
                    {element}<button className = "deletebox" onClick={() => this.props.removeSelectedInvitee(i)}>x</button>
                </div>
            )
        })
        return (
            <div>
                <h1>Invite Friends </h1>
                <UserSearch />
                {/* <input value={this.state.friend}
                    onChange={(e) => this.handleInvite(e.target.value)} /> */}
                <h2>Send Invites To</h2>
                {invitees}
                <Link to='/event/times'><button>NEXT</button></Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let {inviteInput, invitesList} = state
    return {
        inviteInput,
        invitesList
    }
}

export default connect(mapStateToProps, { selectInvitee , inviteInput, removeSelectedInvitee })(Invite);