import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
// import axios from 'axios';
import Details from './Steps/Details';
import Invite from './Steps/Invite';
import Times from './Steps/Times';
import Header from '../Header/Header';
import {cancelCreate} from '../../ducks/reducer';
import {connect} from 'react-redux';

class CreateEvent extends Component {

    handleCancelCreate(){
        //add a pop up that asks if the person is sure they want to cancel
        //ternary, if no - do nothing, if yes - reset event and timesList on redux state to undefined
        this.props.cancelCreate();//do I need to invoke this to get it to worK? 
    }

    render() {
        return (
            <div>
               <Header/>
                <Switch>
                    <Route component={Details} path='/event/details' />
                    <Route component={Invite} path='/event/invite' />
                    <Route component={Times} path='/event/times' />
                </Switch>
                <Link to='/dashboard'><button onClick = {()=>this.handleCancelCreate} className='cancel'>CANCEL</button></Link>
            </div>
        );
    }
}

export default connect(null, { cancelCreate })(CreateEvent);