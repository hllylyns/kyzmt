import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import particles from 'react-particles-js';


class Header extends Component {
  constructor(){
    super();

    this.state={
      user:{}
    }
  }
  componentDidMount() {
    axios.get('/profile').then(res=>{
        this.setState({
            user: res.data[0]
        })
    })
    console.log(this.state)
}
render(){
  return ( 
  <nav className="header">
    <Link to='/dashboard' className='kyzmt'><div>kyzmt</div> </Link>
      <div className="link-wrap">
      <Link to="/dashboard" className='links' id="dashbutton">DASH</Link>
      <Link to="/profile" className='circular--landscapesmall'><img src={this.state.user.photo}/></Link>
    </div>
  </nav>
)}
    
}

export default Header