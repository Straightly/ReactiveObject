import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './objectBoard'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      board: new Board(),
      timeMachine: null,
    };
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          {this.state.board.view}
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  