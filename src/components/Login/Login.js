import React, {Component} from 'react';

export default function Login() {
    return (
        <div className='App'>
            {/* <img src={logo} alt=""/> kyzmt logo and animation goes here */}
            <a href={process.env.REACT_APP_LOGIN}>
                <button>LOGIN</button>
            </a>
        </div> 
    )
}