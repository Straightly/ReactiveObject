import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export default class Square  {
  constructor(props) {
    super(props);
  }
  squareView(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
}