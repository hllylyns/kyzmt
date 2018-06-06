import React, { Component } from 'react';
import axios from 'axios';
import UserSearchSuggestions from './UserSearchSuggestions';
// import 'react-select/dist/react-select.css';
// import Select from 'react-select';
// import Downshift from 'downshift';


class UserSearch extends Component {
    constructor() {
        super();

        this.state = {
            query: '',
            results: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        console.log(e.target.value)
        this.setState({
            query: e.target.value
        }
            , () => {
                if (this.state.query) {
                    setTimeout(this.getInfo(), 500)
                    // if (this.state.query && this.state.query.length >1){
                    //     if (this.state.query.length % 2 ===0){
                    //         this.getInfo()
                    //     }
                }
            }
        )
    }

    getInfo() {
        axios.get(`/event/results?q=${this.state.query}`).then(res => {
            console.log(res.data)
            this.setState({
                results: res.data
            })
        })
    }

    render() {
        let options = this.state.results.map(e => {
            return <options value={e.name} label={e.name} key={e.id}>{e.name}</options>
        })
        
       
        
        ///find a set up that already does a drop down and select option for you
        return (
            <div>
                <input
                placeholder="finding friends"
                onChange={this.handleInputChange}
                />

                {/* //
                    // 
                // isLoading= {true}
                onChange={this.handleInputChange}
                // multi={true}
                
                // loadOptions={this.getInfo} */}

                <UserSearchSuggestions results={this.state.results} />

            </div>
        )
    }

}

export default UserSearch;