import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';


function uniqueId() {
  return '_' + Math.random().toString(36).trim();
};

function IncrementCounter(props) {
  // Declare a new state variable, which we'll call "count"
  let startValue = props.persistentedState;
  if (startValue === undefined) {
    startValue = 0;
  }
  const [count, setCount] = useState(startValue);

  useEffect(() => {
    // Update the document title using the browser API
    props.callback(props.id, count);
    document.title = `You clicked ${count} times` + props.callback;
  }, [count]);

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
    let startValue = props.persistentedState;
    if (startValue === undefined) {
      startValue = 0;
    }
    this.state = {
      count: startValue
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      this.props.callback(this.props.id, this.state.count - prevState.count);
    }
  }

  componentDidMount() {
    if (this.props.callback) {
      this.props.callback(this.props.id, 0);
    }
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}

class Combiner extends React.Component {
  constructor(props) {
    super(props);
    let id1 = uniqueId();
    let id2 = uniqueId();
    let id3 = uniqueId();
    let id4 = uniqueId();
    this.state = {state1: -1, state2: -1, ids: [id1, id2, id3, id4]};
  }

  updateGlobalState(id, childState) {
    if (id === this.state.ids[0] && this.state.state1 !== childState) {
      let state2Value = this.state.state2 + childState - this.state.state1;
      let newStateChange = {state1: childState};
      if (state2Value !== this.state.state2) {
        newStateChange.state2 = state2Value;
      }
      this.setState(newStateChange);
    }
    if (id === this.state.ids[1] && childState > 0) {
      this.setState({state2: this.state.state2 + childState});
    }
  }

  render() {
    if (this.state.state1 % 2 === 0) {
      return (
        <div>
          <IncrementCounter id={this.state.ids[0]} callback={(id, count) => this.updateGlobalState(id, count) }/>
          <InCounter        id={this.state.ids[1]} callback={(id, count) => this.updateGlobalState(id, count)}/>
          <p/>
          <p>Total is {this.state.state1} + {this.state.state2}</p>
        </div>
      );
    } else {
      return (
        <div>
          <div/> 
           <IncrementCounter id={this.state.ids[0]} callback={(id, count) => this.updateGlobalState(id, count) }/>
           <InCounter        id={this.state.ids[1]} callback={(id, count) => this.updateGlobalState(id, count)}/>

          <p/>
          <p>Total is {this.state.state1} + {this.state.state2}</p>
        </div>
      );
    }
  }
}//class

ReactDOM.render(
  <Combiner/>,
  document.getElementById("root"),
  null
);

//game1.prototype.handleClick(1);
//game2.handleClick(2);