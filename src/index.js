import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';


function uniqueId() {
  return '_' + Math.random().toString(36).trim();
};

class IncrementalCounterClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
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

function IncrementalCounterFunction() {
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

class GiverClass extends React.Component {
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

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


function GiverFunction(props) {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  useEffect(() => {
    const currentState = {count: count};
    const previousState = {count: previousCount};
    if (props.callback) {
      props.callback(props.id, currentState, previousState);
    }
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

class TakerClass extends React.Component {
  constructor(props) {
    super(props);
    let startValue = props.startValue;
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


function TakerFunction(props) {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(props.startValue===undefined ? 0 : props.startValue);
  const previousCount = usePrevious(count);

  useEffect(() => {
    const currentState = {count: count};
    const previousState = {count: previousCount};
    if (props.callback) {
      props.callback(props.id, currentState, previousState);
    }
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

function dependency(Giver, Taker) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      let id1 = uniqueId();
      let id2 = uniqueId();
      let reducers = {};
      this.state = {
        childStates: [0, 0], 
        ids: [id1, id2],
        reducers:reducers
      };
    }

    updateGiver(currentChildState, prevChildSate) {
      let childState = 0;
      if(
        currentChildState && 
        currentChildState.count !== undefined && 
        prevChildSate && 
        prevChildSate.count !== undefined) {
        childState = currentChildState.count - prevChildSate.count;
      };
      
      let newIds = this.state.ids.slice();
      newIds[1] = uniqueId();
      let childStates = this.state.childStates.slice();
      childStates[0] = this.state.childStates[0] + childState;
      childStates[1] = this.state.childStates[1] + childState;
      this.setState({
        childStates: childStates,
        ids: newIds  //forcing recreation?
      });
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
      if (id === this.state.ids[0] && childState > 0) {
        let newIds = this.state.ids.slice();
        newIds[1] = uniqueId();
        let childStates = this.state.childStates.slice();
        childStates[0] = this.state.childStates[0] + childState;
        childStates[1] = this.state.childStates[1] + childState;
        this.setState({
          childStates: childStates,
          ids: newIds  //forcing recreation?
        });
      }
      if (id === this.state.ids[1] && childState > 0) {
        let newStates = this.state.childStates.slice();
        newStates[1] = this.state.childStates[1] + childState;
        this.setState({childStates: newStates});
      }
    }

    render() {
        return (
          <div>
            <Giver        id={this.state.ids[0]} key={this.state.ids[0]} callback={(id, prevState, curState) => this.updateGlobalState(id, prevState, curState)} startValue={this.state.childStates[0]}/>
            <Taker       id={this.state.ids[1]} key={this.state.ids[1]} callback={(id, prevState, curState) => this.updateGlobalState(id, prevState, curState)} startValue={this.state.childStates[1]}/>
            <IncrementalCounterClass/>
            <IncrementalCounterFunction/>
            <p/>
            <p>Total is {this.state.childStates[0]} + {this.state.childStates[1]}</p>
          </div>
        );
    }
  }
}

const DependencyPair = dependency(GiverFunction, TakerClass);


ReactDOM.render(
  <DependencyPair/>,
  document.getElementById("root"),
  null
);
