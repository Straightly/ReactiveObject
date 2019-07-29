import React, { useState }  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';

function counter(state = 0, action) { //this is a reducer.  It is basically a collection of event handlers.
    //the action are events.  It has a type.  Here it is the INREMENT and SDECREMENT.
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
  }

  // eslint-disable-next-line
  let store = createStore(counter);  //The global store.  Its API is { subscribe, dispatch, getState }.


function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div>
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
  
  export default class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true,
        playCallBack: props.playCallBack,
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      const newState = {
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
        playCallBack:this.state.playCallBack,
      };
      this.setState(newState);
      if(this.state.playCallBack) {
        this.state.playCallBack(i, this, newState);
      }
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
  
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
  
      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }



function play1to2(i, domNode, componentState) {
    alert("Reached here.");
    var node1 = ReactDOM.findDOMNode(domNode);   
    alert("Found game  1" + node1);
    var state1 = componentState;
    alert("Game1 state is", state1);
    var stepNumber = state1.stepNumber;
    alert("StepNumber of game 1 is " + stepNumber);
    //var node2 = ReactDOM.findDOMNode(domNode);
    //node2.setState(state);
}

function play2to1(i, domNode) {
    alert("Reached here.");
    var node1 = ReactDOM.findDOMNode(domNode);
    alert("Found game  2" + node1);
}

var game1 = <Game playCallBack = {play2to1}/>;

var game2 = <Game playCallBack = {play1to2}/>;

function Incrementer() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }

function renderCallBack() {
    alert("Finished Rendering");
}

const Green = (props) => (
    <div className="green">{props.number}</div>
  )
  const Blue = (props) => (
    <div className="blue">
      <Green number={props.number} />
    </div>
  )
   
  class Red extends React.Component  {
    state = {
      number : 10
    }
    render() {
      return  <div className="red">
        {this.state.number}
        <Blue number={this.state.number} />
      </div>
    }
  }
  

ReactDOM.render(
    <div>
        <h1>this is the clicker.</h1>
       <Incrementer/>
       <h1>this is before the first game.</h1>
       {game1}
       <h1>this is between the games.</h1>
       {game2}
       <h1>this is after the second game.</h1>
       <Red/>
    </div>,
    document.getElementById("root"),
    renderCallBack
);
//game1.prototype.handleClick(1);
//game2.handleClick(2);