import React from 'react';
import Downshift from 'downshift';

export default function UserSearchSuggestions(){
  const {results}=this.props;
  const options = results.map()
    return(
    <Downshift
      onChange={this.props.onChange}
      itemToString={option=>(option? option.name: '')}
    >
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
    }) => (
      <div>
        <label {...getLabelProps()}>Enter a fruit</label>
        <input {...getInputProps()} />
        {isOpen ? (
          <div>
            {options
              .filter(item => !inputValue || item.value.includes(inputValue))
              .map((item, index) => (
                <div
                  {...getItemProps({
                    key: options.id,
                    index,
                    item,
                    style: {
                      backgroundColor:
                        highlightedIndex === index ? 'lightgray' : 'white',
                      fontWeight: selectedItem === item ? 'bold' : 'normal',
                    },
                  })}
                >
                  {options.name}
                </div>
              ))}
          </div>
        ) : null}
      </div>
    )}
    </Downshift>
    )
  }
// import {selectInvitee} from '../../../ducks/reducer';
// import {connect} from 'react-redux';

// export default connect(null, {selectInvitee}) (function UserSearchSuggestions(props){
//     const options = props.results.map(r => (
//       <div>
//       <li key={r.id}>
//         {r.name}
//       </li><button onClick={r=>this.props.selectInvitee(r)}>invite</button>
//       </div>
//     ))
//     return <ul>{options}</ul>
//   })
  
