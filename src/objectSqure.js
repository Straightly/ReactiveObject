import React from 'react';
import './index.css';
import SquareView from './squareView';

export default class Square {
    get view() {
        return <SquareView/>;
    }

    squareView(props) {
        return (
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
        );
    }
}