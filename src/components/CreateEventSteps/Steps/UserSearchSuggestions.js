import React, { Component } from 'react';
import { selectInvitee } from '../../../ducks/reducer';
import { connect } from 'react-redux';

class UserSearchSuggestions extends Component {
  constructor(){
    super();

    // this.state = {
        
    // }
  }


  render() {
    let options = this.props.results.map(r => (
      <div key={r.id} /*className="circular--landscape"*/>
        {/* <img src={r.photo} alt={r.name} /> */}
        <button className = "searchbar" onClick={() => this.props.selectInvitee(r)}>{r.name}</button>
      </div>
    ))
    return (<ul>{options}</ul>)
  }
}

export default connect(null, { selectInvitee })(UserSearchSuggestions);