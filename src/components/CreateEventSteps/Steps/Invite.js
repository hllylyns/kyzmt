import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { selectInvitee, inviteInput, removeSelectedInvitee } from '../../../ducks/reducer';
import { connect } from 'react-redux';
import UserSearch from './UserSearch';

class Invite extends Component {

    handleInviteInput(invitee) {
        // this.setState({ inviteInput: invitee });
        this.props.inviteInput(this.state.inviteInput);
    }


    render() {
        let invitees = this.props.invitesList.map((element, i) => {
            return (
                <div key={i} className="circular--landscape">
                    <img src={element.photo} alt={element.name} />
                    <button className="deletebox" onClick={() => this.props.removeSelectedInvitee(i)}>x</button>
                </div>
            )
        })
        return (
            <div className="createevent">
            <div className="steps_outer">
            <div className="steps_inner">
                <h1>Invite Friends </h1>
                <UserSearch />
                {/* <input value={this.state.friend}
                    onChange={(e) => this.handleInvite(e.target.value)} /> */}
                <h2>Send Invites To</h2>
                {invitees}
                <div className="cancel">
                <Link to='/event/details'><button >PREV</button></Link>
                <Link to='/event/times'><button >NEXT</button></Link>
                </div>
            </div>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let { inviteInput, invitesList } = state
    return {
        inviteInput,
        invitesList
    }
}

export default connect(mapStateToProps, { selectInvitee, inviteInput, removeSelectedInvitee })(Invite);