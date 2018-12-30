import React from 'react';
import Square from './objectSqure';
  
  export default class BoardView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
      };
      let i;
      let squareViews = Array(9);
      for ( i=0; i<9; i++) {
          squareViews[i] = new Square();
      };
      this.state.squareViews = squareViews;
    }
  
    handleClick(i) {
      const squares = this.state.squares.slice();
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    }
  
    renderSquare(i) {
      let theSquare = this.state.squareViews[i];
      return (
        theSquare.squareView(
          {
              value: this.state.squares[i],
              onClick: () => this.handleClick(i)
          }
        )
      );
    }
  
    render() {
      const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  