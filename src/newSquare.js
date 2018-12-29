import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export default class Square extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: props.value,
      };
    }
  
    render() {
      return (
        <button className="square" onClick={()=>{this.setState({value: 'X'});}}>
          {this.state.value}
        </button>
      );
    }
}