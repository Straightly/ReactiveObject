import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Square from './newSquare';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares:  Array(9).fill(null),
        }
        let s = this.state.squares;
        let i;
        for ( i=0; i<9; i++) {
            s[i] = <Square value={i+10}/>
        }
    }
    renderSquare(i) {
      return <Square value={i}/>;
    }
  
    render() {
      const status = 'Next player: X';
      let s = this.state.squares;
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {s[0]}
            {s[1]}
            {s[2]}
          </div>
          <div className="board-row">
            {s[3]}
            {s[4]}
            {s[5]}
          </div>
          <div className="board-row">
            {s[6]}
            {s[7]}
            {s[8]}
          </div>
        </div>
      );
    }
  }