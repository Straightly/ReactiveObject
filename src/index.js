import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';


function uniqueId() {
  return '_' + Math.random().toString(36).trim();
};

class Giver extends React.Component {
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
    if (prevState !== this.state) {
      this.props.callback(this.props.id, this.state, prevState);
    }
  }

  componentDidMount() {
    if (this.props.callback) {
      this.props.callback(this.props.id, this.state);
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


class Taker extends React.Component {
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

class DepdendentUser extends React.Component {
  constructor(props) {
    super(props);
    let id1 = uniqueId();
    let id2 = uniqueId();
    let id3 = uniqueId();
    let id4 = uniqueId();
    let f1 = (id1, id2, state1, prevstate1, state2, prevProp1) => {};
    let reducers = {};
    reducers[id1, id2] = f1;
    this.state = {
      state1: 0, 
      state2: 0, 
      ids: [id1, id2, id3, id4],
      reducers:reducers
    };
  }

  updateGlobalState(id, currentChildState, prevChildSate) {
    let childState = 0;
    if(
      currentChildState && 
      currentChildState.count !== undefined && 
      prevChildSate && 
      prevChildSate.count !== undefined) {
      childState = currentChildState.count - prevChildSate.count;
    };
    if (id == this.state.ids[0] && childState > 0) {
      this.setState({
        state1: this.state.state1 + childState, 
        state2: this.state.state2 + childState});
    }
    if (id == this.state.ids[1] && childState > 0) {
      this.setState({state2: this.state.state2 + childState});
    }
  }

  render() {
      return (
        <div>
          <Giver        id={this.state.ids[0]} callback={(id, prevState, curState) => this.updateGlobalState(id, prevState, curState)} startValue={this.state.state1}/>
          <Taker        id={this.state.ids[1]} callback={(id, prevState, curState) => this.updateGlobalState(id, prevState, curState)} startValue={this.state.state2}/>
          <p/>
          <p>Total is {this.state.state1} + {this.state.state2}</p>
        </div>
      );
  }
}//class

ReactDOM.render(
  <DepdendentUser/>,
  document.getElementById("root"),
  null
);

//game1.prototype.handleClick(1);
//game2.handleClick(2);