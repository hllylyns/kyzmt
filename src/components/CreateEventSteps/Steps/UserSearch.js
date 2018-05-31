import React, {Component} from 'react';
import axios from 'axios';
import UserSearchSuggestions from './UserSearchSuggestions';
import 'react-select/dist/react-select.css';
import Downshift from 'downshift';

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
        console.log(e)
        this.setState({
            query: e.target.value
        }
        // , ()=> {
        //     if (this.state.query ){
        //     setTimeout(this.getInfo(), 1000)
        //     // if (this.state.query && this.state.query.length >1){
        //     //     if (this.state.query.length % 2 ===0){
        //     //         this.getInfo()
        //     //     }
        //     }
        // }
    )
    }

    getInfo(query){
        setTimeout(axios.get(`/event/results?q=${query}`).then(res=>{ 
            console.log(res.data)
            this.setState({
                results:  res.data
            })
        }), 500)
    }

    render(){ 
         ///find a set up that already does a drop down and select option for you
        return(
            <form>
                <UserSearchSuggestions results={this.state.results} onChange={this.handleInputChange}/>
               
            </form>
        )
    }
    
}

export default UserSearch;