import React from 'react';
import './index.css';

export default class SquareView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        value: props.value,
        onClick:props.onClick,
    };
  }

  handleClick() {
    alert('What is going on?')
    if (this.state.value === 'X') {
      this.state.onClick();
    } else {
      let newState = {
        value: 'Y',
        onClick: this.state.onClick,
      }
      this.setState(newState);
    }
  }

  render() {
    return (
      <button className="square" onClick={()=>this.handleClick()}>
        {this.state.value}
      </button>
    );
  }
}