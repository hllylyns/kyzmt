import React, { Component } from 'react';
// import axios from 'axios';
// import { connect } from 'react-redux';
// import { createEvent } from '../../ducks/reducer';
import { Link } from 'react-router-dom';

class Times extends Component {
    // constructor() {
    //     super();

    //     this.state = {
    //         month:"",
    //         date:"",
    //         year:"",
    //         time:""
    //     }
        
    // }

    // componentDidMount()

    //axios.post


    render() {
        return (
            <div>
                <h1>Potential Dates and Times</h1>
               <Link to = '/dashboard'> <button /*onClick={this.props.createTimes}*/>CREATE</button></Link>

            </div>
        )
    }
}

export default Times;

// export default connect(null, { createTimes })(Times);