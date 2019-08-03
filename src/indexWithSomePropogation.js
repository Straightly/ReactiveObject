import React, { useState } from 'react';
import ReactDOM from 'react-dom';


function uniqueId() {
  return '_' + Math.random().toString(36).trim();
};

function IncrementCounter(props) {
  // Declare a new state variable, which we'll call "count"
  debugger;
  let newStateValue = 0;
  if (props.newStateValue !== undefined) {//null, false, 0, and "" are all fair game.  //This does not work at all.
                                          //Somehow, React hook was able to remember this element and NOT change its status
                                          //Even when I create a new example.
    newStateValue = props.newStateValue;
  }  
  const [count, setCount] = useState([props.idValue, newStateValue, props.callback]);
  if (props.returnStateFunctions) {
    props.returnStateFunctions(count, setCount);
  }
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
    this.state = [100, 100];
  }

  returnStateFunctions(getter, setter) {
    if(this.state.stateFunctionGetter === undefined && this.state.stateFunctionSetter === undefined) {
      this.setState({stateFunctionGetter: getter, stateFunctionSetter: setter});
    }
  }

  updateGlobalState(childState) {
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
      debugger;
      alert("Why I lost second element?");
    }
    
    let firstValue = this.state[0];
    if (childState[0] === 0) {
      firstValue = childState[1];
    }

    var secondValue = this.state[1];
    var secondValueFromChild = childState[1];
    if (childState[0] === 1) {
      debugger;
      if (secondValueFromChild > secondValue)  {  //second value has changed.
        let currentFirstState = this.state.stateFunctionGetter;
        const idValue = currentFirstState[0];
        const newValue = currentFirstState[1] + secondValueFromChild - secondValue;
        const theCallback = currentFirstState[2];
        this.state.stateFunctionSetter([idValue, newValue, theCallback]);
      }
      secondValue = secondValueFromChild;  //Reflect chilld's value in parent.
    }
    const newState = [
      firstValue,
      secondValue,
    ];
    this.setState(newState);
  }

  render() {
    
    const e1 = <IncrementCounter idValue={0} returnStateFunctions = {(getter, setter) => this.returnStateFunctions(getter, setter)} newStateValue = {this.state[0]} callback={(counterState) => this.updateGlobalState(counterState)}/>;
    const e2 = <IncrementCounter idValue={1} newStateValue = {this.state[1]} callback={(counterState) => this.updateGlobalState(counterState)}/>;
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