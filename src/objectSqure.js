import React from 'react';
import './index.css';
//import SquareView from './squareView';

function SquareView(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

export default class Square {
    squareClick() {
        alert('Now we have play on the square = ' + this.play);
        if(!this.value) {
            alert('This square was empty.  Place play ' + this.play + ' into it.  No rendering yet.');
            this.value = this.play;
        }
        this.onClick();
    }

    view(props) {  //This is called many times create the view.
        this.onClick = props.onClick;
        this.play = props.play;
        let theValue = this.value;
        this.theIndex = props.theIndex;
         //alert("The index " + this.theIndex + " square has value of " + theValue + "before rendering." + " within board " + props.theBoard);
        // alert("Current Board move state is " + props.theBoard);
        return <SquareView
            onClick={()=>this.squareClick()}
            value={theValue}
        />;
    }
}