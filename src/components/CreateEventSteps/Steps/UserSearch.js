import React, {Component} from 'react';
import axios from 'axios';
import UserSearchSuggestions from './UserSearchSuggestions';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {Async} from 'react-select';

class UserSearch extends Component {
    constructor(){
        super();

        this.state = {
            query: '',
            results: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e){
        this.setState({
            query: e.target.value
        }, ()=> {
            if (this.state.query && this.state.query.length >1){
            setTimeout(this.getInfo(), 1000)
            // if (this.state.query && this.state.query.length >1){
            //     if (this.state.query.length % 2 ===0){
            //         this.getInfo()
            //     }
            }
        })
    }

    getInfo(){
        axios.get(`/event/results?q=${this.state.query}`).then(res=>{ 
            console.log(res.data)
            this.setState({
                results:  res.data
            })
        })
    }

    render(){  ///find a set up that already does a drop down and select option for you
        return(
            <form>
                <input
                    value = {this.state.query}
                    placeholder="Find Friends..."
                    onChange={this.handleInputChange}
                  />
                <UserSearchSuggestions results={this.state.results}/>
            </form>
        )
    }
    
}

export default UserSearch;