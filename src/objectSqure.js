import React from 'react';
import './index.css';
import SquareView from './squareView';

export default class Square {

    get view() {
        return <SquareView value='X' onClick = {()=>alert('Some')}/>;
    }
}