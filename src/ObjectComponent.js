import React from 'react';
import ReactDOM from 'react-dom';

export default class ObjectComponent extends React.Component {
    constructor(props) {
      super(props);
      if (props && props.state) {
        this.state = props.state;
      }
      if (!this.state) {
          this.state = {value: null}; 
      }
      if (props && props.context) {
        this.context = props.context;
      }
      if (this.context) {
        this.context = {value: null};
      }
    }
    render() {
      return (<button className="square" >
        'ThisIsAPlaceHolder'
      </button>)
    }
}
