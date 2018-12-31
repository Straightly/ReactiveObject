import React from 'react';
import './index.css';

export default class SquareView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        value: props.value,
        onClick: props.onClick,
    };
  }

  handleClick() {
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