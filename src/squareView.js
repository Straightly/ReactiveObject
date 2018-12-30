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

  render() {
    return (
      <button className="square" onClick={this.state.onClick}>
        {this.state.value}
      </button>
    );
  }
}