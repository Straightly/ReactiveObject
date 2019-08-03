import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';


function uniqueId() {
  return '_' + Math.random().toString(36).trim();
};

function IncrementCounter() {
  
  // Declare a new state variable, which we'll call "count"
  debugger;
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

class InCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = 0;
    this.id = uniqueId();
  }
  componentDidUpdate() {
    if (this.props.returnStateFunctions) {
      this.props.returnStateFunctions(this.state);
    }
  }

  render() {
    return(
      <div>
        <p>You clicked {this.state} times</p>
        <button onClick={() => {
            this.setState(this.state + 1);
          }}
        >
          Click me
        </button>
      </div>
    );
  }
}

class Combiner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {state1: -1, state2: -1};
  }

  updateGlobalState(id, chileState) {
    if (id === 0) {
      this.setState({state1: chileState});
    }
    if (id === 1) {
      this.setState({state2: chileState});
    }
  }

  render() {
    const callback2 = (count) => {
      this.updateGlobalState(1, count);
    }

    const e2 = new InCounter({returnStateFunctions:callback2});

    const callback1 = (count) => {
      this.updateGlobalState(0, count);
    };

    const e1 = IncrementCounter();
    return (
      <div>
        {e1}
        {e2}
        <p/>
        <p>Total is {this.state[0]} + {this.state[1]}</p>
      </div>
    );
  }
}//class

ReactDOM.render(
  <Combiner/>,
  document.getElementById("root"),
  null
);

//game1.prototype.handleClick(1);
//game2.handleClick(2);