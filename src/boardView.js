import React from 'react';
import Square from './objectSqure';
  
  export default class BoardView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        xIsNext: true,
        squareViews: Array(9).fill(null),
      };
      let thePlay = this.state.xIsNext ? 'X' : 'O';
      const squareViews = this.state.squareViews;
      for (let i=0; i<9; i++) {
        squareViews[i] = new Square();
        squareViews[i].play = thePlay;
        squareViews[i].theIndex = i;
      };
    }
  
    handleClick(i) {
      alert("Handle the click in board.?") 
      let play = this.state.xIsNext ? 'X' : 'O';
      const squareViews = this.state.squareViews.slice();
      alert('What is ' + squareViews);
      for(let i=0; i<0; i++) {
          squareViews[i].play= play;
      }
      this.setState({
        xIsNext: !this.state.xIsNext,
        squareViews: squareViews,
      });
      
    }
  
    renderSquare(i) {
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
  
  