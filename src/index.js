import React, { useState } from 'react';
import ReactDOM from 'react-dom';


function uniqueId() {
  return '_' + Math.random().toString(36).trim();
};

function Example(props) {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState([props.idValue, 0, props.callback]);

  return (
    <div>
      <p>You clicked {count[1]} times</p>
      <button onClick={() => {
          const idValue = count[0];
          const newValue = count[1] + 1;
          const theCallback = count[2];
          setCount([idValue, newValue, theCallback]);
          if(props.callback) {
            props.callback([idValue, newValue]);
          } else {
            alert("What the hack props.callback?");
            if (theCallback) {
              alert("Call the saved callback function.  What happen to props?");
              theCallback(idValue, newValue);
            }
          }
        }}
      >
        Click me
      </button>
    </div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = [1, 1];
  }

  updateGlobalState(counterState) {
    debugger;
    if (!this) {
      alert("What the hack this");
    }
    if (!this.state) {
      alert("What the hack state");
    }

    if (!this.state[0] && this.state[0] !== 0) {
      alert("Why I lost first element?");
    } 

    if (!this.state[1] && this.state[1] !== 0) {
      alert("Why I lost second element?");
    }
    
    var firstValue = this.state[0];
    if (counterState[0] === 0) {
      firstValue = counterState[1];
    }

    var secondValue = this.state[1];
    if (counterState[0] === 1) {
      secondValue = counterState[1];
    }
    const newState = [
      firstValue,
      secondValue,
    ];
    this.setState(newState);
  }

  render() {
    alert("Render global");
    const e1 = <Example idValue={0} callback={(counterState) => this.updateGlobalState(counterState)}/>;
    const e2 = <Example idValue={1} callback={(counterState) => this.updateGlobalState(counterState)}/>;
    return (
      <div>
        {e1}
        {e2}
        <p/>
        <p>Total is {this.state[0]} + {this.state[1]}</p>
      </div>
    )
  };
}




ReactDOM.render(
  <Game/>,
  document.getElementById("root"),
  null
);
//game1.prototype.handleClick(1);
//game2.handleClick(2);