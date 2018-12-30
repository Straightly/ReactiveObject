import React from 'react';
import './index.css';

export default class SquareView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        value: props.value,
        onClick: props.onClick,
        play:props.play,
    };
  }

  handleClick() {
    alert('State is ' + this.state.value + "play is " + this.state.play);
    if (!this.state.value) {
      let newState = {
        value: this.state.play,
        onClick: this.state.onClick,
        play: this.state.play,
      } 

      this.setState(newState);
    }
    this.state.onClick();
  }

  render() {
    return (
      <button className="square" onClick={()=>this.handleClick()}>
        {this.state.value}
      </button>
    );
  }
}