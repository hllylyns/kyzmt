import React from 'react';
import { Link } from 'react-router-dom';
// import particles from 'react-particles-js';


export default function Header() {
    return ( 
        <nav className="header">
          <Link to='/dashboard' className='kyzmt'><div>kyzmt</div> </Link>
          <div className='link-wrap'>
            <Link to="/dashboard" className='links'>DASH</Link>
            <Link to="/profile" className='links'>PROFILE</Link>
          </div>
        </nav>
    )
}