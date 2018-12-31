import React from 'react';
import Square from './objectSqure';
  
  export default class BoardView extends React.Component {
    constructor(props) {
      super(props);
      let nextPlay = 'X';
      const squareViews = Array(9);
      for (let i=0; i<9; i++) {
        squareViews[i] = new Square();
        squareViews[i].play = nextPlay;
        squareViews[i].theIndex = i;
      };
      this.state = {
        xIsNext: true,
        squareViews: squareViews,
      };
    }
  
    handleClick(i) {
      alert("Handle the click in board.") 
      let nextStatus  = !this.state.xIsNext;
      let nextPlay = nextStatus ? 'X' : 'O';
      const squareViews = this.state.squareViews.slice();
      for(let i=0; i<9; i++) {
          squareViews[i].play= nextPlay;
      }
      //This trigger the rendering of the whole board.
      this.setState({
        xIsNext: nextStatus,
        squareViews: squareViews,
      });
    }
  
    renderSquare(i, theBoard) {
      const squareViews = this.state.squareViews.slice();
      const theSquare = squareViews[i];
      return (
        theSquare.view(
          {
              onClick: () => this.handleClick(i),
              play: this.state.xIsNext ? 'X' : 'O',
              theIndex: i,
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
            {this.renderSquare(0, this)}
            {this.renderSquare(1, this)}
            {this.renderSquare(2, this)}
          </div>
          <div className="board-row">
            {this.renderSquare(3, this)}
            {this.renderSquare(4, this)}
            {this.renderSquare(5, this)}
          </div>
          <div className="board-row">
            {this.renderSquare(6, this)}
            {this.renderSquare(7, this)}
            {this.renderSquare(8, this)}
          </div>
        </div>
      );
    }
  }
  
  