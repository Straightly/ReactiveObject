import React from 'react';
import './index.css';
import BoardView from './boardView';

export default class Board {
    get view() {
        return <BoardView/>;
    }
  }